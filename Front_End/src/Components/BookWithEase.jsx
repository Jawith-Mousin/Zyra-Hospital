//Importing the necessary packages
import React from 'react'
import { Container,Typography,Box } from '@mui/material';
import { motion} from 'framer-motion';

const BookWithEase = () => {
  return (
    <Container>
       <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 7}}> 
        <Box sx={{backgroundColor: '#F3E8FF',borderRadius: 2,px: { xs: 1, md: 3 },py: { xs: 2, md: 3 },my : 2,boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',}}>
        <Typography sx={{fontSize: { xs: '1rem', md: '1.5rem' },py: 1,px: { xs: 1, md: 2 },borderBottom: '2px solid #A78BFA',fontWeight : 'bold'}}>📱 Book with Ease</Typography>
            <Box sx={{backgroundColor: '#ffffff',borderRadius: 2,mt: 2,px: { xs: 2, md: 4 },py: { xs: 2, md: 3 },border: '1px solid #E2E8F0',}}>
                    <Typography sx={{fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}} fontWeight = {'bold'}>Patients can:</Typography> 

                    <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}>Search by specialization or doctor</Typography>            

                    <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}>Pick from available times</Typography>            

                    <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}>Reschedule or cancel with a click</Typography>            

                    <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}>  View appointment history via calendar view</Typography>
            </Box>
        </Box>  
      </motion.div>    
    </Container>
  )
}

export default BookWithEase