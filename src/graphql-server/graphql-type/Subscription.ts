import { subscriptionField } from 'nexus'

export const CountSubscription = subscriptionField('count', {
  type: 'Int',
  subscribe: async (_, args, ctx) => {
    return ctx.pubsub.asyncIterator('NUMBER_INCREMENTED')
  },
  // subscribe: async function* (_) {
  //   for (let i = 1000; i >= 0; i--) {
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     yield { count: i }
  //   }
  // },
  resolve: (payload) => payload as any,
})
