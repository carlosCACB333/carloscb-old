import { ApolloClient, InMemoryCache } from "@apollo/client";
import { env } from "../config/env";

export const client = new ApolloClient({
  uri: env.cms.url,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${env.cms.token}`,
  },
});
