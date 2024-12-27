'use client';

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';
import { FC, PropsWithChildren } from 'react';
import { ssrMakeClient } from '../graphql/clients/ssrMakeClient';

const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloNextAppProvider makeClient={ssrMakeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
export default ApolloProvider;
