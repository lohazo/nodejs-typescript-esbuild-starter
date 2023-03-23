import { YogaInitialContext } from 'graphql-yoga'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis, { RedisOptions } from 'ioredis'

const redisHost = process.env.REDIS_HOST || '127.0.0.1'

const options: RedisOptions = {
  host: redisHost,
  port: 6379,
  db: process.env.REDIS_DB ? Number(process.env.REDIS_DB) : 0,
  retryStrategy: (times: number) => {
    // reconnect after
    return Math.min(times * 50, 2000)
  },
}

const redis = new Redis(options)

export interface GraphqlContext extends YogaInitialContext {
  pubsub: RedisPubSub
  redis: Redis
}

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
})

export async function createContext(
  initialContext: YogaInitialContext,
): Promise<GraphqlContext> {

  return {
    ...initialContext,
    // viewer: user,
    // prisma,
    pubsub,
    redis,
    // models: models,
  }
}

// In the background, increment a number every second and notify subscribers when
// it changes.
let currentNumber = 0
function incrementNumber() {
  currentNumber++
  pubsub.publish('NUMBER_INCREMENTED', currentNumber.toString())
  setTimeout(incrementNumber, 1000)
}
// Start incrementing
incrementNumber()
