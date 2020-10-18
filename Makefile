# service specific vars
SERVICE			:= api
VERSION			:= 0.0.33
ORG				:= osrs-loadouts
COMMIT			:= $(shell git rev-parse --short HEAD)
BUILD_TIME		:= $(shell date -u '+%Y-%m-%d_%H:%M:%S')
PACKAGE 		:= $(shell grep module go.mod | awk '{ print $$2; }')
DOCKER_REGISTRY	:= gcr.io
IMAGE_NAME 		:= ${DOCKER_REGISTRY}/${ORG}/${SERVICE}
GOFLAGS			:= -mod=vendor
GCLOUD_SERVICE	:= ${ORG}-${SERVICE}

.PHONY: proto deps test build cont cont-nc all deploy help clean lint
.DEFAULT_GOAL := build
SHELL:=/bin/bash
GO111MODULE=on

help: ## halp
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

all: deps lint test build ## get && test && build

build: clean ## build service binary file
	@echo "[build] building go binary"
	@go build \
		-ldflags "-s -w \
		-X ${PACKAGE}/pkg.Version=${VERSION} \
		-X ${PACKAGE}/pkg.Commit=${COMMIT} \
		-X ${PACKAGE}/pkg.BuildTime=${BUILD_TIME} \
		-X ${PACKAGE}/pkg.Name=osrsloadouts" \
		-o ${GOPATH}/bin/osrsloadouts ./cmd/osrsloadouts
	${GOPATH}/bin/osrsloadouts -v

clean: ## remove service bin from $GOPATH/bin
	@echo "[clean] removing ${SERVICE} files"
	rm -f ${GOPATH}/bin/osrsloadouts

cont: ## build a cached service container
	docker build -t ${IMAGE_NAME} -t ${IMAGE_NAME}:${VERSION} .

cont-nc: ## build a non-cached service container
	docker build --no-cache -t ${IMAGE_NAME} -t ${IMAGE_NAME}:${VERSION} .

context:
	gcloud config set project ${ORG}
	gcloud config set run/region us-east1

deploy: context ## deploy latest built container to docker hub
	make migration SECRET_FILE=secrets/prod.env
	gcloud beta run deploy ${GCLOUD_SERVICE} \
	--image ${IMAGE_NAME}:${VERSION} \
	--platform=managed  \
	--allow-unauthenticated \
	--set-env-vars "OSRSLOADOUTS_MONGO_ADDR=${OSRSLOADOUTS_MONGO_ADDR}" \
	--set-env-vars OSRSLOADOUTS_MONGO_DB=${OSRSLOADOUTS_MONGO_DB} \
	--set-env-vars "OSRSLOADOUTS_REDIS_ADDR=${OSRSLOADOUTS_REDIS_ADDR}" \
	--set-env-vars "OSRSLOADOUTS_REDIS_PASS=${OSRSLOADOUTS_REDIS_PASS}" \
	--set-env-vars OSRSLOADOUTS_REDIS_DB=${OSRSLOADOUTS_REDIS_DB} \
	--set-env-vars OSRSLOADOUTS_REDIS_TTL=${OSRSLOADOUTS_REDIS_TTL} \
	--set-env-vars OSRSLOADOUTS_REDIS_POOL_SIZE=${OSRSLOADOUTS_REDIS_POOL_SIZE}

dev:
	sops exec-env secrets/dev.env go run cmd/osrsloadouts/main.go

push: ## deploy lastest built container to docker hub
	docker push ${IMAGE_NAME}:${VERSION}

deps: ## get service pkg + test deps
	@echo "[deps] getting go deps"
	go mod download
	go mod vendor

lint: ## apply golint
	@echo "[lint] applying go fmt & vet"
	go fmt ./...
	go vet ./...

release: cont push deploy ## build and deploy a docker container

test: lint ## test service code
	@echo "[test] running tests w/ cover"
	go test ./... -cover -race

db:
	docker run -d \
	--name osrsloadouts-mongo \
	-v `pwd`/data/db:/data/db \
	-v `pwd`/scripts/migrations:/docker-entrypoint-initdb.d \
	-e MONGO_INITDB_DATABASE=osrsloadouts \
	-p 27017:27017 \
	mongo:4.2.9-bionic

	docker run -d \
	--name osrsloadouts-redis \
	-p 9736:6379 \
	redis:5.0.9-alpine

db-start:
	docker start osrsloadouts-mongo
	docker start osrsloadouts-redis

backup:
	sops exec-env secrets/prod.env ./scripts/backup-mongo.sh

db-sync: backup
	$(eval backup_file=`ls -tr /tmp | grep osrsloadouts | sort | tail -n 1`)
	echo backup ${backup_file}
	mongo --eval "db=db.getSiblingDB('osrsloadouts');db.dropDatabase();" --quiet
	mongorestore --stopOnError --drop --gzip --archive=/tmp/${backup_file}

release-all: context
	make cont && make -C web cont
	make push && make -C web push
	sops exec-env secrets/prod.env 'make deploy && make -C web deploy'

mongo:
	mongo "`sops -d secrets/prod.env | grep "OSRSLOADOUTS_MONGO_ADDR=" | sed 's/OSRSLOADOUTS_MONGO_ADDR=//g'`"

domains: context
	gcloud beta run domain-mappings create --service osrs-loadouts-api --platform managed --domain api.osrsloadouts.app
	gcloud beta run domain-mappings create --service osrs-loadouts-web --platform managed --domain osrsloadouts.app


bench:
	sops exec-env secrets/dev.env 'go test -run=XXX -timeout 20m -bench=. -benchtime=5s ./...'


migration:
	sops exec-env $(SECRET_FILE) 'bash scripts/run_migrations.sh'
