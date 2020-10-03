# service specific vars
SERVICE	 		:= web
ORG		 		:= osrs-loadouts
DOCKER_REGISTRY	:= gcr.io
IMAGE_NAME  	:= ${DOCKER_REGISTRY}/${ORG}/${SERVICE}
VERSION			:= 0.0.15
GCLOUD_SERVICE	:= ${ORG}-${SERVICE}

.PHONY: deps test build cont cont-nc all deploy help clean
.DEFAULT_GOAL := build
SHELL:=/bin/bash

help: ## halp
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

all: deps test build ## get && test && build

clean:
	@echo "[clean] rm'ing js files"
	rm -rf build

version:
	sed -i 's/"version": ".*",/"version": "${VERSION}",/' package.json

deps:
	npm install --silent
	npm install react-scripts@3.0.1 -g --silent

build: clean version ## build service binary file
	@echo "[build] building js files"
	sops exec-env ../secrets/web.prod.env 'npm run-script build'

cont: build ## build a cached service container
	docker build -t ${IMAGE_NAME} -t ${IMAGE_NAME}:${VERSION} .

cont-nc: ## build a non-cached service container
	docker build --no-cache -t ${IMAGE_NAME} -t ${IMAGE_NAME}:${VERSION} .

deploy: ## deploy lastest built container to docker hub
	gcloud config set project ${ORG}
	gcloud beta run deploy ${GCLOUD_SERVICE} --image ${IMAGE_NAME}:${VERSION} --platform=managed  --allow-unauthenticated

push: ## deploy lastest built container to docker hub
	docker push ${IMAGE_NAME}:${VERSION}

deps: ## get service pkg + test deps
	@echo "[deps] getting js deps"
	@npm install --silent
	@npm install react-scripts@3.0.1 -g --silent

release: cont push deploy ## build and deploy a docker container

test: ## test  code
	@echo "[test] running tests"
	@npm run test

dev:
	NODE_ENV=development sops exec-env ../secrets/web.dev.env 'npm start'

prod:
	NODE_ENV=production sops exec-env ../secrets/web.prod.env 'npm start'