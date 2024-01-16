import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_AVATAR, DELETE_AVATAR } from "../../../../../utils/mutations";
import { QUERY_ME } from "../../../../../utils/queries";
import { storage } from "../../../../../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { useUser } from "../../../../../contexts/userContext";
import Image from "../../../../../components/Image";
import trash from "../../../../../assets/images/trash.jpg";
import Button from "../../../../../components/Button";
import HookErrorMessage from "../../../../../components/HookErrorMessage";
import ButtonSpinner from "../../../../../components/ButtonSpinner";
import profileIcon from "../../../../../assets/images/profileicon.png";
import "./index.css";

const Avatar = () => {
  const [image, setImage] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [addPicture, setShowAddPicture] = useState(true);
  const [savedUrl, setSavedUrl] = useState(null);
  const [avatarId, setAvatarId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hookErrorMessage, setHookErrorMessage] = useState("");

  const { me } = useUser();

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
      } catch (error) {
        setHookErrorMessage(error.message);
        setLoading(false);
      }
      console.log("Avatar successfully deleted from the cache");
      setLoading(false);
    },
  });

  // adding profile picture url to MongoDb database using grapgql "addAvatar mutation"
  const add = async (url) => {
    if (url?.length) {
      try {
        const { data } = await addAvatar({
          variables: {
            avatarUrl: url,
            username: me?.username,
          },
        });
        if (data) {
          setLoading(false);
          setShowCancel(false);
          setShowEdit(true);
        }
      } catch (error) {
        setHookErrorMessage(error.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
    setImage(null);
  };
  //  encode and upload profile picture to Firebase datastorage
  const uploadImage = () => {
    // setLoading(true);
    if (!image) {
      setHookErrorMessage("no image selected");
      setLoading(false);
      return;
    }
    if (savedUrl) {
      removeAvatar(savedUrl);
    }
    setHookErrorMessage("");

    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            // Calling add profile here with url handy.
            add(url);
          })
          .catch((error) => {
            setHookErrorMessage(error.message, "error getting the image url");
            setLoading(false);
          });
      })
      .catch((error) => {
        setHookErrorMessage(error.message);
        setLoading(false);
      });
  };
  // geting necessary variables used to delete profile picture from firebase database abd delete picture using firebase indications
  const storageRef = ref(storage, savedUrl);
  const toDelete = storageRef.fullPath;
  const imageRef = ref(storage, `${toDelete}`);

  const deleteObjAvatar = () => {
    setLoading(true);
    deleteObject(imageRef)
      .then(() => {
        console.log(`${imageRef} deleted`);
      })
      .catch((error) => {
        setHookErrorMessage(error.message);
        setLoading(false);
      });
    setLoading(false);
    setShowEdit(false);
    setShowCancel(false);
    setShowAddPicture(true);
    setSavedUrl(null);
    setHookErrorMessage("");
  };
  // remove profile picture from Mongodb database using graphql deleteAvatar mutation
  const removeAvatar = async () => {
    setLoading(true);
    try {
      const { data } = await deleteAvatar({
        variables: {
          id: avatarId,
        },
      });
      if (data) {
        setSavedUrl(null);
      }
    } catch (error) {
      setHookErrorMessage(error.message);
      setLoading(false);
    }
    deleteObjAvatar();
    setLoading(false);
  };

  const handleSubmit = (e) => {
    
    if (e === "cancel") {
      if (!showEdit) {
        setShowAddPicture(true);
        setShowCancel(false);
        setShowEdit(false);
        setLoading(false);
      }
      if (showCancel && !addPicture) {
        setShowAddPicture(false);
        setShowCancel(false);
        setShowEdit(true);
        setImage(null);
      }
    }
    if (e === "add picture") {
      setShowAddPicture(false);
      setShowCancel(true);
      setShowEdit(false);
    }
    if (e === "save") {
      setLoading(true);
      uploadImage();
    }
    if (e === "edit") {
      setShowAddPicture(false);
      setShowCancel(true);
      setShowEdit(false);
    }
  };

  // making sure profile picture url and id are available upon page load
  useEffect(() => {
    if (me.avatar?.avatarUrl) {
      setSavedUrl(me.avatar.avatarUrl);
      setAvatarId(me.avatar._id);
      setShowAddPicture(false);
      setShowEdit(true);
    }
  }, [me]);

  return (
    <>
      <div className="pic my-5">
        <Image
          src={savedUrl ? savedUrl : profileIcon}
          description={profileIcon ? "profile icon" : "profile picture"}
          style={{
            width: "100%",
            maxWidth: "250px",
            maxHeight: "250px",
            borderRadius: "50%",
          }}
        />
        {showEdit && savedUrl && (
          <img
            className="trash img-fluid"
            src={trash}
            alt="trash icon"
            style={{
              marginLeft: "-24%",
              position: "relative",
              floating: "right",
              borderRadius: "50%",
              maxHeight: "43px",
              // padding: "7px"
            }}
            onClick={() => {
              removeAvatar(avatarId);
            }}
          />
        )}
      </div>
      {hookErrorMessage && (
        <HookErrorMessage hookErrorMessage={hookErrorMessage} />
      )}
      <div className="row g-0">
        <div className="col-4 choose-file ">
          <Button
            className="btn my-button bg-primary rounded-0"
            onClick={(e) => handleSubmit(e.target.textContent)}
          >
            {addPicture && !showEdit && !showCancel && <>add picture</>}
            {showEdit && !addPicture && !showCancel && <>edit</>}
            {showCancel && !addPicture && !showEdit && <>cancel</>}
          </Button>
        </div>
        {showCancel && (
          <>
            <div className="col-4 bg-primary g-0 p-0">
              <label htmlFor="file-button" className="file-label">
                {image ? <>image selected</> : <>select file</>}
                <input
                  type="file"
                  id="file-button"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>
            <div className="col-4 choose-file ">
              <Button
                className="btn my-button bg-primary rounded-0"
                type="button"
                onClick={(e) => handleSubmit(e.target.textContent)}
              >
                {loading === true ? <ButtonSpinner /> : <>save</>}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Avatar;
