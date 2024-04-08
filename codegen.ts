import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:6600/graphql',
  documents: ['src/**/*.ts'],
  generates: {
    './src/graphql/types': {
      preset: 'client',
    },
  },
  overwrite: true,
};

export default config;
