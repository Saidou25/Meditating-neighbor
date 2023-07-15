const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    location: Location
  }

  type Location {
    longitude: String!
    latitude: String!
    city: String!
    state: String!
    country: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(id: String!): User
    me: User
    locations: [Location]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String, password: String): Auth
    addLocation(
      username: String!
      longitude: String!
      latitude: String!
      city: String!
      state: String!
      country: String!
    ): Location
  }
`;

module.exports = typeDefs;
