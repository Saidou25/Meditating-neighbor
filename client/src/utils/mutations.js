import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_AVATAR = gql`
  mutation addAvatar($username: String, $avatarUrl: String) {
    addAvatar(username: $username, avatarUrl: $avatarUrl) {
      _id
      username
      avatarUrl
    }
  }
`;
export const UPDATE_AVATAR = gql`
  mutation updateAvatar($id: String!, $username: String!, $avatarUrl: String) {
    updateAvatar(id: $id, username: $username, avatarUrl: $avatarUrl) {
      _id
      username
      avatarUrl
    }
  }
`;
export const DELETE_AVATAR = gql`
  mutation deleteAvatar($id: String!) {
    deleteAvatar(id: $id) {
      _id
      username
      avatarUrl
    }
  }
`;

export const ADD_LOCATION = gql`
  mutation addLocation(
    $username: String!
    $longitude: Float!
    $latitude: Float!
    $city: String!
    $state: String!
    $country: String!
  ) {
    addLocation(
      username: $username
      longitude: $longitude
      latitude: $latitude
      city: $city
      state: $state
      country: $country
    ) {
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
