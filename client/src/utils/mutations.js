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
export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
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
export const UPDATE_LOCATION = gql`
  mutation updateLocation(
    $id: String!
    $username: String!
    $longitude: Float!
    $latitude: Float!
    $city: String!
    $state: String!
    $country: String!
  ) {
    updateLocation(
      id: $id
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
export const ADD_PROFILE = gql`
  mutation addProfile(
    $username: String!
    $stage: Int
    $years: Int
    $teacher: String
  ) {
    addProfile(
      username: $username
      stage: $stage
      years: $years
      teacher: $teacher
    ) {
      _id
      stage
      teacher
      years
      username
    }
  }
`;
export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: String!
    $username: String!
    $stage: Int
    $years: Int
    $teacher: String
  ) {
    updateProfile(
      id: $id
      username: $username
      stage: $stage
      years: $years
      teacher: $teacher
    ) {
      _id
      stage
      teacher
      years
      username
    }
  }
`;
export const DELETE_PROFILE = gql`
  mutation deleteProfile($id: String!) {
    deleteProfile(id: $id) {
      _id
      stage
      teacher
      years
      username
    }
  }
`;
export const ADD_REQUEST = gql`
  mutation addRequest($myName: String, $email: String, $destinationName: String) {
    addRequest(myName: $myName, email: $email, destinationName: $destinationName) {
      _id
      myName
      email
      destinationName
    }
  }
`;
export const DELETE_REQUEST = gql`
  mutation deleteRequest($id: String!) {
    deleteRequest(id: $id) {
      _id
      myName
      email
      destinationName
    }
  }
`;
export const ADD_RESPONSE = gql`
  mutation addResponse($toName: String, $email: String, $fromName: String) {
    addResponse(toName: $toName, email: $email, fromName: $fromName) {
      _id
      fromName
      email
      toName
    }
  }
`;
export const DELETE_RESPONSE = gql`
  mutation deleteResponse($id: String!) {
    deleteResponse(id: $id) {
      _id
      fromName
      email
      toName
    }
  }
`;
export const ADD_CONTACT = gql`
  mutation addContact($friendId: String!, $todaysDate: String) {
    addContact(friendId: $friendId, todaysDate: $todaysDate) {
      _id
      friendId
      todaysDate
    }
  }
`;