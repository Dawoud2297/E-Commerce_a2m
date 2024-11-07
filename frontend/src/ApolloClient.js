import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:import.meta.env.VITE_API_URI,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});

export default client;
