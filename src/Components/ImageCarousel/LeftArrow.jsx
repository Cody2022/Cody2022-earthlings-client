import { ChevronLeft } from '@mui/icons-material';
import React from 'react'

const LeftArrow = () => {
  return (
    <div>
      <ChevronLeft
        fontSize="large"
        sx={{
          cursor: "pointer",
          position: "absolute",
          color: "white",
          mt: "-335px",
          ml: "30px",
        }}
      />
    </div>
  );
}

export default LeftArrow