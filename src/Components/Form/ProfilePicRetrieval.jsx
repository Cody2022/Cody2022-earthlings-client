import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'

const ProfilePicRetrieval = () => {
        const [image, setImage] = useState("");

        useEffect(() => {
          const getImage = async () => {
            let response = await fetch(`/62cf54ff4e31a2e434fd7f55`);
              let data = await response.json();
              console.log(`Data is: ${data}`)
            setImage(data);
          };
          getImage();
        }, []);

        console.log(image);

  return (
    <div>
      <Avatar
        alt="User"
        src={image.profilePic}
        sx={{ width: 60, height: 60 }}
      />
    </div>
  );
}

export default ProfilePicRetrieval