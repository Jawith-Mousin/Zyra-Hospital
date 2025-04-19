//Importing the necessary packages
import React from 'react'
import { Container,Typography,Box } from '@mui/material';
import { motion} from 'framer-motion';

const LocationSection = () => {
  //This JSX is been used in Info page to show the Zyra Hospitals location
  return (
    <Container>
        <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 8}}> 
        <Box sx={{backgroundColor: '#F3E8FF',borderRadius: 2,px: { xs: 1, md: 3 },py: { xs: 2, md: 3 },my : 2,boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',}}>
        <Typography sx={{fontSize: { xs: '1rem', md: '1.5rem' },py: 1,px: { xs: 1, md: 2 },borderBottom: '2px solid #A78BFA',fontWeight : 'bold'}}>📍 Our Location</Typography>
                <Box sx={{backgroundColor: '#ffffff',borderRadius: 2,mt: 2,px: { xs: 2, md: 4 },py: { xs: 2, md: 3 },border: '1px solid #E2E8F0',}}>
                <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}} >Zyra Hospitals</Typography>  
                <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}} >5th Floor, NovaCare Tower  </Typography>
                <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}} >Wellness Tech Park, Sector 11  </Typography>
                <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}} >Whitefield, Bengaluru – 560066, India</Typography>
                </Box>
        </Box>
        </motion.div>
    </Container>
  )
}

export default LocationSection