## Description

Habitr is a web application that allows you create habits and make sure you stick to them.

I created this as a replacement for https://chains.cc since I wanted a self-hosted, open-source version of the functionality.

## Installation

This repo consists or the `api` and the `client`. The root folder has a `package.json` with scripts that allow for the installation and running of both concurrently.

```bash
$ npm install
```

```bash
$ npm install:both
```

You'll need to setup a Postgres database. You can use the `docker-compose.yml` to run one with `docker-compose up -d postgres`.

## Environment variables

Copy the `.env.example` file to a new file named `.env`. Set the database variables to match your Postgres database credentials.

If you use the `docker-compose.yml` for Postgres, it'll pull the environment variables from the `.env` file.

## Running the app

```bash
# development
$ npm run start

# build
$ npm run build
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Food with Friends is [MIT licensed](LICENSE).
