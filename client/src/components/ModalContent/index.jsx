import React from "react";

const ModalContent = ({ onClose }) => {

    return (
        <div className="modal">
          <div>I'm a modal dialog</div>
          <button onClick={onClose}>Close</button>
        </div>
      );
};
export default ModalContent;