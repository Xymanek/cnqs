// import type { ConfigFile } from '@rtk-query/codegen-openapi/lib/types'

const config/*: ConfigFile*/ = {
    schemaFile: 'http://localhost:5041/swagger/v1/swagger.json',
    apiFile: './src/data/emptyApi.ts',
    apiImport: 'emptySplitApi',
    outputFile: './src/data/backendApi.ts',
    exportName: 'backendApi',
    hooks: true,
}

// noinspection JSUnusedGlobalSymbols
// export default config;

module.exports.default = config;