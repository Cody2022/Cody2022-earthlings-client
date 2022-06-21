import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import backgroundImage from "../../images/profile-background.jpg";
import userImage from "../../images/i-am-here-logo.png";
import { Box } from "@mui/system";
import { Avatar, Chip, Container, Divider } from "@mui/material";
import UserForm from "../Form/UserForm";


const Profile = () => {
  const { user, isLoading } = useAuth0();
  const [isNewcomer, setIsNewcomer] = useState();
  const [isVolunteer, setIsVolunteer] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [label, setLabel]=useState();

  let email = user.email;

  useEffect(() => {
    const fetchUserRoles = async (email) => {
      let response = await fetch(`/get/${email}`);
      let userInfo = await response.json();
      setIsAdmin(userInfo.isAdmin);
      setIsNewcomer(userInfo.isNewcomer);
      setIsVolunteer(userInfo.isVolunteer);
      if (userInfo.firstName){setLabel(userInfo.firstName)}
      else{setLabel(email)} 
    };
    fetchUserRoles(email);
  }, [email]);

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  return (
    <Box
      style={{
        backgroundImage: `url(${backgroundImage}`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Container style={{display: "flex", justifyContent: 'center'}}>
      <Avatar
        alt="User"
        src={userImage}
        sx={{width:0.2, height:0.2}}        
      />
      </Container>
      <Divider>
          <Chip sx={{weight:200, height:50, fontWeight:"bold"}} label={label} />
      </Divider>
       <br/>
      <UserForm email={email} setLabel={setLabel}/>

      <p>{JSON.stringify(user, null, 2)}</p>
          
    </Box>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
