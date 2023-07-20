import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROFILE, DELETE_PROFILE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { storage } from "../../firebase";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const ProfPics = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  // const [stor, setImageRef] = useState(null);

  const { data } = useQuery(QUERY_ME);
  const me = data?.me || [];
  const savedUrl = me.profile?.avatarUrl;
  const profileId = me.profile?._id;
  console.log(profileId);

  const [addProfile] = useMutation(ADD_PROFILE);
  const [deleteProfile] = useMutation(DELETE_PROFILE);

  const add = async (url) => {
    if (url?.length) {
      setUrl(url);

      try {
        const { data } = await addProfile({
          variables: {
            avatarUrl: url,
            username: me.username,
          },
        });
        if (data) {
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

  const deleteAvatar = () => {
    // setImageRef(imageRef);

    deleteObject(imageRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const removeProfile = async () => {
    try {
      const { data } = await deleteProfile({
        variables: { id: profileId },
      });
      if (data) { console.log("removed profile")};
    } catch (error) {
      console.log(error);
    }
    deleteAvatar();
  };

  return (
    <div className="container-avatar">
      {!url && savedUrl && (
        <img
          className="container-pic mb-5"
          src={savedUrl}
          alt="profile icon"
          style={{ width: 200, height: 200 }}
        />
      )}
      {!url && !savedUrl && (
        <img
          className="container-pic mb-5"
          src={profileIcon}
          alt="profile icon"
          style={{ width: 200, height: 200 }}
        />
      )}
      {url && (
        <img
          className="container-pic mb-5"
          src={url}
          alt="profile icon"
          style={{ width: 200, height: 200 }}
        />
      )}
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="btn" onClick={uploadImage}>
        submit
      </button>
      <button type="btn" onClick={removeProfile}>
        delete
      </button>
    </div>
  );
};
export default ProfPics;
