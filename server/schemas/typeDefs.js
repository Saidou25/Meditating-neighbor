const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    location: Location
    avatarUrl: String
  }

  type Location {
    _id: ID!
    username: String
    longitude: Float!
    latitude: Float!
    city: String!
    state: String!
    country: String
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    users: [User]!
    user(id: String!): User
    me: User
    locations: [Location]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String, password: String): Auth
    updateUser(username: String!, email: String!, avatarUrl: String): User
    addLocation(
      username: String!
      longitude: Float!
      latitude: Float!
      city: String!
      state: String!
      country: String!
    ): Location
  }
`;

module.exports = typeDefs;
