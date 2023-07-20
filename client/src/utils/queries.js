import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      profile {
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
      profile {
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
      profile {
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
