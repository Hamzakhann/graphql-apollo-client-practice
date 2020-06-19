import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App";

import "./style.css";

const GITHUB_BASE_URL = "https://api.github.com/graphql";
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer  f459dd5a197148d44501d1336f166ce539e5e269`,
  },
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // do something with graphql error
  }
  if (networkError) {
    // do something with network error
    console.log(networkError);
  }
});
const link = ApolloLink.from([errorLink, httpLink]);
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
