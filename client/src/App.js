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
import FormReuse from "./components/FormReuse";
import Contacts from "./pages/Contacts";
import Notifications from "./pages/Contacts/Notifications";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/LandingPage/Login";
import LandingFooter from "./pages/LandingPage/LandingFooter";
import Map from "./pages/Map";
import Usa from "./pages/Usa";
import Teachers from "./pages/Usa/Teachers";
import Profile from "./pages/Profile";
import Avatar from "./pages/Profile/Avatar";
import ProfileForm from "./pages/Profile/ProfileForm";
import ProfileFormReuse from "./components/ProfileFormReuse";
import UpdateMyProfileForm from "./pages/Profile/UpdateMyProfileForm";
import DeleteModal from "./pages/Profile/DeleteModal";
import TeacherMediaScreen from "./pages/Usa/Teachers/TeacherMediaScreen";
import Members from "./pages/Members";
import ProfileList from "./pages/Members/ProfileList";
import Success from "./components/Success";
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
            <Route path="/FormReuse" element={<FormReuse />} />
            <Route path="/Contacts" element={<Contacts />} />
            <Route path="/DeleteModal" element={<DeleteModal />} />
            <Route path="/Login" element={<Login />} />
            {/* <Route path="/Signup" element={<Signup />} /> */}
            <Route path="/LandingFooter" element={<LandingFooter />} />
            <Route path="/Map" element={<Map />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/Usa" element={<Usa />} />
            <Route path="/Avatar" element={<Avatar />} />
            <Route path="/ProfileForm" element={<ProfileForm />} />
            <Route path="/ProfileFormReuse" element={<ProfileFormReuse />} />
            <Route path="/ProfileList" element={<ProfileList />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/UpdateMyProfileForm" element={<UpdateMyProfileForm />} />
            <Route path="/Members" element={<Members />} />
            <Route path="/Success" element={<Success />} />
            <Route path="/Teachers" element={<Teachers />} />
            <Route path="/TeacherMediaScreen" element={<TeacherMediaScreen />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
