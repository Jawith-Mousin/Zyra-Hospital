//Importing the necesary packages
import React from 'react'
import { Container,Typography,Box } from '@mui/material';
import { motion} from 'framer-motion';

const OurServicesSection = () => {
  //This JSX is been used in Info page and it's used to showcase the services offered by Zyra Hospitals
  return (
    <Container>
      <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 6}}> 
        <Box sx={{
        backgroundColor: '#F3E8FF',
        borderRadius: 2,
        px: { xs: 1, md: 3 },
        py: { xs: 2, md: 3 },
        my : 2,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
      }}>
        <Typography color="#3A0069"
    fontWeight="bold"
    sx={{
      fontSize: { xs: '1rem', md: '1.5rem' },
      py: 1,
      px: { xs: 1, md: 2 },
      borderBottom: '2px solid #A78BFA',
    }}>🌐 Our Services</Typography>
                    <Box sx={{backgroundColor: '#ffffff',borderRadius: 2,mt: 2,px: { xs: 2, md: 4 },py: { xs: 2, md: 3 },border: '1px solid #E2E8F0'}}>
                        <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}>👩‍⚕️ General Medicine & Primary Care</Typography>
                        <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}>❤️ <span style={{fontWeight : 'bold'}}>Cardiology</span> – Led by <span style={{fontStyle:'italic'}}>Dr. Zyra</span></Typography>
                        <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}>🧠 <span style={{fontWeight : 'bold'}}>Neurology</span> – Consult with <span style={{fontStyle:'italic'}}>Dr. Yusuf</span></Typography>
                        <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}>🧘 <span style={{fontWeight : 'bold'}}>Psychiatry</span> – Personalized care by <span style={{fontStyle:'italic'}}>Dr. Mohamed</span></Typography>
                        <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}>🧬 Diagnostic Lab Services</Typography>
                        <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}>🏥 Teleconsultation & Online Appointment Booking</Typography>
                        <Typography sx={{fontStyle: 'italic',fontSize: { xs: '0.85rem', md: '1rem' },color: '#334155',lineHeight: 1.7,}}>📆 Digital Appointment Calendar</Typography>
                    </Box>
        </Box> 
      </motion.div>             
    </Container>
  )
}

export default OurServicesSection