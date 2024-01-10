import React from "react";
import Image from "../../../../components/Image";
import profileIcon from "../../../../assets/images/profileicon.png";
import ButtonSpinner from "../../../../components/ButtonSpinner";
import Button from "../../../../components/Button";
import "./index.css";

export default function NotificationsDisplay({
  data,
  type,
  acceptRequest,
  cancelRequest,
  loading,
}) {
  return (
    <>
      {data?.length ? (
        <>
          <h3 className="request-title text-light">
            {type === "requestingUser"
              ? "Your contact info is requested:"
              : "You requested contact info:"}
          </h3>
          {data &&
            data.map((user) => (
              <div key={user._id} className="row response-list g-0 text-light">
                <div className="col-2 response-image-container">
                  <div
                    className="container-fluid"
                    style={{ maxHeight: "85px", maxWidth: "85px" }}
                  >
                    <Image
                      className="request-avatar"
                      src={
                        user.avatar?.avatarUrl
                          ? user.avatar?.avatarUrl
                          : profileIcon
                      }
                      style={{ borderRadius: "50%" }}
                      alt="profile avatar"
                    />
                  </div>
                </div>
                <div className="col-6 d-flex align-items-center">
                  <p className="canshrink m-0 p-0">
                    {user?.username} is requesting your contact information.
                  </p>
                </div>
                {type === "requestingUser" ? (
                  <>
                    <div className="col-2 d-flex justify-content-end">
                      <Button
                        className="btn btn-accept"
                        onClick={() => {
                          acceptRequest({ ...user, type: "accept" });
                        }}
                      >
                        {loading.user?.username === user.username &&
                        loading.type === "accept" ? (
                          <ButtonSpinner />
                        ) : (
                          <>accept</>
                        )}
                      </Button>
                    </div>
                    <div className="col-2 d-flex justify-content-end">
                      <Button
                        className="btn btn-accept"
                        onClick={() => {
                          cancelRequest({ ...user, type: "decline" });
                        }}
                      >
                        {loading.user?.username === user.username &&
                        loading.type === "decline" ? (
                          <ButtonSpinner />
                        ) : (
                          <> decline</>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="col-4 d-flex justify-content-end">
                    <Button
                      className="btn btn-accept"
                      onClick={() => {
                        cancelRequest({ ...user, type: "cancelRequest" });
                      }}
                    >
                      {loading.user?.username === user.username &&
                      loading.type === "cancelRequest" ? (
                        <ButtonSpinner />
                      ) : (
                        <>cancel</>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            ))}
        </>
      ) : null}
    </>
  );
}
