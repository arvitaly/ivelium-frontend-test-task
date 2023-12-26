# Frontend test task for Ivelium

![Test & Deploy](https://github.com/arvitaly/ivelium-frontend-test-task/actions/workflows/github-static-page.yaml/badge.svg)

Task description: https://github.com/ivelum/job/blob/master/challenges/frontend.md

Tech stack: Vite.js + React + Apollo + Antd

[Demo App](https://ivelium-frontend-test-task.vercel.app/)

https://github.com/arvitaly/ivelium-frontend-test-task/assets/2562855/6fa48ebb-6e96-49e8-8fea-46d2d4c1291a

## Usage

[How to obtain Github API Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

## Run locally

```sh
npm install
npm run dev
```

## Development

App use the graphql code generation via `@graphql-codegen`.

Command to run the graphql compilator with wather:

```sh
npm run graphql:watch
```

For graphql type-checking, install [Apollo VSCode Extension](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo)

## Tests

```sh
npm test
```
