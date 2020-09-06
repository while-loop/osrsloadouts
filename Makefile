# service specific vars
SERVICE	 		:= api
VERSION			:= 0.0.7
ORG		 		:= osrs-loadouts
COMMIT      	:= $(shell git rev-parse --short HEAD)
BUILD_TIME		:= $(shell date -u '+%Y-%m-%d_%H:%M:%S')
PACKAGE 		:= $(shell grep module go.mod | awk '{ print $$2; }')
DOCKER_REGISTRY	:= gcr.io
IMAGE_NAME  	:= ${DOCKER_REGISTRY}/${ORG}/${SERVICE}
GOFLAGS			:= -mod=vendor
GCLOUD_SERVICE	:= ${ORG}-${SERVICE}

.PHONY: proto deps test build cont cont-nc all deploy help clean lint
.DEFAULT_GOAL := build
SHELL:=/bin/sh
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
		-o ${GOPATH}/bin/osrsinvy ./cmd/osrsinvy
	${GOPATH}/bin/osrsinvy -v

clean: ## remove service bin from $GOPATH/bin
	@echo "[clean] removing ${SERVICE} files"
	rm -f ${GOPATH}/bin/osrsinvy

cont: ## build a cached service container
	docker build -t ${IMAGE_NAME} -t ${IMAGE_NAME}:${VERSION} .

cont-nc: ## build a non-cached service container
	docker build --no-cache -t ${IMAGE_NAME} -t ${IMAGE_NAME}:${VERSION} .

context:
	gcloud config set project ${ORG}
	gcloud config set run/region us-east1

deploy: context ## deploy lastest built container to docker hub
	gcloud beta run deploy ${GCLOUD_SERVICE} \
	--image ${IMAGE_NAME}:${VERSION} \
	--platform=managed  \
	--allow-unauthenticated \
	--set-env-vars OSRSLOADOUTS_MONGO_ADDR="${OSRSLOADOUTS_MONGO_ADDR}",OSRSLOADOUTS_MONGO_DB=${OSRSLOADOUTS_MONGO_DB}

push: ## deploy lastest built container to docker hub
	docker push ${IMAGE_NAME}:${VERSION}

deps: ## get service pkg + test deps
	@echo "[deps] getting go deps"
	go mod download

lint: ## apply golint
	@echo "[lint] applying go fmt & vet"
	gofmt -l .
	go vet ./...

release: cont push deploy ## build and deploy a docker container

test: lint ## test service code
	@echo "[test] running tests w/ cover"
	go test ./... -cover

test-all: lint ## test service code
	@echo "[test] running tests w/ cover"
	go test ./... -race -cover

db:
	docker run -d \
	--name osrsloadouts-mongo \
	-v `pwd`/tmp/db:/data/db \
	-v `pwd`/scripts:/docker-entrypoint-initdb.d \
	-e MONGO_INITDB_DATABASE=osrsinvy \
	-p 27017:27017 \
	mongo:4.0.12-xenial

release-all:
	make cont && make -C web cont
	make push && make -C web push
	honcho run -e .env make deploy && make -C web deploy

mongo:
	mongo "mongodb+srv://osrsinvy-u1age.gcp.mongodb.net/osrsinvy" --username osrsinvy

domains: context
	gcloud beta run domain-mappings create --service osrs-loadouts-api --platform managed --domain api.osrsloadouts.app
	gcloud beta run domain-mappings create --service osrs-loadouts-web --platform managed --domain osrsloadouts.app