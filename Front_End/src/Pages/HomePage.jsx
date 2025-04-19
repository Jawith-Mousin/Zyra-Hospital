//Importing the necessary mui materials and another things 
import { Button, Container, Typography,Box,Grid} from '@mui/material'
import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import ZustandStorage from '../Zustand/Zustand';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion } from 'framer-motion';
import DoctorCard from '../Components/DoctorCard';

const HomePage = () => {
  // Initialize navigation and retrieve doctor data from Zustand storage (acts like localStorage in React).
  // Filter doctors where `main_page` is true to display only selected doctors on the homepage.
  // Use `doctorcardnumber` state to rotate between featured doctors (e.g. for carousel/auto-switch behavior).
  const navigate = useNavigate(); 
  const {doctorlist} = ZustandStorage();    
  const filtereddoctors = doctorlist.filter((doctor) => doctor.main_page == true)
  const [doctorcardnumber,setdoctorcardnumber] = useState(0)


  //useEffect
  //Initalize UseEffect for changing the doctorcardnumber continously after every 10 seconds so it act like a carousel 
  useEffect(() => {
   const Intervaltimeout = setInterval(() => {
    setdoctorcardnumber((prevcardnumber) => prevcardnumber == filtereddoctors.length -1 ? 0 : prevcardnumber + 1)
   },10000)
   return () => clearInterval(Intervaltimeout) 
  },[doctorcardnumber])

  //Functions
  //handlePreviousBackbtn function is used to change the doctor number to previous so the previous doctor card will be shown
  const handlePreviousBackbtn = () => {
    setdoctorcardnumber((prevcardnumber) => prevcardnumber == 0 ? filtereddoctors.length -1 : prevcardnumber - 1)
  }
  //handleNextForwardbtn function is used to change the doctor number to next so the next doctor card will be shown
  const handleNextForwardbtn = () => {
    setdoctorcardnumber((prevcardnumber) => prevcardnumber == filtereddoctors.length -1 ? 0 : prevcardnumber + 1)
  }
  
  //Below code is the JSX where it will automatically change as based upon resolution . .
  return (
    <>
    <Container>
    <Grid display ='flex' justifyContent = 'space-around' flexDirection = {{xs : 'column-reverse' ,md :'row'}} color={'white'} 
    border={'1px solid #E2E8F0'}
    borderRadius={2} my={1} height={'87vh'} sx={{background: '		#FAFAFA'}}>
        <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 1}}>
        <Grid key={doctorcardnumber} item xs= {12} sm={6} md={2}>
          <Box marginTop={{xs : 0, md :25}} paddingTop={{xs :0}}  paddingLeft={{xs : 2,md :12}} paddingRight={0} >
            <Typography variant='h1' my={{xs : 2, md : 3}} sx={{fontSize : {xs : '1.5rem',sm : '3rem',md : '3rem'},color : '#334155',textAlign: {xs : 'center',md : 'left'}}} py={{xs : 0,md :2}}>Consult Dr.{filtereddoctors[doctorcardnumber].name}, your trusted {filtereddoctors[doctorcardnumber].specialization} expert.</Typography>
            <Button variant='outlined'  sx={{padding : {xs : 0.5,md : 1}, marginLeft : {xs : '120px',md : '0px'},bgcolor : '#4B0082',color : 'white',':hover' :{bgcolor : '#5F2DA1'}}} onClick={() => navigate(`/FormPage/${filtereddoctors[doctorcardnumber].id}`)}>Book an Appointment</Button>
          </Box>
        </Grid>
        </motion.div>

        <Grid item xs={0} sm={6} md={8} marginRight={7} marginLeft={{xs : 6}} marginTop={{xs : 2,md : 13}} marginBottom={{xs : 0,md :8}} >
        <Grid sx={{border : '1px solid #E2E8F0'}}  borderRadius={2} bgcolor='#FAFAFA' >
          <Box display={'flex'}  justifyContent={'space-between'}>
              <ArrowBackIosIcon sx={{border : '1px solid white',borderRadius : '50%',marginLeft : '15px',fontSize : '22px',paddingLeft:'7px',paddingRight : '1px',paddingTop :"4px",paddingBottom : '4px',
              ':hover' : {
                background : 'white',
                cursor : 'pointer',
                color : 'black'
              }
            }}
            onClick={handlePreviousBackbtn}
            />
            <ArrowForwardIosIcon sx={{border : '1px solid white',borderRadius : '50%',marginRight : '15px',fontSize : '22px',paddingLeft:'6px',paddingRight : '4px',paddingTop :"4px",paddingBottom : '4px',
              ':hover' : {
                background : 'white',
                cursor : 'pointer',
                color : 'black'
              }
            }}
            onClick={handleNextForwardbtn}
            />
          </Box>
          {filtereddoctors.length > 0 ? 
            <motion.Grid key={doctorcardnumber}   
            item sm ={6} md={4} py={2} paddingLeft={30} paddingRight={30} mx={2} my={2} 
            backgroundColor = '' borderRadius={2}
            initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 2}}
            >
                  <DoctorCard 
                  img = {filtereddoctors[doctorcardnumber].img}
                  name={filtereddoctors[doctorcardnumber].name} 
                  specialization={filtereddoctors[doctorcardnumber].specialization} 
                  availability_status={filtereddoctors[doctorcardnumber].availability_status} bookbtn={false}/> 
            </motion.Grid>
            :
            <Typography>Please Try again after some time</Typography>
            }
            </Grid>
          </Grid> 
        </Grid>
    </Container>
    </>
  )
}

export default HomePage

