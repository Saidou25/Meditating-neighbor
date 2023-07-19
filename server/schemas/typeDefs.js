const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    location: Location
    profile: Profile
  }
  type Profile {
    _id: ID!
    avatarUrl: String
    username: String
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
    profiles: [Profile]!
    profile(id: String!): Profile
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String, password: String): Auth
    addProfile(username: String!, avatarUrl: String!): Profile
    updateProfile(id: String!, username: String!, avatarUrl: String): Profile
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
