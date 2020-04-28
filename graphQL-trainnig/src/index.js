import { GraphQLServer } from 'graphql-yoga'

const users = [{
  id: "User2588754",
  name: "Igor Šátek",
  email: "igorsatek@gmail.com",
  age: 27
},{
  id: "User2288759",
  name: "Martin Kuchto",
  email: "kuchto@gmail.com",
},{
  id: "User2386754",
  name: "Roman Pinček",
  email: "romanpincek@gmail.com",
  age: 27
}]

const posts = [{
  id: "Post655897",
  title: "Najkrajší deň",
  body: "Včera som zažila tie najkrajši narodeniny môj syn mi...",
  published: true,
  author: "User2588754"
},{
  id: "Post653897",
  title: "Najhorší deň",
  body: "Včera som zažila ten najhorší deň môj muž mi...",
  published: true,
  author: "User2588754"
},{
  id: "Post654897",
  title: "Deň za dňom mi",
  body: "Každý deň je rovnaký neviem ako dlho to ešte zvládnem...",
  published: false,
  author: "User2288759"
}]
// Type definition => Schema
// Scaler Types: String, Boolean, Int, Float, ID
const typeDefs = `
type Query {
  users(query: String): [User!]!
  posts(query: String): [Post!]!
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
  author: User!
}
`
//Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if(!args.query) {
        return users
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      if(!args.query) {
        return posts
      }
      return posts.filter((post) => {
        return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
      })

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
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
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