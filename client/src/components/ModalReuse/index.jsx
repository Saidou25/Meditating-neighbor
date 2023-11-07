import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEnvelope, FaIdBadge, FaHome } from "react-icons/fa";
import useMyContacts from "../../Hooks/UseMyContacts";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

// Building modal to show profiles, will be used in trhee diferent pages.
const ModalReuse = ({ hideModal, data }) => {
  const [showEmail, setShowEmail] = useState(false);
  const { myContactsProfiles } = useMyContacts();

  // monitoring data to setShowEmail only if the teacher is within my contacts.
  useEffect(() => {
    if (myContactsProfiles && data)
      for (let myContactsProfile of myContactsProfiles) {
        if (myContactsProfile.friend.username === data.userInfo.username) {
          setShowEmail(true);
        }
      }
  }, [myContactsProfiles, data]);

  return (
    <>
      <Modal
        show={hideModal}
        dialogClassName="modal-size modal-lg"
        onClick={() => hideModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {data.userInfo.profile?.firstname &&
            data.userInfo.profile?.lastname ? (
              <h3 className="modal-title text-black">
                {data.userInfo.profile?.firstname}{" "}
                {data.userInfo.profile?.lastname}
              </h3>
            ) : (
              <h3>{data.userInfo?.username}</h3>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="contact-body">
          <div className="contact-avatar m-4">
            <img
              className="modal-pic"
              src={
                data.userInfo?.avatar?.avatarUrl
                  ? data.userInfo?.avatar.avatarUrl
                  : profileIcon
              }
              alt="profile icon"
            />
          </div>
          <div className="row contact-profile-modal">
            <div className="col-12">
              {data.userInfo.profile?.story ? (
                <>
                  <h4 className="about-title mt-5 mb-4">About</h4>{" "}
                  <p className="p-story-profile-contact mt-5 mb-4">
                    {data.userInfo.profile.story}
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="col-12">
              <div className="p-info text-primary mb-4">
                <h4 className="info-teacher text-primary mt-5 mb-4">Info</h4>{" "}
                {/* {data.userInfo?.profile ? ( */}
                <div className="p-about mt-5 mb-4">
                  {data.userInfo?.profile.teacher ? (
                    <>
                      <p>
                        {data.userInfo.profile?.firstname}{" "}
                        {data.userInfo.profile?.lastname} is a certified
                        meditation teacher.
                      </p>{" "}
                      <br />
                      <p>
                        Has been meditating for {data.userInfo.profile.years}{" "}
                        years.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Has been meditating for {data.userInfo.profile.years}{" "}
                        years.
                      </p>
                      <br />
                      <p>
                        Is currently working on stage{" "}
                        {data.userInfo.profile.stage}
                      </p>
                    </>
                  )}
                </div>
                <div className="p-about mt-5 mb-4">
                  <p>
                    <FaIdBadge /> {data.userInfo?.username}
                  </p>
                  {showEmail && (
                    <p>
                      <FaEnvelope /> {data.userInfo?.email}
                    </p>
                  )}
                  <p>
                    <FaHome /> {data.userInfo.location?.city},{" "}
                    {data.userInfo.location?.state},{" "}
                    {data.userInfo.location?.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row contact-footer">
            <div className="col-8 friends-since m-0">
              {data.date ? (
                <p className="friends-since text-primary">
                  Friends since: {data.date}
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="col-4 contact-close">
              <Button
                className="modal-close"
                variant="secondary"
                onClick={() => hideModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalReuse;
