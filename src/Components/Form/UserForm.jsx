import React, { useEffect, useState } from "react";
import {
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import {useNavigate} from "react-router-dom"

const provinces = [
  { label: "Alberta"},
  { label: "British Columbia" },
  { label: "Manitoba" },
  { label: "New Brunswick" },
  { label: "Newfoundland and Labrador" },
  { label: "Northwest Territories" },
  { label: "Nova Scotia" },
  { label: "Nunavut" },
  { label: "Ontario" },
  { label: "Prince Edward Island" },
  { label: "Quebec" },
  { label: "Saskatchewan" },
  { label: "Yukon" },
];

const UserForm = (props) => {
  const email=props.email;
  const setLabel=props.setLabel;
  const navigate=useNavigate();

  const defaultUserInfo = {
    firstName: "",
    lastName: "",
    age: 1,
    gender:"",
    isNewcomer:false,
    isVolunteer:false,
    languages: [],
    educationLevel: "",
    address: "",
    city: "",
    province: "",
  };

  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isShowMessage, setIsShowMessage]=useState(false);

  useEffect(() => {
    const fetchUserRoles = async (email) => {
      let response = await fetch(`/get/${email}`);
      let userInfo = await response.json();
      if (userInfo.firstName && userInfo.lastName){setUserInfo(userInfo)}
    };
    fetchUserRoles(email);
  }, []);

  const getLanguages = (e) => {
    const {value, checked}=e.target;
    const {languages}=userInfo;
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({...userInfo,
        languages: [...languages, value],
      });
    }
     // Case 2  : The user unchecks the box
      else {
        setUserInfo({...userInfo,
          languages: languages.filter((e) => e !== value),
        });
      }
  };

  const getRole = (e) => {
    const { name } = e.target;
    if (name === "isNewcomer") {
      setUserInfo({ ...userInfo, isNewcomer: true, isVolunteer: false });
    } else {
      setUserInfo({ ...userInfo, isNewcomer: false, isVolunteer: true });
    }
  };

   const updateUserInfo = async (updatedInfo) => {
     const response = await fetch(`/update/`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(updatedInfo),
     });
     return response.json();
   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUserInfo=await updateUserInfo({...userInfo, email});
    if (newUserInfo){
      if (userInfo.isNewcomer){navigate("/newcomer")}
      else if (userInfo.isVolunteer){navigate("/volunteer")}
      else if (!newUserInfo.isNewcomer && !newUserInfo.isVolunteer) {setIsShowMessage(true)}
    }
  };

  return (
    <Container >
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
          <TextField
            required
            id="name-input"
            name="firstName"
            label="First Name"
            type="text"
            value={userInfo.firstName}
            sx={{ py: 1, px: 1 }}
            onChange={(e) => {
              const value = e.target.value;
              setUserInfo({
                ...userInfo,
                firstName: value,
              });
              setLabel(value)
            }}
          />
          <TextField
            required
            id="name-input"
            name="lastName"
            label="Last Name"
            type="text"
            value={userInfo.lastName}
            sx={{ py: 1, px: 1 }}
            onChange={(e) => {
              const value = e.target.value;
              setUserInfo({
                ...userInfo,
                lastName: value,
              });
            }}
          />

          <TextField
            id="age-input"
            name="age"
            label="Age"
            type="number"
            // value={userInfo.age}
            InputProps={{ inputProps: { min: 1 } }}
            sx={{ py: 1, px: 1 }}
            onChange={(e) => {
              const value = e.target.value;
              setUserInfo({
                ...userInfo,
                age: value,
              });
            }}
          />
        </Grid>

        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl>
            <FormLabel sx={{ fontWeight: "bold", color: "black" }}>
              Gender
            </FormLabel>
            <RadioGroup
              name="gender"
               onChange={(e) => {
                const value = e.target.value;
                setUserInfo({
                  ...userInfo,
                  gender: value,
                });
              }}
              row
            >
              <FormControlLabel
                key="male"
                name="male"
                value="male"
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                key="female"
                name="female"
                value="female"
                control={<Radio size="small" />}
                label="Female"
              />
              <FormControlLabel
                key="other"
                name="other"
                value="other"
                control={<Radio size="small" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid>
          <FormGroup row sx={{ py: 2 }}>
            <FormLabel
              sx={{ py: 2, px: 2, fontWeight: "bold", color: "black" }}
              id="demo-row-radio-buttons-group-label"
            >
              Language
            </FormLabel>

            <FormControlLabel
              control={<Checkbox />}
              name="languages"
              label="English"
              value="English"
              onChange={getLanguages}
            />
            <FormControlLabel control={<Checkbox />} name="languages" value="French" label="French" onChange={getLanguages}/>
            <FormControlLabel control={<Checkbox />} name="languages" value="Ukrainian" label="Ukrainian" onChange={getLanguages} />
            <FormControlLabel control={<Checkbox />} name="languages" value="Mandarin" label="Mandarin" onChange={getLanguages}/>
            <FormControlLabel control={<Checkbox />} name="languages" value="Somali" label="Somali" onChange={getLanguages}/>
          </FormGroup>
        </Grid>

        <Grid>
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              Education Level
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => {
                const value = e.target.value;
                setUserInfo({
                  ...userInfo,
                  educationLevel: value,
                });
              }}
            >
              <FormControlLabel value="phD" control={<Radio />} label="Ph.D." />
              <FormControlLabel
                value="master"
                control={<Radio />}
                label="Master"
              />
              <FormControlLabel
                value="bachelor"
                control={<Radio />}
                label="Bachelor"
              />
              <FormControlLabel
                value="college"
                control={<Radio />}
                label="College"
              />
              <FormControlLabel
                value="highschool"
                control={<Radio />}
                label="High School"
              />
              <FormControlLabel
                value="others"
                control={<Radio />}
                label="Others"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid container sx={{ justifyContent: "center", py: 2 }}>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ fontWeight: "bold", color: "black" }}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            Mailling Address
          </FormLabel>

          <TextField
            id="address-input"
            label="Address"
            value={userInfo.address}
            size="small"
            sx={{ mx: 1 }}
            onChange={(e) => {
              const value = e.target.value;
              setUserInfo({
                ...userInfo,
                address: value,
              });
            }}
          />
          <TextField
            id="city-input"
            name="city"
            label="City"
            type="text"
            value={userInfo.city}
            size="small"
            onChange={(e) => {
              const value = e.target.value;
              setUserInfo({
                ...userInfo,
                city: value,
              });
            }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={provinces}
            size="small"
            sx={{ px: 2, width: 200 }}
            onChange={(event, value) => 
              {setUserInfo({...userInfo, province:value.label})
            }}
            renderInput={(params) => (
              <TextField {...params} label="Province/Territory"
               />
            )}
          />
        </Grid>

        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl>
            <FormLabel sx={{ fontWeight: "bold", color: "black" }}>
             Select Your Role*
            </FormLabel>
            <RadioGroup
              row
              name="role"
              onChange={getRole}
            >
              <FormControlLabel
                key="newcomer"
                name="isNewcomer"
                value="newcomer"
                control={<Radio size="small" />}
                label="Newcomer"
              />
              <FormControlLabel
                key="volunteer"
                name="isVolunteer"
                value="volunteer"
                control={<Radio size="small" />}
                label="Volunteer" 
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {isShowMessage && <Alert severity="warning" style={{color:"purple", fontWeight:"bold"}}> Select your role please!</Alert>}

        <Button
          sx={{ my: 2 }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Save Changes
        </Button>      
      </Grid>
    </Container>
  );
};
export default UserForm;