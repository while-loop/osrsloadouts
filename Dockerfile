FROM golang:1.12.9-alpine as builder
MAINTAINER cvballa3g0@gmail.com

RUN apk update && apk add git make bzr

ENV PATH=${PATH}:${GOPATH}/bin:/usr/local/bin
ENV GOFLAGS="-mod=vendor"

# download & cache dep layer
WORKDIR /src
COPY go.mod go.sum ./
COPY vendor ./vendor
RUN go mod verify

COPY . .
WORKDIR /src

RUN make build
RUN cp ${GOPATH}/bin/osrsinvy /usr/local/bin


#####################################################################
# Prod image
FROM alpine:latest

RUN apk add --update --no-cache ca-certificates
COPY --from=builder /usr/local/bin/osrsinvy /usr/local/bin/
CMD osrsinvy
