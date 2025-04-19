//Importing the necessary packages
import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,Container } from '@mui/material';
import { motion} from 'framer-motion';

const DoctorPanel = () => {
  //Storing the doctors details and availability manually  
  const doctors = [
        { name: 'Dr. Zyra', specialization: 'Cardiologist', status: 'Available' },
        { name: 'Dr. Yusuf', specialization: 'Neurologist', status: 'Available' },
        { name: 'Dr. Mohamed', specialization: 'Psychiatrist', status: 'On Leave' },
        { name: 'Dr. Ashraf', specialization : 'Dermatologist',status : 'Available' }
      ];
  
  //This component is used been info page to show the doctor availability in grid structure     
  return (
  <Container>
    <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 5}}>
    <TableContainer component={Paper} sx={{ my: 4, borderRadius: 2,backgroundColor: '#F3E8FF' }}>
    <Typography variant="h6" color="#3A0069" textAlign="center" py={2} fontWeight={'bold'}>
      Doctor Panel
    </Typography>
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#f1f5f9',fontSize : {md : '0.875rem'}}}>
          <TableCell sx={{border : '1px solid black',color: "#3A0069" }}><strong>Name</strong></TableCell>
          <TableCell sx={{border : '1px solid black',color: "#3A0069" }}><strong>Specialization</strong></TableCell>
          <TableCell sx={{border : '1px solid black',color : "#3A0069" }}><strong>Status</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {doctors.map((doc) => (
          <TableRow key={doc.name}>
            <TableCell>{doc.name}</TableCell>
            <TableCell>{doc.specialization}</TableCell>
            <TableCell sx={{ color: doc.status === 'Available' ? 'green' : 'orange' }}>
              {doc.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </motion.div>  
  </Container> 
  )
}

export default DoctorPanel