import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_AVATAR, DELETE_AVATAR } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { storage } from "../../firebase";
import trash from "../../assets/images/trash.png";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
// import { FaEnvelope, FaPhone, FaIdBadge, FaHome, FaTrashAlt } from "react-icons/fa";
import ButtonSpinner from "../ButtonSpinner";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const ProfPics = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [edit, setEdit] = useState(false);
  const [savedUrl, setSavedUrl] = useState(null);
  const [avatarId, setAvatarId] = useState(null);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data } = useQuery(QUERY_ME);

  const [addAvatar] = useMutation(ADD_AVATAR);
  const [deleteAvatar] = useMutation(DELETE_AVATAR);

  const add = async (url) => {
    if (url?.length) {
      setUrl(url);

      try {
        const { data } = await addAvatar({
          variables: {
            avatarUrl: url,
            username: me.username,
          },
        });
        if (data) {
          setLoading(false);
          setCancel((current) => !current);


          console.log("setting loading to false");
          console.log(`seccess adding ${me.username}`);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("url not ready");
    }
  };

  const uploadImage = () => {
    if (image === null) {
      return;
    }
    setLoading(true);
    console.log("setting loading to true");
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            // Calling add profile here with url handy.
            add(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const imageRef = ref(storage, savedUrl);

  const deleteObjAvatar = () => {
    // setImageRef(imageRef);

    deleteObject(imageRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    setUrl(null);
    setSavedUrl(null);
  };
  const removeAvatar = async () => {
    try {
      const { data } = await deleteAvatar({
        variables: { id: avatarId },
      });
      if (data) {
        console.log("removed avatar");
      }
    } catch (error) {
      console.log(error);
    }
    deleteObjAvatar();
  };
  const handleSubmit = (e) => {
    if (e === "add") {
      setIsShown((current) => !current);
      setCancel((current) => !current);
      setEdit((current) => !current);
    }
  };

  useEffect(() => {
    if (data) {
      const meData = data?.me || [];
      const avatarUrl = meData.avatar?.avatarUrl;
      setSavedUrl(avatarUrl);
      setMe(meData);
      setAvatarId(meData.avatar?._id);
    }
  }, [data]);

  return (
    <>
      <div className="container-avatar">
        <div className="container-pic mb-3">
          {!url && savedUrl && (
            <div
              className="bg-image"
              alt="profile icon"
              style={{
                backgroundImage: `url(${savedUrl})`,
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="trash">
                <img
                  className="trash-icon bg-light"
                  src={trash}
                  alt="trash icon"
                  height={53}
                  onClick={removeAvatar}
                />
              </div>
            </div>
          )}
          {!url && !savedUrl && (
            <div
              className="bg-image"
              alt="profile icon"
              style={{
                backgroundImage: `url(${profileIcon})`,
              }}
            ></div>
          )}
          {url && (
            <div
              className="bg-image"
              alt="profile icon"
              style={{
                backgroundImage: `url(${url})`,
                backgroundRepeat: "no-repeat",
              }}
              
            >
              <div className="trash">
                <img
                  className="trash-icon bg-light"
                  src={trash}
                  alt="trash icon"
                  height={53}
                  onClick={removeAvatar}
                />
              </div>
            </div>
          )}
        </div>
        <div className="row g-0 container-avatar ">
          {!avatarId?.length ? (
            <>
              <div className="col-4 choose-file">
                <button
                  className="btn btn-addaprofile bg-primary rounded-0 text-light"
                  type="submit"
                  onClick={() => handleSubmit("add")}
                >
                  {cancel === true ? <>cancel</> : <>add picture</>}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="col-4 choose-file">
                <button
                  className="btn btn-uploadprofile bg-primary rounded-0 text-light"
                  type="submit"
                  onClick={() => handleSubmit("add")}
                >
                  {edit === true ? <>cancel</> : <>edit</>}
                </button>
              </div>
            </>
          )}
          {isShown ? (
            <>
              <div className="col-4 choose-file">
                <label htmlFor="file-button" className="file-label">
                  select file
                </label>
                <input
                  type="file"
                  id="file-button"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="col-4 choose-file ">
                <button
                  className="btn btn-uploadprofile bg-primary rounded-0 text-light"
                  type="submit"
                  onClick={uploadImage}
                >
                  {loading === true ? <ButtonSpinner /> : <>save</>}
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default ProfPics;
