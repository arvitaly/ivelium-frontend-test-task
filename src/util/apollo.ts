import { ApolloClient, InMemoryCache } from "@apollo/client";

export const createApolloClient = (token: string) => {
  return new ApolloClient({
    uri: "https://api.github.com/graphql",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};