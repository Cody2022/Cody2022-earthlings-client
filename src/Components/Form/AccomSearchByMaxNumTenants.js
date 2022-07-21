import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const AccomSearchByMaxNumTenants = (props) => {
  const setMaxNumTenantsFilter = props.setMaxNumTenantsFilter;
  const maxNumTenantsFilter = props.maxNumTenantsFilter;
    const [accomSearchInfo, setAccomSearchInfo] = useState(null);

  const handleSearchByMaxNumTenants = async (event) => {
    setMaxNumTenantsFilter(accomSearchInfo);
  };

  return (
    <Container>
      <Typography
        variant="h4"
        component="h4"
        color="blue"
        align="center"
      >
        Max Num of Tenants
      </Typography>
      <Box
        component="span"
        m={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          container
          alignItems="center"
          justify="center"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            required
            id="number-input"
            name="maxNumTenants"
            label="Max Number of Tenants"
            type="number"
            value={accomSearchInfo}
            sx={{ py: 2, px: 1 }}
            onChange={(e) => {
              let value = e.target.value;
              setAccomSearchInfo(value);
            }}
          />
        </Grid>
      </Box>
      <Grid container sx={{m:1, display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Button
            onClick={handleSearchByMaxNumTenants}
            sx={{ my: 0 }}
            type="submit"
            color="primary"
            variant="contained"
          >
            Search By Max Num Tenants
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};
export default AccomSearchByMaxNumTenants;
