import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { yogaGraphqlServer } from './graphql-server/graphql-server'

const PORT = process.env.PORT || 4002

async function main() {
  const httpServer = createServer(yogaGraphqlServer)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      execute: (args: any) => args.rootValue.execute(args),
      subscribe: (args: any) => args.rootValue.subscribe(args),
      onSubscribe: async (ctx, msg) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } =
        yogaGraphqlServer.getEnveloped(ctx)
  
        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe
          }
        }
  
        const errors = validate(args.schema, args.document)
        if (errors.length) return errors
        return args
      }
    },
    wsServer
  )

  // Start the server and you're done!
  httpServer.listen(PORT, () => {
    console.info(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`)
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`
    );
  })
}

main().catch((err) => console.log(err))
// .finally(() => process.exit(0))
