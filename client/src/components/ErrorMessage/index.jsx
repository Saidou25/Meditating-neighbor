import React from "react";

const ErrorMessage = ({ dynamicError }) => {

    return (
        <p className="text-danger mt-4">{dynamicError.message}</p>
    );
};
export default ErrorMessage;