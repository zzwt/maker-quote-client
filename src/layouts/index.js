import React from 'react';
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import apolloLogger from 'apollo-link-logger';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { StyledLayout } from './style.js';

const logLink = new ApolloLink((operation, forward) => {
  console.time(operation.operationName);
  return forward(operation).map((result) => {
    console.timeEnd(operation.operationName);
    return result;
  });
});

let API_URL = 'http://localhost:1337/graphql';
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://back.makerquote.com/graphql';
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([apolloLogger, new HttpLink({ uri: API_URL })]),
});
export default function Layout({ children }) {
  return (
    <ApolloProvider client={client}>
      <StyledLayout>
        <Header />
        <div className="main-content">{children}</div>
        <Footer />
      </StyledLayout>
    </ApolloProvider>
  );
}
