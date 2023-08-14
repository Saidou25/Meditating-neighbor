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
        stage
        years
        teacher
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
      requests {
        _id
        myName
        email
        destinationName
      }
      responses {
        _id
        toName
        email
        fromName
      }
      contacts {
        _id
        friendId
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
      profile {
        _id
        username
        stage
        years
        teacher
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
      requests {
        _id
        myName
        email
        destinationName
      }
      responses {
        _id
        toName
        email
        fromName
      }
      contacts {
        _id
        friendId
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
        stage
        years
        teacher
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
      requests {
        _id
        myName
        email
        destinationName
      }
      responses {
        _id
        toName
        email
        fromName
      }
      contacts {
        _id
        friendId
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
export const QUERY_PROFILES = gql`
  query profiles {
    profiles {
      _id
      username
      stage
      years
      teacher
    }
  }
`;
export const QUERY_PROFILE = gql`
  query profile($id: String!) {
    profile(id: $id) {
      _id
      uername
      stage
      years
      teacher
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
    }
  }
`;
export const QUERY_REQUEST = gql`
  query request($id: String!) {
    request(id: $id) {
      _id
      myName
      email
      destinationName
    }
  }
`;
export const QUERY_RESPONSES = gql`
  query responses {
    responses {
      _id
      toName
      email
      fromName
    }
  }
`;
export const QUERY_RESPONSE = gql`
  query response($id: String!) {
    response(id: $id) {
      _id
      toName
      email
      fromName
    }
  }
`;
export const QUERY_CONTACTS = gql`
  query contacts {
    contacts {
      _id
      friendId
    }
  }
`;
export const QUERY_CONTACT = gql`
  query contact($id: String!) {
    contact(id: $id) {
      _id
      friendId
    }
  }
`;
