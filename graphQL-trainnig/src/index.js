import { GraphQLServer } from 'graphql-yoga'
// Type definition => Schema
// Scaler Types: String, Boolean, Int, Float, ID
const typeDefs = `
type Query {
  greeting(name: String, position: String): String!
  add(a: Float!, b: Float!): Float!
  me: User!
  post: Post!
}
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}
type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
}
`
//Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info){
      if(args.name && args.position) {
        return `helloooo, ${args.name}! ty si môj oblúbený ${args.position}`
      } else {
        return "helo pan anonim :)"
      } 
    },
    add(parent, args, ctx, info) {
      return args.a + args.b
    },
   me() {
     return {
      id: '123',
      name: "Igor Satek",
      email: "igorsatek@gmail.com",
      age: '88'
     }
   },
   post() {
     return {
       id: '123',
       title: "My first post",
       body: "Bla bla bla bla bla bla bla",
       published: false
     }
   }
  }

}
const server = new GraphQLServer({
  typeDefs,
  resolvers
})
server.start(() => {
  console.log("The server is running")
})