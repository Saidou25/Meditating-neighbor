import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import Image from "../../../components/Image";
import Card from "../../../components/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardFooter from "../../../components/Card/CardFooter";
import CardBody from "../../../components/Card/CardBody";
import "./index.css";

export default function DistanceCard({
  children,
  distanceObj,
  distanceCardFunc,
}) {
  return (
    <div className="container-fluid neighbors bg-primary">
      {distanceObj?.title === "within" && distanceObj?.data.length ? (
        <h3 className="locations-list-title text-white">
          members Within a 50 miles radius
        </h3>
      ) : null}
      {distanceObj?.title === "over" && distanceObj?.data.length ? (
        <h3 className="locations-list-title text-white">
          members Over a 50 miles radius
        </h3>
      ) : null}
      <div className="row card-row">
        {distanceObj.data &&
          distanceObj.data.map((distanceObj) => (
            <div
              key={distanceObj.id}
              className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4"
            >
              <Card>
                <CardHeader>
                  <button
                    className="btn btn-profile "
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => {
                      distanceCardFunc(distanceObj);
                    }}
                  >
                    <FaEllipsisH className="icon" />
                  </button>
                </CardHeader>
                <CardBody>
                  <Image
                    src={distanceObj?.avatarUrl}
                    style={{
                      borderRadius: "50%",
                    }}
                    alt="default profile icon or user's profile picture"
                  />
                </CardBody>
                <CardFooter data={distanceObj.username} />
              </Card>
            </div>
          ))}
      </div>
      {children}
    </div>
  );
}
