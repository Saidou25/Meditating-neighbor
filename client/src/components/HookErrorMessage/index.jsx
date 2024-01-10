import React from "react";

const HookErrorMessage = ({ hookErrorMessage }) => {

    return (
        <div className="error-messages bg-danger  mt-5">
        <p
          className="text-light py-2"
          style={{ textAlign: "center" }}
        >
          {hookErrorMessage}
        </p>
      </div>
    );
};
export default HookErrorMessage;