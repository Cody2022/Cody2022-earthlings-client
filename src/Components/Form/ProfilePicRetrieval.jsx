import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";

const ProfilePicRetrieval = () => {
  const { user } = useAuth0();
  console.log(`User is:`, user.email);
  const [image, setImage] = useState("");
  
  console.log(`Image is:`, image);


  useEffect(() => {
    const getImage = async () => {
      let response = await fetch(`/image/${user.email}`);
      let data = await response.json();
      console.log(`Data is:`, data);
      setImage(data);
    };
    getImage();
  }, [user.email]);

  return (
    <div>
      <Avatar
        alt="User"
        src={image.profilePic}
        sx={{ width: 60, height: 60 }}
      />
    </div>
  );
};

export default ProfilePicRetrieval;
