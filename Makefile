# service specific vars
TARGET	 		:= osrsinvy
VERSION			:= 0.0.1
ORG		 		:= lunchride
COMMIT      	:= $(shell git rev-parse --short HEAD)
BUILD_TIME		:= $(shell date -u '+%Y-%m-%d_%H:%M:%S')
PACKAGE 		:= $(shell grep module go.mod | awk '{ print $$2; }')
DOCKER_REGISTRY	:= gcr.io
IMAGE_NAME  	:= ${DOCKER_REGISTRY}/${ORG}/${SERVICE}
GOFLAGS			:= -mod=vendor

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
		-X ${PACKAGE}.Version=${VERSION} \
		-X ${PACKAGE}.Commit=${COMMIT} \
		-X ${PACKAGE}.BuildTime=${BUILD_TIME} \
		-X ${PACKAGE}.Name=${TARGET}" \
		-o ${GOPATH}/bin/${TARGET} ./cmd/${TARGET}
	${GOPATH}/bin/${TARGET} -v

clean: ## remove service bin from $GOPATH/bin
	@echo "[clean] removing ${SERVICE} files"
	rm -f ${GOPATH}/bin/${TARGET}

cont: ## build a cached service container
	docker build -t ${IMAGE_NAME} -t ${IMAGE_NAME}:${VERSION} ../../

cont-nc: ## build a non-cached service container
	docker build --no-cache -t ${IMAGE_NAME} -t ${IMAGE_NAME}:${VERSION} ../../

deploy: ## deploy lastest built container to docker hub
	echo deploy

push: ## deploy lastest built container to docker hub
	docker push ${IMAGE_NAME}

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

indexes: ## -
	gcloud datastore indexes create index.yaml
