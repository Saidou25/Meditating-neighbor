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
    contacts: [Contact]
  }
  type Avatar {
    _id: ID
    username: String
    avatarUrl: String
  }
  type Location {
    _id: ID
    username: String
    longitude: Float
    latitude: Float
    city: String
    state: String
    country: String
  }
  type Profile {
    _id: ID
    username: String
    firstname: String
    lastname: String
    stage: String
    years: String
    teacher: String
    story: String
  }
  type Request {
    _id: ID
    myName: String
    email: String
    destinationName: String
    avatarUrl: String
  }
  type Contact {
    _id: ID
    username: String
    friendId: String
    todaysDate: String
    avatarUrl: String
    friendAvatarUrl: String
    friendUsername: String
  }
  type Auth {
    token: ID!
    user: User!
  }
  type Query {
    users: [User]!
    user(id: String): User
    me: User
    locations: [Location]
    avatars: [Avatar]
    avatar(id: String): Avatar!
    profiles: [Profile]
    profile(id: String): Profile
    requests: [Request]
    request(id: String): Request
    contacts: [Contact]
    contact(id: String): Contact
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String, password: String): Auth
    addAvatar(username: String, avatarUrl: String): Avatar
    deleteAvatar(id: String!): Avatar
    deleteLocation(id: String!): Location
    updateAvatar(id: String, username: String, avatarUrl: String): Avatar
    addProfile(
      username: String
      firstname: String
      lastname: String
      stage: String
      years: String
      teacher: String
      story: String
    ): Profile
    updateProfile(
      id: String!
      username: String
      firstname: String
      lastname: String
      stage: String
      years: String
      teacher: String
      story: String
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
    addRequest(myName: String, email: String, destinationName: String, avatarUrl: String): Request
    deleteRequest(id: String!): Request
    addContact(username: String, friendId: String!, friendUsername: String, todaysDate: String, avatarUrl: String, friendAvatarUrl: String): Contact
    deleteUser(id: String!): User
    deleteContact(id: String!): Contact
  }
`;

module.exports = typeDefs;
