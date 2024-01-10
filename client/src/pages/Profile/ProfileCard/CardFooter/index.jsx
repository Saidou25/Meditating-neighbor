import React, { useContext } from "react";
import { UserContext } from "../../../../utils/userContext";
import { Link } from "react-router-dom";

const CardFooter = () => {
const me = useContext(UserContext);

    return (
        <>
          <div className="card-footer profile-footer">
              <div className="row">
                <div className="col-12 edit-column">
                  {me.profile ? (
                    <Link
                      className="btn btn-edit bg-primary rounded-0 text-light"
                      style={{ transition: "0.7s" }}
                      to="/UpdateProfile"
                      state={{ me: me, myProfile: me.profile }}
                    >
                      update
                    </Link>
                  ) : (
                    <Link
                      className="btn btn-edit bg-primary rounded-0 text-light"
                      style={{ transition: "0.7s" }}
                      to="/AddProfile"
                      state={{ me: me, myProfile: me.profile }}
                    >
                      add profile
                    </Link>
                  )}
                </div>
              </div>
            </div></>
    )
};
export default CardFooter;