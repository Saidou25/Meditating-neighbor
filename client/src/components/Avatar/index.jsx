import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_AVATAR, DELETE_AVATAR } from "../../utils/mutations";
import { QUERY_ME, QUERY_AVATARS } from "../../utils/queries";
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
  const username = me?.username;
  const { data } = useQuery(QUERY_ME);

  const { data: avatarData } = useQuery(QUERY_AVATARS);
  const [addAvatar, { addError }] = useMutation(ADD_AVATAR);
  const [deleteAvatar, { deleteError }] = useMutation(DELETE_AVATAR);

  // const [addAvatar, { addError }] = useMutation(ADD_AVATAR, {
  //   update(cache, { data: { addAvatar } }) {
  //     try {
  //       const { avatars } = cache.readQuery({ query: QUERY_AVATARS });
  //       console.log("avatars from 41", avatars);
  //       cache.writeQuery({
  //         query: QUERY_AVATARS,
  //         data: {
  //           data: { avatars: [addAvatar, ...avatars] },
  //         },
  //       });
  //       console.log("success from 48");
  //     } catch (e) {
  //       console.error(e);
  //     }
  //     const { me } = cache.readQuery({ query: QUERY_ME });
  //     cache.writeQuery({
  //       query: QUERY_ME,
  //       data: {
  //         me: { ...me, avatar: { ...me.avatar, addAvatar } },
  //       },
  //     });
  //   },
  // });
  // const [deleteAvatar, { deletError }] = useMutation(DELETE_AVATAR, {
  //   update(cache, { data: { deleteAvatar } }) {
  //     try {
  //       const { avatars } = cache.readQuery({ query: QUERY_AVATARS });
  //       console.log("avatarUrls from 65", avatars)
  //       cache.writeQuery({
  //         query: QUERY_AVATARS,
  //         data: {
  //           avatarUrls: [
  //             avatars.filter((avatar) => avatar._id !== deleteAvatar._id),
  //           ],
  //         },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // });

  const add = async (url) => {
    if (url?.length) {
      setUrl(url);

      try {
        const { data } = await addAvatar({
          variables: {
            avatarUrl: url,
            username: username,
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
  const storageRef = ref(storage, savedUrl);
  const toDelete = storageRef.fullPath;
  const imageRef = ref(storage, `${toDelete}`);

  
  const deleteObjAvatar = () => {
    // setImageRef(imageRef);
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
  // console.log('avatar id from 150',me?.avatar?.username, avatarId);

  const removeAvatar = async () => {
    
    console.log('avatar id from 152', avatarId);
    try {
      const { data } = await deleteAvatar({
        variables: { id: avatarId, username: username, avatarUrl: savedUrl },
      });
      if (data) {
        console.log(`removed avatar for ${me?.username} with the avatar id of ${avatarId}`);
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
    if (avatarData && data) {
      const meData = data?.me || [];
      const avatarUrl = meData.avatar?.avatarUrl;
      setSavedUrl(avatarUrl);
      setMe(meData);
      setAvatarId(meData.avatar?._id);
    }
  }, [data, avatarData]);
  
  return (
    <>
      <div className="container-avatar">
        {(addError || deleteError) && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
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
