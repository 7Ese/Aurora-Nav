/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WEATHER_API_KEY: string
    readonly VITE_ADMIN_PASSWORD_HASH: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
