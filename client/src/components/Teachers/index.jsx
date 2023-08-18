import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Teachers = () => {
  const { data, loading } = useQuery(QUERY_USERS);
  const users = data?.users || [];
  // console.log(users);
  let tmiTeacher = [];
  for (let user of users) {
    if (user.profile?.teacher) {
      console.log(user);
      tmiTeacher.push(user);
    }
  }
  console.log("tmiTeacher", tmiTeacher);
  return (
    <div className="teachers bg-primary pt-5">
      <h3 className="teachers-title text-light mb-5">Teachers in the US</h3>
      <div className="row">
        {tmiTeacher &&
          tmiTeacher.map((user) => (
            <div className="col-3" key={user._id}>
              <div className="card bg-dark text-light">
                <div className="row">
                  <div className="col-12">
                    <div className="card-header">
                      <h4>{user.username}</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4">
                          <img
                            className="teachers-avatar"
                            src={
                              user.avatar?.avatarUrl
                                ? user.avatar?.avatarUrl
                                : profileIcon
                            }
                            alt="profile avatar"
                          />
                        </div>
                        <div className="col-8">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Perferendis nobis voluptate voluptas quisquam
                            voluptates adipisci expedita iusto
                          </p>
                        </div>
                        <div className="col-12">
                          <p>Has been meditating for {user.profile.years} years</p>
                          <p>Currently at stage {user.profile.stage}</p>
                          <p>certified</p>
                          <p>in progress</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <p className="col-12">
                      {user.location.city}, {user.location.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Teachers;
