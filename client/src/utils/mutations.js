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
      _id
      username
      profile {
        _id
        username
        firstname
        lastname
        stage
        years
        teacher
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
        friendId
        todaysDate
        avatarUrl
        friendAvatarUrl
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: String!, $username: String!, $email: String!, $password: String!) {
    updateUser(id: $id, username: $username, email: $email, password: $password) {
      _id
      email
      username
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
  mutation updateAvatar($id: String, $username: String, $avatarUrl: String) {
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
    $username: String
    $longitude: Float
    $latitude: Float
    $city: String
    $state: String
    $country: String
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
    $id: String
    $username: String
    $longitude: Float
    $latitude: Float
    $city: String
    $state: String
    $country: String
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
export const DELETE_LOCATION = gql`
  mutation deleteLocation($id: String!) {
    deleteLocation(id: $id) {
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
    $teacher: String
    $years: String
    $firstname: String
    $lastname: String
    $stage: String
    $story: String
  ) {
    addProfile(
      username: $username
      firstname: $firstname
      lastname: $lastname
      stage: $stage
      years: $years
      teacher: $teacher
      story: $story
    ) {
      _id
      username
      firstname
      lastname
      stage
      teacher
      years
      story
    }
  }
`;
export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: String!
    $username: String!
    $firstname: String
    $lastname: String
    $stage: String
    $years: String
    $teacher: String
    $story: String
  ) {
    updateProfile(
      id: $id
      username: $username
      firstname: $firstname
      lastname: $lastname
      stage: $stage
      years: $years
      teacher: $teacher
      story: $story
    ) {
      _id
      username
      firstname
      lastname
      stage
      teacher
      years
      teacher
      story
    }
  }
`;
export const DELETE_PROFILE = gql`
  mutation deleteProfile($id: String!) {
    deleteProfile(id: $id) {
      _id
      username
      firstname
      lastname
      stage
      teacher
      years
      story
    }
  }
`;
export const ADD_REQUEST = gql`
  mutation addRequest(
    $myName: String
    $email: String
    $destinationName: String
    $avatarUrl: String
  ) {
    addRequest(
      myName: $myName
      email: $email
      destinationName: $destinationName
      avatarUrl: $avatarUrl
    ) {
      _id
      myName
      email
      destinationName
      avatarUrl
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
      avatarUrl
    }
  }
`;
export const ADD_CONTACT = gql`
  mutation addContact(
    $username: String
    $friendId: String
    $friendUsername: String
    $todaysDate: String
    $avatarUrl: String
    $friendAvatarUrl: String
  ) {
    addContact(
    username: $username
      friendId: $friendId
      friendUsername: $friendUsername
      todaysDate: $todaysDate
      avatarUrl: $avatarUrl
      friendAvatarUrl: $friendAvatarUrl
    ) {
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
export const DELETE_CONTACT = gql`
  mutation deleteContact($id: String!) {
    deleteContact(id: $id) {
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
