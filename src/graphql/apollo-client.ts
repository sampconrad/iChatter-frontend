import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { getSession } from "next-auth/react";

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "wss://ichatter-backend-production.up.railway.app/graphql/subscriptions",
          connectionParams: async () => ({
            session: await getSession(),
          }),
        })
      )
    : null;

const httpLink = new HttpLink({
  uri: "https://ichatter-backend-production.up.railway.app/graphql",
  credentials: "include",
});

const link =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});