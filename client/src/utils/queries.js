import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      avatar {
        _id
        username
        avatarUrl
      }
      profile {
        _id
        username
        teacher
        years
        stage
        firstname
        lastname
        story
      }
      location {
        _id
        username
        longitude
        latitude
        city
        state
        country
      }
      contacts {
        _id
        username
        friendId
        friendUsername
        todaysDate
        avatarUrl
        friendAvatarUrl
      }
    }
  }
`;
export const QUERY_USER = gql`
  query user($id: String) {
    user(id: $id) {
      _id
      username
      email
      avatar {
        _id
        username
        avatarUrl
      }
      profile {
        _id
        username
        teacher
        years
        stage
        firstname
        lastname
        story
      }
      location {
        _id
        username
        longitude
        latitude
        city
        state
        country
      }
      contacts {
        _id
        username
        friendId
        friendUsername
        todaysDate
        avatarUrl
        friendAvatarUrl
      }
    }
  }
`;
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      avatar {
        _id
        username
        avatarUrl
      }
      profile {
        _id
        username
        teacher
        years
        stage
        firstname
        lastname
        story
      }
      location {
        _id
        username
        longitude
        latitude
        city
        state
        country
      }
      contacts {
        _id
        username
        friendId
        friendUsername
        todaysDate
        avatarUrl
        friendAvatarUrl
      }
    }
  }
`;
export const QUERY_LOCATIONS = gql`
  query locations {
    locations {
      _id
      username
      longitude
      latitude
      city
      state
      country
    }
  }
`;
export const QUERY_AVATARS = gql`
  query avatars {
    avatars {
      _id
      username
      avatarUrl
    }
  }
`;
export const QUERY_AVATAR = gql`
  query avatar($id: String) {
    avatar(id: $id) {
      _id
      username
      avatarUrl
    }
  }
`;
export const QUERY_PROFILES = gql`
  query profiles {
    profiles {
      _id
      username
      firstname
      lastname
      stage
      years
      teacher
      story
    }
  }
`;
export const QUERY_PROFILE = gql`
  query profile($id: String) {
    profile(id: $id) {
      _id
      username
      teacher
      years
      stage
      firstname
      lastname
      story
    }
  }
`;
export const QUERY_REQUESTS = gql`
  query requests {
    requests {
      _id
      myName
      email
      destinationName
      avatarUrl
    }
  }
`;
export const QUERY_REQUEST = gql`
  query request($id: String) {
    request(id: $id) {
      _id
      myName
      email
      destinationName
      avatarUrl
    }
  }
`;
export const QUERY_CONTACTS = gql`
  query contacts {
    contacts {
      _id
      username
      friendId
      friendUsername
      todaysDate
      avatarUrl
      friendAvatarUrl
    }
  }
`;
export const QUERY_CONTACT = gql`
  query contact($id: String) {
    contact(id: $id) {
      _id
      username
      friendId
      friendUsername
      todaysDate
      avatarUrl
      friendAvatarUrl
    }
  }
`;
