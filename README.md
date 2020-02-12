# frontend

The frontend for [unpackaged.world](https://unpackaged.world), written with [Svelte](https://svelte.dev).

[![Netlify Status](https://api.netlify.com/api/v1/badges/4a0c2551-f427-4ead-9baf-bda001c8fe93/deploy-status)](https://app.netlify.com/sites/clever-pasteur-7e02ee/deploys)

## Installation

Create your own `.env`-file and add the respective tokens:

```sh
cp -p .env.dist .env
```

_Note: The pre-filled configuration assumes a local installation by setting up the [base](https://github.com/der-nackte-halloumi/base) repo._

Install all dependencies:

```sh
npm install
```

## Development

Start the build- and development-server

```sh
npm run dev
```

and head over to [localhost:5000](http://localhost:5000).
