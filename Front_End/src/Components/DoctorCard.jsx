//Importing the necessary packages
import { Box, Button,Grid, Typography} from '@mui/material'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const DoctorCard = ({id,img,name,specialization,availability_status,bookbtn}) => {
  
  //Using useNavigate to navigate between the pages
  const navigate = useNavigate()
  
  return (
    <>
        <Grid item xs={12} md={6} xl={4} p={2} mx={2} my={{xs : 0,md : 2}} >
        <Box display={'flex'} flexDirection={'column'} gap={1}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <img  src={img}  width={220} height={220} style={{borderRadius: '50%',objectFit: 'cover'}} alt="Doctor_Image"/>
            </Box>
            <Typography variant='h6' textAlign={'center'} sx={{color : '#334155'}}>Dr.{name}</Typography>
            <Typography variant='subtitle1' textAlign={'center'} sx={{color : '#64748B'}}>{specialization}</Typography>
            <Typography variant='body2' textAlign={'center'} sx={{color : '	#64748B'}}>Availability : {availability_status}</Typography>
            {bookbtn ? 
            availability_status == 'On Leave' ? 
            <Button variant='outlined' disabled={true}>On Leave</Button> : 
            <Button sx={{backgroundColor : ' #A78BFA',color : '#F3E8FF',
            ':hover' : {backgroundColor : '#F3E8FF',color : '#A78BFA',border : '1px solid #A78BFA'}}} 
            onClick={() => navigate(`/FormPage/${id}`)}>Book an Appointment</Button> : ''}
        </Box>
      </Grid>
    </>
  )
}

export default DoctorCard



//State
  // const [remainingDate,setremainingDate] = useState([])


  // const scheduleWeekendLastDate = schedule && Object.keys(schedule).length > 0 ? Object.keys(schedule)[Object.keys(schedule).length - 1]
  // : null;
  // const unavailableDateWeekendLastDate = unavailableDate && unavailableDate[unavailableDate.length - 1]
  // const today = new Date().toISOString().split('T')[0]
  // let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
  // console.log("tomorrow",tomorrow)
  // let WeekendLastDate
  // if (scheduleWeekendLastDate > unavailableDateWeekendLastDate){
  //      WeekendLastDate = scheduleWeekendLastDate
  // } 
  // else {
  //      WeekendLastDate = unavailableDateWeekendLastDate
  // }
  
  // while (tomorrow <= WeekendLastDate)  
  // {
  //   console.log('While Loop')
  //     if (tomorrow in unavailableDate)
  //     {
  //       setremainingDate((prevdate) => [...prevdate,tomorrow])
  //     }
  //     const fixedTomorrow = new Date(tomorrow)
  //     tomorrow.setDate(tomorrow.getDate() + 1)
  // }

  // console.log("remainingDate",remainingDate)