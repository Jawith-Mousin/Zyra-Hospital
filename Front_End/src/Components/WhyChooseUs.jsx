//Importing the necessary packages
import React from 'react'
import { Container,Typography,Box } from '@mui/material';
import { motion} from 'framer-motion';

const WhyChooseUs = () => {
  //This JSX is used in Info page and it's used to show WhyChooseUs of Zyra Hospitals
  return (
    <Container>
        <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 4}}> 
        <Box sx={{backgroundColor: '#F3E8FF',borderRadius: 2,px: { xs: 1, md: 3 },py: { xs: 2, md: 3 },my : 2,boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',}}>
        <Typography color="#3A0069" fontWeight="bold"
    sx={{fontSize: { xs: '1rem', md: '1.5rem' },py: 1,px: { xs: 1, md: 2 },borderBottom: '2px solid #A78BFA',}}>🤝 Why Choose Us?</Typography>
                    <Box sx={{backgroundColor: '#ffffff',borderRadius: 2,mt: 2,px: { xs: 2, md: 4 },py: { xs: 2, md: 3 },border: '1px solid #E2E8F0',}}>
                        <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}> Trusted specialists across key medical fields</Typography>
        
                        <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}> Real-time appointment system with instant feedback</Typography>
        
                        <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}> Clean, modern infrastructure and consultation rooms</Typography>
        
                        <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}> Data-secure system with patient-first design</Typography>
        
                        <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}> Rescheduling & follow-up reminders built in</Typography>
                    </Box>
        </Box>
        </motion.div>
    </Container>
  )
}

export default WhyChooseUs