import React from "react";

const Alert = ({ message }) => {
    if (!message) {
        return null;
    }
    return (
        <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
            role="alert"
        >
            <p className="font-semibold">{message}</p>
        </div>
    );
};

export default Alert;
