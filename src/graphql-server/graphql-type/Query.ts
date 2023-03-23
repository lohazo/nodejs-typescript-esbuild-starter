import { queryField } from "nexus";

export const helloField = queryField('hello', {
  type: 'String',
  resolve: () => 'world',
})
