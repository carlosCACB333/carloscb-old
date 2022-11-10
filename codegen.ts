import { CodegenConfig } from '@graphql-codegen/cli';
import { env } from './utils/env';

const config: CodegenConfig = {
  overwrite: true,
  schema: env.cms.url,
  config: {
    Headers: {
      Authorization: `Bearer ${env.cms.token}`,
    },
  },
  documents: 'graphql/**/*.graphql',
  generates: {
    'graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    },
    'graphql/generated/schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
