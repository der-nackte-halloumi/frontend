# frontend

The frontend for [der-nackte-halloumi.de](https://der-nackte-halloumi.de) / [unpackaged.world](https://unpackaged.world), written with React and Next.js.

[![Netlify Status](https://api.netlify.com/api/v1/badges/4a0c2551-f427-4ead-9baf-bda001c8fe93/deploy-status)](https://app.netlify.com/sites/clever-pasteur-7e02ee/deploys)

## Installation

Create your own `.env`-file and add the respective tokens:

```sh
cp -p .env.dist .env
```

_Note: The pre-filled configuration assumes a local installation by setting up the [base](https://github.com/der-nackte-halloumi/base) repo._

The application is setup with [yarn](https://yarnpkg.com/) as package manager. To install all dependencies run:

```sh
yarn install --pure-lockfile
```

## Development

Start the build- and development-server

```sh
yarn run dev
```

and head over to [localhost:3000](http://localhost:3000).
