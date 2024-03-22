"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { FC, PropsWithChildren } from "react";
import { makeClient } from "../graphql/clientSideMakeClient";

const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
export default ApolloProvider;
