import React, { useState } from "react";
import UploadImage from "../sharedComponents/UploadImage";

const PickImage = ({ startGame }) => {
    const [imageSrc, setImageSrc] = useState(null);

    return (
        <>
            <UploadImage
                imageSrc={imageSrc}
                setImageSrc={setImageSrc}
            ></UploadImage>
            {imageSrc && (
                <button
                    onClick={() => {
                        startGame(imageSrc);
                    }}
                    className="w-[400px] h-[80px] bg-[#4E8098] font-bold rounded text-5xl transition-all hover:scale-[1.02] text-[#FCF7F8] hover:cursor-pointer"
                >
                    START GAME
                </button>
            )}
        </>
    );
};

export default PickImage;
