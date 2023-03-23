import { useGraphQlJit } from '@envelop/graphql-jit';
import { createYoga } from 'graphql-yoga'
import { createContext } from "./context";
import { schema } from "./schema";

export const yogaGraphqlServer = createYoga({
  schema: schema,
  context(initialContext) {
    return createContext(initialContext);
  },
  plugins: [useGraphQlJit()],
  graphiql: {
    subscriptionsProtocol: "WS",
  }
});
