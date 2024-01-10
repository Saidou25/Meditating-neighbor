import React, { useState } from "react";
import profileIcon from "../../../assets/images/profileicon.png";
import { FaEllipsisH } from "react-icons/fa";
import Image from "../../../components/Image";
import Card from "../../../components/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardFooter from "../../../components/Card/CardFooter";
import CardBody from "../../../components/Card/CardBody";
import Button from "../../../components/Button";
import ModalReuse from "../../../components/ModalReuse";
import "./index.css";

const MyContacts = ({
  myContactsProfiles,
}) => {
  const [data, setData] = useState({ userInfo: "", date: "" });
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {myContactsProfiles?.length ? (
        <>
          <h3 className="contact-title text-light bg-primary m-0 p">
            Your contacts
          </h3>
          <div className="row bg-primary g-0">
            {myContactsProfiles &&
              myContactsProfiles.map((myContactProfile) => (
                <div
                  className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4"
                  key={myContactProfile.friend._id}
                >
                  <Card>
                    <CardHeader>
                      <Button
                        className="btn btn-profile "
                        onClick={() => {
                          setData({
                            userInfo: myContactProfile.friend,
                            date: myContactProfile.date,
                          });
                          setShowModal(true);
                        }}
                      >
                        <FaEllipsisH className="icon" />
                      </Button>
                    </CardHeader>
                    <CardBody>
                      <Image
                        src={
                          myContactProfile.friend.avatar?.avatarUrl
                            ? myContactProfile.friend.avatar.avatarUrl
                            : profileIcon
                        }
                        style={{
                          borderRadius: "50%",
                        }}
                        alt="default profile icon or user's profile picture"
                      />
                    </CardBody>
                    <CardFooter data={myContactProfile.friend.username} />
                  </Card>
                </div>
              ))}
          </div>
        </>
      ) : null}
      {showModal && <ModalReuse hideModal={setShowModal} data={data} />}
    </>
  );
};
export default MyContacts;
