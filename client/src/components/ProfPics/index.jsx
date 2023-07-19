import React, { useState } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ProfPics = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  console.log("url", url);
  const uploadImage = () => {
    if (image === null) {
      return;
    }
    const imageRef = ref(storage, "images/");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
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

  return (
    <div className="pics">
      <img src={url} alt="profile icon" style={{ width: 200, height: 200 }} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="btn" onClick={uploadImage}>
        submit
      </button>
    </div>
  );
};
export default ProfPics;
