import { makeSchema } from 'nexus'
import path from 'node:path'
import * as types from './graphql-type'

export const schema = makeSchema({
  types: types,
  contextType: {
    module: path.join(__dirname, 'context.ts'),
    export: 'GraphqlContext',
  },
  outputs: {
    typegen: path.join(
      __dirname,
      '../../node_modules/@types/nexus-typegen/index.d.ts',
    ),
    schema: path.join(__dirname, './api.graphql'),
  },
  shouldExitAfterGenerateArtifacts: Boolean(
    process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION,
  ),
})
