import { useState, useEffect } from "react";

const useBlurUp = (sourcesArray) => {

    const [src, setSrc] = useState(sourcesArray[0]);

    useEffect(() => {
        setSrc(sourcesArray[0]);

        for (let i = 0; i < sourcesArray.length; i++) {
            const mul = i

            const image = new Image();
            image.src = sourcesArray[i];

            image.onload = async () => {
                await new Promise(r => setTimeout(r, mul * 10));
                setSrc(sourcesArray[i])
            }
        }
    }, sourcesArray) // eslint-disable-line

    return [src]
};

export default useBlurUp;