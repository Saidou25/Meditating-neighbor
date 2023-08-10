import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_REQUESTS, QUERY_ME } from "../../utils/queries";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

const Notifications = () => {
  const { data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || [];

  const { data } = useQuery(QUERY_REQUESTS);
  const requests = data?.requests || [];
  const userRequests = requests.filter(
    (request) => request.destinationName === me.username
  );
  
  return (
    <>
      <Navbar />
      <div className="container-fluid notification bg-primary text-light">
        {userRequests &&
          userRequests.map((userRequest) => (
            <div key={userRequest._id} className="requests-list"> 
              <p>
                {userRequest.myName} is requesting your contact information. Send an email to{" "}
                {userRequest?.email} if you would like to connect and take it to your favorite chat app.
              </p>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
};
export default Notifications;
