//importing the necessary packages
import { Typography,Container,Box } from '@mui/material'
import React from 'react'
import VisionSection from '../Components/VisionSection';
import WhoWeAreSection from '../Components/WhoWeAreSection';
import OurServicesSection from '../Components/OurServicesSection';
import LocationSection from '../Components/LocationSection';
import BookWithEase from '../Components/BookWithEase';
import DoctorPanel from '../Components/DoctorPanel';
import WhyChooseUs from '../Components/WhyChooseUs';

const InfoPage = () => {
      
  return (
    <Container>
             
        <Box>
            <Typography  color='#A78BFA' sx={{fontSize : {xs : '1.5rem',md : '2.5rem'},textAlign : 'center',my:{xs : 1,md : 2},textDecoration:'underline'}}  fontWeight={'bold'}>🏥ABOUT US</Typography>
            <VisionSection/>
            <WhoWeAreSection/>
            <WhyChooseUs/>
            <DoctorPanel/>
            <OurServicesSection/>
            <BookWithEase/>
            <LocationSection/>
        </Box>
      
    </Container>
  )
}

export default InfoPage