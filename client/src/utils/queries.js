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
      location {
        _id
        username
        longitude
        latitude
        city
        state
        country
      }
    }
  }
`;
export const QUERY_USER = gql`
  query user($id: String!) {
    user(id: $id) {
      _id
      username
      email
      avatar {
        _id
        username
        avatarUrl
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
      location {
        _id
        username
        longitude
        latitude
        city
        state
        country
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
  query avatar($id: String!) {
    avatar(id: $id) {
      _id
      username
      avatarUrl
    }
  }
`;
