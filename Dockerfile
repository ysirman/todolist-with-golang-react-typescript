FROM golang:1.14.4-alpine3.12
COPY ./api /api
WORKDIR /api
RUN apk update && \
apk add --no-cache git && \
go get -u github.com/oxequa/realize && \
go get -tags 'mysql' -u github.com/golang-migrate/migrate/v4/cmd/migrate@master && \ 
go build -o api
