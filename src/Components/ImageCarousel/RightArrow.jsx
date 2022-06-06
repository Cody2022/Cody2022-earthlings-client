import { ChevronRight } from "@mui/icons-material";
import React from "react";

const RightArrow = () => {
  return (
    <div>
      <ChevronRight
        fontSize="large"
        sx={{
          cursor: "pointer",
          position: "absolute",
          color: "white",
          mt: "-325px",
          ml: "1450px",
        }}
      />
    </div>
  );
};

export default RightArrow;
