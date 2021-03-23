import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { StyledLayout } from './style.js';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});
export default function Layout({ children }) {
  return (
    <ApolloProvider client={client}>
      <StyledLayout>
        <Header />
        {children}
        <Footer />
      </StyledLayout>
    </ApolloProvider>
  );
}
