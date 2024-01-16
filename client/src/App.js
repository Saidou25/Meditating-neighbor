import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/userContext";
import Contacts from "./pages/Contacts";
import LandingPage from "./pages/LandingPage";
import Usa from "./pages/Usa";
import Profile from "./pages/Profile";
import AddProfile from "./pages/Profile/AddProfile";
import UpdateProfile from "./pages/Profile/UpdateProfile";
import Members from "./pages/Members";
import Login from "./pages/LandingPage/Login";
import VerifyEmail from "./pages/LandingPage/VerifyEmail";
import ResetPassword from "./pages/LandingPage/ResetPassword";
import Signup from "./pages/LandingPage/Signup";
import PageNotFound from "./pages/PageNotFound";
import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.css";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        avatars: {
          merge(existing, imcoming) {
            return imcoming;
          },
        },
        profiles: {
          merge(existing, imcoming) {
            return imcoming;
          },
        },
        requests: {
          merge(existing, imcoming) {
            return imcoming;
          },
        },
        locations: {
          merge(existing, imcoming) {
            return imcoming;
          },
        },
        contacts: {
          merge(existing, imcoming) {
            return imcoming;
          },
        },
        users: {
          merge(existing, imcoming) {
            return imcoming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />}>
              <Route path="Login" element={<Login />} />
              <Route path="Signup" element={<Signup />} />
              <Route path="VerifyEmail" element={<VerifyEmail />} />
              <Route path="ResetPassword" element={<ResetPassword />} />
            </Route>
            <Route path="/Members" element={<Members />} />
            <Route path="/Usa" element={<Usa />} />
            <Route path="/Contacts" element={<Contacts />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/AddProfile" element={<AddProfile />} />
            <Route path="/UpdateProfile" element={<UpdateProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
