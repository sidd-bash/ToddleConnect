import {gql} from 'apollo-server'
const typedefs = gql`
type User {
  id: ID!
  first_name: String!
  last_name: String!
  email: String!
  post: String!
  image:String
}

type Message {
  id: ID!
  sender_id: ID!
  receiver_id: ID!
  timestamp: String!
  content: String!
}

type AuthPayload {
  user: User!
  authToken: String!
}

type Query {
  users(keyword: String): [User!]!  # List of users
  contacts(userId: ID!): [User!]!  # Users with messages for a specific user
  messages(user1Id: ID!, user2Id: ID!): [Message!]!  # Messages between two users
}

type Mutation {
  createUser(first_name: String!, last_name: String!, email: String!, password: String!, post: String): AuthPayload  # Create a user
  login(email: String!, password: String!): AuthPayload  # Login and get user info with token
  updateUser(id: ID!, first_name: String!, last_name: String!, image: String): User!  # Update user details
  createMessage(sender_id: ID!, receiver_id: ID!, content: String!): Message!  # Create a message
}
`

export default typedefs;