import { Container, Divider, Grid } from '@mui/material'
import React from 'react';
import TransportCard from './TransportCard';
import TranslationCard from './TranslationCard';
import AccommodationCard from "./AccommodationCard";
import EducationCard from "./EducationCard";
import FeaturedVolunteer from './FeaturedVolunteer';
import  BrowseCategories from './BrowseCategories';


export const Categories = () => {
  return (
    <Container>
      <BrowseCategories />
      <Divider>CENTER</Divider>
      <Grid container spacing={2} display="flex" justifyContent="center" >
        <Grid item display="flex" justifyContent="center" xs={12} sm={6} md={3}>
          <TransportCard />
        </Grid>

        <Grid item display="flex" justifyContent="center" xs={12} sm={6} md={2.9} >
          <TranslationCard />
        </Grid>

        <Grid item display="flex" justifyContent="center" xs={12} sm={6} md={3.2}>
          <AccommodationCard />
        </Grid>

        <Grid item display="flex" justifyContent="center" xs={12} sm={6} md={2.9}>
          <EducationCard />
        </Grid>
      </Grid>
      <br/>
      <Container style={{display:"flex", justifyContent:"center", marginTop: 15, marginBottom: 20, fontWeight:"bold", fontSize: '1.5rem' }}>Featured Volunteers</Container>
      <FeaturedVolunteer />
    
      <Container style={{display:"flex", justifyContent:"center", paddingTop: 50, paddingBottom: 40, fontWeight:"bold", fontSize: '1.5rem' }}>Placeholder</Container>
    </Container>
  )
}
