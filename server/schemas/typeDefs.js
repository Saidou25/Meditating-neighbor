const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    location: Location
    avatar: Avatar
  }
  type Avatar {
    _id: ID
    username: String
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
    user(id: String!): User!
    me: User!
    locations: [Location]!
    avatars: [Avatar]
    avatar(id: String!): Avatar!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String, password: String): Auth
    addAvatar(username: String, avatarUrl: String): Avatar
    deleteAvatar(id: String!): Avatar
    updateAvatar(id: String!, username: String!, avatarUrl: String): Avatar
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
