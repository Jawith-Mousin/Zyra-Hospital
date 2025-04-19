//Importing the necessary packages
import React, { useEffect,useState } from 'react'
import { Box, Paper, Typography,useMediaQuery } from '@mui/material';
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
  const headermobilehints = ['Double tap anywhere to show the Header at Bottom']
  //Below line is used to check whether the resolution is mobile or pc
  const isMobile = useMediaQuery('(max-width:1000px)')  

  //Below useNavigate is used to navigate between the page
  const navigate = useNavigate()

  //State variable is used to highlight the current page header icon
  const [activeHeader,setactiveHeader] = useState('')

  //UseEffect is used to findout the location pathname and storing it in a activeHeader state variable
  useEffect(() => {
    if (location.pathname == '/' || location.pathname.includes('/FormPage')) {
      setactiveHeader('Home')
    } 
    if (location.pathname == '/calendarschedule') {
      setactiveHeader('Calendar')
    }  
    if (location.pathname == '/doctorlistpage') {
      setactiveHeader('Doctors')
    } 
    if (location.pathname == '/Info') {
      setactiveHeader('Info')
    }
  },[location.pathname])

  //Functions
  //handleNavigation is used for navigating between the pages and also setting the activeheader 
  const handleNavigation = (HeaderName) => {
    if (HeaderName == 'Home') {
      navigate('/')
  } 
  if (HeaderName == 'Calendar') {  
    navigate('/calendarschedule')
  } 
  if (HeaderName == 'Doctors') {  
    navigate('/doctorlistpage')
  } 
  if (HeaderName == 'Info') { 
    navigate('/Info')
  } 
  }

  //Below JSX code is used to render the header of the page
  return (
    
        <Paper elevation={0}  sx={{display :'flex' ,justifyContent : 'space-between',alignItems : 'center',
        border : '1px solid #E2E8F0',
        px : 4,py : 1,background: '	#3A0069',color : '	#FAFAFA',boxShadow : '2px 6px 5px #E2E8F0',my : {xs : 2}}}
            >
            <Typography variant='h6'sx={{fontWeight : 'bold',fontSize : {xs : '1rem',md : '1.5rem'}}}>Zyra Hospital</Typography>
            <motion.div initial={{opacity : 0}} animate={{opacity : 1}} exit={{opacity :0}} transition={{duration : 1}}>
                {isMobile ? 
                <Typography variant='body2' sx={{fontSize : {xs : '0.7rem',md : '0.9rem'}}}>{headermobilehints[0]}</Typography>
                :
                <Box 
                      display="flex" 
                      justifyContent="space-evenly" 
                      px={2}
                      py={0}
                    >
                     {['Home', 'Calendar', 'Doctors', 'Info'].map((label) => (
                       <Typography
                         key={label}
                         variant="body2"
                         sx={{
                           px: 2,
                           py: 1,
                           cursor: 'pointer',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                           color: activeHeader == label ? 'black' : 'white',
                           backgroundColor : activeHeader == label ? '#e2e8f0' : '',
                          }}
                          onClick={() => handleNavigation(label)} 
                       >
                         {label}
                      </Typography>
                            ))}
                          </Box>

                }
            </motion.div>
        </Paper>
    
  )
}

export default Header