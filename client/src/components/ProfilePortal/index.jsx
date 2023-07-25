import React, { useState } from "react";
import { createPortal } from 'react-dom';
import ModalContent from '../ModalContent';
// import "./index.css";

const ProfilePortal = () => {
    const [showModal, setShowModal] = useState(false);

//   const onClose = () => {
//     console.log("props", props);
//   };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show modal using a portal
      </button>
      {showModal && createPortal(
        <ModalContent onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
};
export default ProfilePortal;
