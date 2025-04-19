//Importing the necessary packages
import { Container,Box} from '@mui/material'
import {AnimatePresence, motion} from 'framer-motion';
import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import InfoIcon from '@mui/icons-material/Info';
import {useMediaQuery} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';

const BottomHeader = () => {
    
    const navigate = useNavigate()
    
    const location = useLocation()
    
    //State variable is used for storing which header icon is been pressed
    const [isActiveHeader,setisActiveHeader] = useState('')

    //Below code is used to check whether the resolution is Mobile or PC if it's Mobile it's been set to true
    const isMobile = useMediaQuery('(max-width:1000px)')

    //State variable is used for setting the bottom header to be shown or not 
    const [activeheadercomponent,setactiveheadercomponent] = useState((isMobile == true) && true)
    
    //useEffect is been used for checking the location path and storing it in the isActiveHeader state variable 
    useEffect(() => {
        if (location.pathname == '/' || location.pathname.includes('/FormPage')) {
            setisActiveHeader('Home')
        } 
        if (location.pathname == '/calendarschedule') {
            setisActiveHeader('Calendar')
        } 
        if (location.pathname == '/doctorlistpage') {
            setisActiveHeader('DoctorList')
        } 
        if (location.pathname == '/Info') {
            setisActiveHeader('Info')
        }
        const Interval = setTimeout(() => {
            setactiveheadercomponent(false)
        },4000)
        
        const handleDoubleClick = () => {
            if (isMobile)
            {
                setactiveheadercomponent(true)
            }
            
        }

        window.addEventListener('dblclick',handleDoubleClick)

        return () => {
            clearInterval(Interval)
            window.removeEventListener('dblclick', handleDoubleClick);
        }
    },[activeheadercomponent,isMobile])


    //Functions
    //It's used for handling the navigation between the pages
    const handleNavigation = (HeaderName) => {
        setisActiveHeader(HeaderName)
        if (HeaderName == 'Home') {
            navigate('/')
        } 
        if (HeaderName == 'Calendar') {
            navigate('/calendarschedule')
        } 
        if (HeaderName == 'DoctorList') {
            navigate('/doctorlistpage')
        } 
        if (HeaderName == 'Info') {
            navigate('/Info')
        } 


    }


  return (
    <>
    {activeheadercomponent && 
    <AnimatePresence mode='wait'>
    <Container sx={{position : 'fixed',bottom : '20px',left : {xs : '10px', md : '150px'}, zIndex : 20}}>    
    <motion.div 
    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
    exit={{ opacity: 0, y: 50 }}
    >
    <Container  
    sx={{display : 'flex',justifyContent :'center',alignItems : 'center'}}>
        <Box px={2} py={2} maxWidth={250}  sx={{border : '1px solid black',borderRadius : '10px',background : '#3A0069'}}>

        <HomeIcon sx={{px : 1,background : isActiveHeader == 'Home' ? '#e2e8f0' : 'none',color : isActiveHeader == 'Home' ? 'black' : 'white' ,border : '1px solid black',borderRadius : '20%',py : 1,mx : 1, ':hover' : {cursor : 'pointer'}}} onClick={() => handleNavigation('Home')}/>

        <CalendarMonthIcon sx={{px : 1,background : isActiveHeader == 'Calendar' ? '#e2e8f0' : 'none',color : isActiveHeader == 'Calendar' ? 'black' : 'white' ,border : '1px solid black',borderRadius : '20%',py : 1,mx : 1,':hover' : {cursor : 'pointer'}}} onClick={() => handleNavigation('Calendar')}/>
        
        <LocalHospitalIcon sx={{px : 1,background : isActiveHeader == 'DoctorList' ? '#e2e8f0' : 'none',color : isActiveHeader == 'DoctorList' ? 'black' : 'white' ,border : '1px solid black',borderRadius : '20%',py : 1,mx : 1,':hover' : {cursor : 'pointer'}}} onClick={() => handleNavigation('DoctorList')}/>

        <InfoIcon sx={{px : 1,background : isActiveHeader == 'Info' ? '#e2e8f0' : 'none',color : isActiveHeader == 'Info' ? 'black' : 'white' ,border : '1px solid black',borderRadius : '20%',py : 1,mx : 1,':hover' : {cursor : 'pointer'}}} onClick={() => handleNavigation('Info')}/>
        
        </Box>
    </Container>
    </motion.div>
    </Container>
    </AnimatePresence>
    }
    </>
  )
}

export default BottomHeader