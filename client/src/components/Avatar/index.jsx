import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_AVATAR, DELETE_AVATAR } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { storage } from "../../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import useMyInfo from "../../utils/UseMyInfo";
import trash from "../../assets/images/trash.jpg";
import ButtonSpinner from "../ButtonSpinner";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const ProfPics = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [savedUrl, setSavedUrl] = useState(null);
  const [avatarId, setAvatarId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // import me object hook from hooks so we don't need to do this operation again in this component
  const { me } = useMyInfo();

  // update the cache with newly uploaded profile picture
  const [addAvatar] = useMutation(ADD_AVATAR, {
    update(cache, { data: { addAvatar } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, avatar: { ...me.avatar, ...addAvatar } } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
  // update cache with newly deleted profile picture
  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    update(cache, { data: { deleteAvatar } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, avatar: null } },
        });
      } catch (e) {
        console.error(e);
      }
      console.log("Avatar successfully deleted from the cache");
    },
  });
  // adding profile picture url to MongoDb database using grapgql "addAvatar mutation"
  const add = async (url) => {
    if (url?.length) {
      setUrl(url);

      try {
        const { data } = await addAvatar({
          variables: {
            avatarUrl: url,
            username: me?.username,
          },
        });
        if (data) {
          setLoading(false);
          console.log(`success adding ${me?.username}`);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("url not ready");
    }
    setImage(null);
  };
  //  encode and upload profile picture to Firebase datastorage
  const uploadImage = () => {
    if (image === null) {
      setError("no image selected");
      return;
    }
    if (savedUrl) {
      removeAvatar(savedUrl);
    }
    setError("");
    setLoading(true);
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
        handleSubmit("add");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // geting necessary variables used to delete profile picture from firebase database abd delete picture using firebase indications
  const storageRef = ref(storage, savedUrl);
  const toDelete = storageRef.fullPath;
  const imageRef = ref(storage, `${toDelete}`);

  const deleteObjAvatar = () => {
    deleteObject(imageRef)
      .then(() => {
        console.log(`${imageRef} deleted`);
      })
      .catch((error) => {
        console.log(error);
      });
    setUrl(null);
    setSavedUrl(null);
  };
  // remove profile picture from Mongodb database using graphql deleteAvatar mutation
  const removeAvatar = async () => {
    try {
      const { data } = await deleteAvatar({
        variables: {
          id: avatarId,
        },
      });
      if (data) {
        console.log("removed avatar", data);
        setUrl(null);
        setSavedUrl(null);
      }
    } catch (error) {
      console.log(error);
    }
    deleteObjAvatar();
  };
  const handleSubmit = (e) => {
    if (e === "add") {
      setIsShown((current) => !current);
      setIsCanceled((current) => !current);
      setIsEdit((current) => !current);
    }
  };
  // making sure profile picture url and id are available upon page load
  useEffect(() => {
    if (me) {
      setSavedUrl(me.avatar?.avatarUrl);
      setAvatarId(me.avatar?._id);
    }
  }, [me]);

  return (
    <>
      <div className="container-fluid avatar">
        <div className="container pic mb-3">
          {!savedUrl && (
            <div
              className="bg-image-profile"
              alt="profile icon"
              style={{
                backgroundImage: `url(${profileIcon})`,
              }}
            ></div>
          )}
          {savedUrl && (
            <>
              <div
                className="bg-image-profile"
                alt="profile icon"
                style={{
                  backgroundImage: `url(${savedUrl})`,
                  backgroundRepeat: "no-repeat",
                }}
              >
                {savedUrl && isEdit === false && (
                  <div className="trash">
                    <img
                      className="trash-icon bg-light"
                      src={trash}
                      alt="trash icon"
                      height={53}
                      onClick={() => {
                        removeAvatar();
                      }}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        {error && (
          <div className="save-error bg-danger text-light">{error}</div>
        )}
        <div className="row g-0 container-avatar mt-5">
          {!savedUrl?.length && (
            <>
              <div className="col-4 choose-file">
                <button
                  className="btn btn-addaprofile bg-primary rounded-0 text-light"
                  type="submit"
                  onClick={() => {
                    handleSubmit("add");
                    setError("");
                    setImage(null);
                  }}
                >
                  {isCanceled === true ? <>cancel</> : <>add picture</>}
                </button>
              </div>
            </>
          )}
          {savedUrl?.length && (
            <>
              <div className="col-4 choose-file">
                <button
                  className="btn btn-uploadprofile bg-primary rounded-0 text-light"
                  type="submit"
                  onClick={() => {
                    handleSubmit("add");
                    setError("");
                    setImage(null);
                  }}
                >
                  {isEdit === true ? <>cancel</> : <>edit</>}
                </button>
              </div>
            </>
          )}
          {isShown ? (
            <>
              <div className="col-4 choose-file bg-primary">
                <label
                  htmlFor="file-button"
                  className="file-label"
                  style={{ cursor: "pointer" }}
                >
                  {image ? <>image selected</> : <>select file</>}
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
