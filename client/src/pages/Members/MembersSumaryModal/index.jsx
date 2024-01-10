import React from "react";
import Image from "../../../components/Image";
import profileIcon from "../../../assets/images/profileicon.png";
import HookErrorMessage from "../../../components/HookErrorMessage";
import ButtonSpinner from "../../../components/ButtonSpinner";

export default function MembersSumaryModal({
  user,
  friends,
  friendsSince,
  ongoingRequest,
  contact,
  modalClose,
  loading,
  errorMessage,
  resetModalData,
}) {
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              {user.profile?.firstname && user.profile?.lastname ? (
                <h3 className="modal-title fs-5" id="staticBackdropLabel">
                  {user.profile.firstname} {user.profile.lastname}
                </h3>
              ) : (
                <h3 className="modal-title fs-5" id="staticBackdropLabel">
                  {user.username}
                </h3>
              )}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  resetModalData();
                }}
              ></button>
            </div>
            <div className="modal-body list-body">
              <div className="row">
                <div className="col-6 pic-column">
                  <div className="container-fluid"
                  style={{ marginLeft: "10%", marginRight: "10%" }}>
                    <Image
                      src={
                        user.avatar?.avatarUrl
                          ? user.avatar?.avatarUrl
                          : profileIcon
                      }
                      style={{
                        borderRadius: "50%",
                      }}
                      alt="default profile icon or user's profile picture"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="location">
                    {user.profile?.teacher ? (
                      <>
                        <p>{user.profile.teacher}(TMI)</p>
                        <p>
                          Has been meditating for {user.profile.years} years
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
                    {user.location ? (
                      <p>
                        Lives in {user.location?.city}, {user.location?.state},{" "}
                        {user.location?.country}
                      </p>
                    ) : (
                      <></>
                    )}
                    {!user.location && !user.profile && (
                      <>{user.username} has no profile set yet</>
                    )}
                    {friends === true ? <p>email: {user.email}</p> : <></>}
                  </div>
                </div>
              </div>
              {errorMessage ? (
                <HookErrorMessage hookErrorMessage={errorMessage} />
              ) : null}
            </div>

            {friendsSince && friends === true ? (
              <div className="profile-friends p-3">
                {" "}
                <p className="friends-profile m-0">
                  Friends since: {friendsSince}{" "}
                </p>
              </div>
            ) : (
              <></>
            )}
            <div className="modal-footer">
              <div className="row row-modal-footer">
                <div className="col-6 col-close-button">
                  <button
                    type="button"
                    className="btn btn-secondary close-btn"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      resetModalData();
                    }}
                  >
                    Close
                  </button>
                </div>
                {friends === false && ongoingRequest === true && (
                  <button type="button" className="col-6 btn btn-primary">
                    pending
                  </button>
                )}
                {friends === true && (
                  <button type="button" className="col-6 btn btn-primary">
                    friend
                  </button>
                )}
                {friends === false && ongoingRequest === false && (
                  <button
                    type="button"
                    className="col-6 btn btn-primary friendship-request"
                    onClick={contact}
                    data-bs-dismiss={modalClose}
                  >
                    {loading ? <ButtonSpinner /> : <>request friendship</>}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
