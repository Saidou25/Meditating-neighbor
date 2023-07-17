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
