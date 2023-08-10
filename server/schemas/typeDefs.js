const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    location: Location
    avatar: Avatar
    profile: Profile
    requests: [Request]
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
  type Profile {
    _id: ID!
    username: String
    stage: Int
    years: Int
    teacher: String
  }
  type Request {
    _id: ID!
    myName: String
    email: String
    destinationName: String
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
    avatars: [Avatar]!
    avatar(id: String!): Avatar!
    profiles: [Profile]
    profile(id: String!): Profile
    request(id: String!): Request
    requests: [Request]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String, password: String): Auth
    addAvatar(username: String, avatarUrl: String): Avatar
    deleteAvatar(id: String!): Avatar
    updateAvatar(id: String!, username: String!, avatarUrl: String): Avatar
    addProfile(
      username: String
      stage: Int
      years: Int
      teacher: String
    ): Profile
    updateProfile(
      id: String!
      username: String
      stage: Int
      years: Int
      teacher: String
    ): Profile
    deleteProfile(id: String!): Profile
    addLocation(
      username: String!
      longitude: Float!
      latitude: Float!
      city: String!
      state: String!
      country: String!
    ): Location
    updateLocation(
      id: String!
      username: String!
      longitude: Float!
      latitude: Float!
      city: String!
      state: String!
      country: String!
    ): Location
    addRequest(myName: String, email: String, destinationName: String): Request
  }
`;

module.exports = typeDefs;
