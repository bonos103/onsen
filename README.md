# furomap

> My sensational Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ yarn install

# SSL settings
$ brew install mkcert
$ brew install nss # if you use Firefox
$ mkcert --install

$ cd ./app/..
$ mkdir cert
$ cd cert

$ mkcert localhost 127.0.0.1 0.0.0.0
...
The certificate is at "./localhost+2.pem" and the key at "./localhost+2-key.pem" ✅

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Production

```
$ docker-compose -f docker-compose.production.yml builid
$ docker-compose -f docker-compose.production.yml up -d
```
