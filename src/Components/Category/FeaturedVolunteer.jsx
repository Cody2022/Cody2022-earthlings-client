import React from 'react'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import VolunteerCard1 from "./VolunteerCard1"
import VolunteerCard2 from "./VolunteerCard2"
import VolunteerCard3 from "./VolunteerCard3"
import VolunteerCard4 from "./VolunteerCard4"
import VolunteerCard5 from "./VolunteerCard5"


const responsive = {
            desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 3,
            slidesToSlide: 2,
            partialVisibilityGutter: 40
            },
            mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 2,
            slidesToSlide: 2,
            partialVisibilityGutter: 30
            },
            tablet: {
            breakpoint: {
                max: 1024,
                min: 200
            },
            items: 1,
            slidesToSlide: 1,
            partialVisibilityGutter: 30
            }
     };
      

const FeaturedVolunteer = () => {

  return (
    <div
      style={{
        paddingBottom: '30px',
        position: 'relative'
  }}
>
  <Carousel 
    arrows
    autoPlay
    autoPlaySpeed={3000}
    showDots
    draggable
    ssr
    slidesToSlide={1}
    containerClass="container-with-dots"
    responsive={responsive}
    partialVisible
    infinite
    pauseOnHover
    renderArrowsWhenDisabled={false}
    renderButtonGroupOutside={false}
    renderDotsOutside={true}
    itemClass="carousel-item-padding-40-px"
   
    >
       <VolunteerCard1 />
       <VolunteerCard2 />
       <VolunteerCard3 />
       <VolunteerCard4 />
       <VolunteerCard5 />
       
    </Carousel>
  </div>
  )
}

export default FeaturedVolunteer
     
