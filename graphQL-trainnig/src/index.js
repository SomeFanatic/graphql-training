import { GraphQLServer } from 'graphql-yoga'
// data import
import { users } from './users'
import { posts } from './posts'
import { comments } from './comments'


// Type definition => Schema
// Scaler Types: String, Boolean, Int, Float, ID
const typeDefs = `
type Query {
  users(query: String): [User!]!
  posts(query: String): [Post!]!
  comments: [Comment!]
  me: User!
  post: Post!

}
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts: [Post!]!
  comments: [Comment!]
}
type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  comments: [Comment!]
}
type Comment {
  id: ID!
  author: User!
  text: String!
  post: Post!
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
    comments(parent, args, ctx, info){
      return comments
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
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
      })
    }
    
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    }
  }, 
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
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