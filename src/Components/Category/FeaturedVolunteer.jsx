import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import VolunteerCard from "./VolunteerCard"

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
  <Carousel style={{width:400}}
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
    renderArrowsWhenDisabled={true}
    renderDotsOutside={true}

    >
       <VolunteerCard />
       <VolunteerCard />
       <VolunteerCard />
       <VolunteerCard />
       <VolunteerCard />
       
    </Carousel>
  </div>
  )
}

export default FeaturedVolunteer
     
