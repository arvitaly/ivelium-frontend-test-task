/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}