import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccomData from "./Form/AccomData";
import Loading from "./Loading/Loading";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";

const VolunteerListing = (props) => {
  const { user, isLoading } = useAuth0();
  const email = user?.email;
  console.log("user is", email);
  let accomListRender=props.accomListRender;
  const [volunteerList, setVolunteerList] = useState();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const getVolunteerList = async () => {
      try {
        let response = await fetch(`/accommodation/get/${email}`);
        let volunteerLists = await response.json();
        console.log("volunteerList is", volunteerLists);
        return setVolunteerList(volunteerLists);
      } catch (ex) {
        console.log(ex);
      }
    };
    getVolunteerList();
  }, [email, accomListRender]);

  const handleDelete = async (id) => {
    console.log(`user id is: ${id}`);
    let response = await fetch(`/accommodation/delete/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      setVolunteerList((curr) => {
        return curr.filter((item) => item._id !== id);
      });
    } else {
      alert("error deleting Listing");
    }
  };

  return (
    <Grid container>
      {volunteerList ? (
        volunteerList.map((accomInfo, index) => {
          return (
            <Grid xs={12} sm={6} md={3} item>
              <AccomData accomInfo={accomInfo} />
              <Button
                onClick={() => handleDelete(accomInfo._id)}
                sx={{ my: 1 }}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Grid>
          );
        })
      ) : (
        <Typography component="div" variant="h3">
          Loading...
        </Typography>
      )}
    </Grid>
  );
};

export default withAuthenticationRequired(VolunteerListing, {
  onRedirecting: () => <Loading />,
});
