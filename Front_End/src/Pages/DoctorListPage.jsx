//importing the necessary packages
import { Container, Grid, Typography,TextField, InputAdornment,Box } from '@mui/material'
import React,{useEffect, useState} from 'react'
import DoctorCard from '../Components/DoctorCard'
import ZustandStorage from '../Zustand/Zustand';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

const DoctorListPage = () => {
 //Getting the doctorlist (Contains details of doctor) from Zustand Storage
 const {doctorlist} = ZustandStorage();

 //State variable is used to store the doctordetail
 const [doctorList,setdoctorList] = useState(doctorlist);

 //State variable is used to check whether the searchicon is been clicked or not
 const [searchParams,setsearchParams] = useState(false);

 //State variable is used to store the search value
 const [searchValue,setSearchValue] = useState('');


 //useEffect is used for the search functionality of when the user type the search value and press enter key it will call the 
 //handleSearch function 
 useEffect(() => {
  const handleKeyDown = (e) => {
    if(e.key == "Enter" && searchParams)
      {
        handleSearch()
      } 
  }
  window.addEventListener('keydown',handleKeyDown)
  return () => {
    window.removeEventListener('keydown', handleKeyDown)
  }
 },[searchValue])

 //handleSearchfunction is used to check whether the search value is present or not if's empty searchparams will became false 
 //else true and the value will be search and show  on the screen . .
 const handleSearch = (e) => {
 if (searchParams == false) {
  setsearchParams(true)
 }
 if (searchValue == '' && searchParams){
        setsearchParams(false)
        setdoctorList(doctorlist)
 }
 else 
 {
      const searchFilteredvValue = doctorlist.filter((doc) => 
      (doc.name.toLowerCase()).includes(searchValue.toLowerCase()) 
      || 
      (doc.specialization.toLowerCase()).includes(searchValue.toLowerCase())
      )
      setdoctorList(searchFilteredvValue)
 }
 }
 
return (
    <Container >
      <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 1}}>
      <Box sx={{display :'flex',justifyContent : 'end',my: 2}}>
      <TextField variant='outlined' label=""
      placeholder='Search by doctor name or specialization' 
      InputLabelProps={{
        shrink: true, 
      }}
      sx={{
        '& .MuiInputBase-root': 
        {
            height: 45,
            width : searchParams ? 350 : 55   
        },
        '& .MuiOutlinedInput-root' : {
          borderRadius : '25px',
          fontSize : searchParams ? '14px' : '0px',
        },
        }}
        slotProps={{
          input : {
            endAdornment : (
              <InputAdornment position='end' onClick={handleSearch} >
                  <SearchIcon sx={{cursor : 'pointer'}} />
              </InputAdornment>
            )
          }
        }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        
        ></TextField>
        </Box>
      <Typography variant='h4' fontWeight={'bold'} color='#A78BFA' textAlign={{xs : 'center',md : 'left'}}>Our Specialist Doctors</Typography>
        <Grid container spacing={2} border={'1px solid #E2E8F0'} my={2}>
          {doctorList.length > 0  ? 
          doctorList.map(({id,img,name,specialization,availability_status,schedule,unavailableDate}) => (
            <DoctorCard id={id} img={img} name={name} specialization={specialization} 
            availability_status={availability_status} schedule={schedule} unavailableDate={unavailableDate} bookbtn={true}
            />
          ))
          : 
          <Typography variant='h6' >No Results were found .. </Typography>
          }  
        </Grid>
      </motion.div>  
    </Container>
  )
}

export default DoctorListPage