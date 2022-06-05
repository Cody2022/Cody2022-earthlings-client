import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { images } from "../helpers/sliderImage";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";

const Carousel = () => {
  const img = images.length - 1;
  const [currImg, setCurrImg] = useState(0);
  //useEffect to change the image every 3 seconds
  useEffect(() => {
    const imgChange = setInterval(() => {
      currImg === img ? setCurrImg(0) : setCurrImg(currImg + 1);
    }, 3000);
    return () => clearInterval(imgChange);
  }, [currImg, img]);

  //Handle the click on the left arrow
  const handleLeftArrow = () => {
    currImg === 0 ? setCurrImg(img) : setCurrImg(currImg - 1);
  };

  //Handle the click on the right arrow
  const handleRightArrow = () => {
    currImg === img ? setCurrImg(0) : setCurrImg(currImg + 1);
  };

  return (
    <div>
      <Box
        component="img"
        sx={{
          height: 600,
          maxWidth: 1600,
          width: "100%",
        }}
        src={images[currImg].image}
        alt={images[currImg].description}
      ></Box>
      <div onClick={handleLeftArrow}>
        <LeftArrow />
      </div>
      <div onClick={handleRightArrow}>
        <RightArrow />
      </div>
    </div>
  );
};

export default Carousel;
