import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const UploadImage = ({ imageSrc, setImageSrc }) => {
    // -----------------------------
    // Handle When an Image is Uploaded
    // -----------------------------
    function handleImageUpload(event) {
        const image = event.target.files[0];

        // Error Check
        if (!(image && image.type.startsWith("image/"))) {
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            // Make sure you set the image to the result of the reader, we need the base64 value of it
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(image);
    }

    // -----------------------------
    // Handle Paste
    // -----------------------------
    const handlePaste = (e) => {
        const items = e.clipboardData.items;
        for (let item of items) {
            if (item.type.includes("image")) {
                const file = item.getAsFile();
                const reader = new FileReader();
                reader.onload = (event) => setImageSrc(event.target.result);
                reader.readAsDataURL(file);
                break;
            }
        }
    };

    // -----------------------------
    // Listen for Paste Event
    // -----------------------------
    useEffect(() => {
        window.addEventListener("paste", handlePaste);
        return () => window.removeEventListener("paste", handlePaste);
    }, []);

    return (
        <>
            <div
                className={`flex items-center justify-center 
					${
                        imageSrc
                            ? "max-w-3/4 md:w-auto h-1/2 max-h-1/2 border-8 border-white"
                            : "w-3/4 md:w-1/2 h-1/2 rounded-lg border-dashed"
                    }   bg-[#4E8098]/50 text-[#27404C] border-[#27404C] border-2 shadow-md/60`}
            >
                <label
                    htmlFor="dropzone-file"
                    className="h-full w-full flex flex-col items-center justify-center cursor-pointer"
                >
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt="Uploaded image"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FontAwesomeIcon
                                icon={faCamera}
                                className="text-3xl mb-4"
                            />
                            <p className="mb-2">
                                <span className="font-semibold">
                                    Click to upload picture
                                </span>
                            </p>
                            <p className="">SVG, PNG, JPG or GIF</p>
                        </div>
                    )}
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageUpload}
                    />
                </label>
            </div>
        </>
    );
};

export default UploadImage;
