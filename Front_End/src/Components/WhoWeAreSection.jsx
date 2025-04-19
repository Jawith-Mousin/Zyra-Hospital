//Importing the necessary package
import React from 'react';
import { Container,Typography,Box } from '@mui/material';
import { motion} from 'framer-motion';

const WhoWeAreSection = () => {
  //This JSX is been used in Info Section and used to showcase the WhoWeAre Section
  return (
    <Container>
      <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 3}}> 
        <Box sx={{
        backgroundColor: '#F3E8FF', // 💜 Soft lavender background
        borderRadius: 2,
        px: { xs: 1, md: 3 },
        py: { xs: 2, md: 3 },
        my : 2,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
      }}>  
    <Typography  color="#3A0069"
    fontWeight="bold"
    sx={{
      fontSize: { xs: '1rem', md: '1.5rem' },
      py: 1,
      px: { xs: 1, md: 2 },
      borderBottom: '2px solid #A78BFA',
    }}>🏥 Who we Are</Typography>
            <Box sx={{
                backgroundColor: '#ffffff',
                borderRadius: 2,
                mt: 2,
                px: { xs: 2, md: 4 },
                py: { xs: 2, md: 3 },
                 border: '1px solid #E2E8F0',
                }}>
                <Typography sx={{
                    fontStyle: 'italic',
                    fontSize: { xs: '0.85rem', md: '1rem' },
                    color: '#334155',
                    lineHeight: 1.7,
                }}>
                Zyra Hospitals is a modern, multi-specialty medical center dedicated to accessible, expert healthcare. We combine advanced treatment options with a personalized care approach, 
                ensuring every patient feels heard, supported, and well-treated.
                <Typography 
                sx={{
                  fontStyle: 'italic',
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  color: '#334155',
                  lineHeight: 1.7,
                }}>
                With a passionate team of certified doctors, nurses, and technicians, 
                we’ve earned the trust of thousands of patients across multiple specialties—from 
                cardiology and neurology to psychiatry and internal medicine.
                </Typography>
                </Typography>
            </Box>
        </Box>
       </motion.div> 
    </Container>
  )
}

export default WhoWeAreSection