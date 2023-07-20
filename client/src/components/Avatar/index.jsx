import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { storage } from "../../firebase";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
  getMetadata
} from "firebase/storage";
import { v4 } from "uuid";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const ProfPics = () => {
  // const storage = getStorage();

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  // const [avatarName, setAvatarName] = useState("");
  const [stor, setImageRef] = useState(null);
  console.log("store", stor);
  console.log("url", url);

  const { data } = useQuery(QUERY_ME);
  const me = data?.me || [];
  const savedUrl = me.profile?.avatarUrl;
  // const savedAvatarName= me.profile?.avatarname;
  console.log("me", me);
  console.log("saved url", savedUrl);

  const [addProfile] = useMutation(ADD_PROFILE);

  const add = async (url) => {
    
    if (url?.length) {
      setUrl(url);
      console.log('set url', url)
   
      try {
        const { data } = await addProfile({
          variables: {
            avatarUrl: url,
            username: me.username,
            // avatarName: avatarName
          },
        });
        if (data) {
          console.log(`seccess adding ${me.username}`);
        }
      } catch (err) {
        console.log(err);
      }
    } 
    else {
      console.log("url not ready");
      console.log('url', url);
      console.log('username', me.username);
    }
  };

  const getData = (imageRef) => {
    // Get metadata properties
    getMetadata(imageRef)
      .then((metadata) => {
        // Metadata now contains the metadata for 'images/forest.jpg'
        // setAvatarName(metadata.name);
        console.log('metadata', metadata);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
      // add();
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
            getData(imageRef);
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
  const imageRef = ref(
    storage, savedUrl);
  
  const deleteAvatar = () => {
    setImageRef(imageRef);
    const toDelete = imageRef.name;
    console.log("to delete", toDelete);


    deleteObject(imageRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
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
      <button type="btn" onClick={deleteAvatar}>
        delete
      </button>
    </div>
  );
};
export default ProfPics;
