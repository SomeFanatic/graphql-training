import { GraphQLServer } from 'graphql-yoga'
// Type definition => Schema
// Scaler Types: String, Boolean, Int, Float, ID
const typeDefs = `
type Query {
  id: ID!
  name: String!
  age: Int!
  employed: Boolean!
  gpa: Float
  title: String!
  price: Float!
  releaseYear: Int
  rating: Float
  inStock: Boolean!
}
`
//Resolvers
const resolvers = {
  Query: {
    id() {
      return '123'
    },
    name() {
      return 'Igor'
    },
    age() {
      return '31'
    },
    employed() {
      return true
    },
    gpa() {
      return null
    },
    title() {
      return 'Diamantový náramok'
    },
    price() {
      return '8888.88'
    },
    releaseYear() {
      return '2009'
    },
    rating() {
      return '4.9'
    },
    inStock() {
      return true
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