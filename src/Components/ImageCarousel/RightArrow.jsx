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
          mt: "-335px",
          right: "30px",
        }}
      />
    </div>
  );
};

export default RightArrow;