import axios from "axios";
import React, { useRef, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Avatar, Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import ProfilePicRetrieval from "./ProfilePicRetrieval";

const ProfilePicUpload = () => {
    const inputRef = useRef();
  const [profilePicture, setProfilePicture] = useState({
    profilePic: "",
  });
    
    //When pressed on camera icon, file explorer pops up
    const triggerFileExplorer = () => inputRef.current.click();

  //use axios to create a profile picture
  const createImage = (image) => axios.post("/uploadpicture", image);

  const addImage = async (picture) => {
    try {
      await createImage(picture);
    } catch (err) {
      console.log(err.message);
    }
  };

  //On submit of picture
  const handleSubmit = (e) => {
      e.preventDefault();
    addImage(profilePicture);
  };

  //Reads binary data and encodes it as a base64 data URL
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //Convert to base64 by the convertToBase64 function
    const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProfilePicture({ ...profilePicture, profilePic: base64 });
    };

    console.log(`Profile picture is: ${profilePicture}`)
    
  return (
      <Box style={{ display: "flex", justifyContent: "center" }}>
          <ProfilePicRetrieval />
          <input type='file' label='Image' name='myFile' accept='.jpeg, .png, .jpg' ref={inputRef} onChange={(e) => handleFileUpload(e)} style={{display: 'none'}} />
          <IconButton onClick={() => {
              triggerFileExplorer();
          }}>
              <AddAPhotoIcon fontSize="small" />
      </IconButton>
              <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default ProfilePicUpload;
