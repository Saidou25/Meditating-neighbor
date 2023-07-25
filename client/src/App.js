import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoginSignup from "./pages/LoginSignup";
import Map from "./components/Map";
import Usa from "./components/Usa";
import Avatar from "./components/Avatar";
import ProfileList from "./components/ProfileList";
import Profile from "./components/Profile";
import ProfileModal from "./components/ProfileModal";
import Neighbors from "./components/Neighbors";
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
          }
        }
      }
    }
  }
})
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Routes>
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/Footer" element={<Footer />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/LoginSignup" element={<LoginSignup />} />
            <Route path="/Map" element={<Map />} />
            <Route path="/Usa" element={<Usa />} />
            <Route path="/Avatar" element={<Avatar />} />
            <Route path="/ProfileList" element={<ProfileList />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/ProfileModal" element={<ProfileModal />} />
            <Route path="/Neighbors" element={<Neighbors />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
