//Importing the necessary ones
import { Box, Button,MenuItem, TextField, Typography,Paper,InputAdornment } from '@mui/material'
import React, {useState } from 'react'
import ZustandStorage from '../Zustand/Zustand';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import DateRangeIcon from '@mui/icons-material/DateRange';
import {useMediaQuery} from '@mui/material'
import { motion} from 'framer-motion';


const FormPage = () => {
  
  //PatientAppointmentdetail - It's related to PatinetAppointmentdetail where the user was already booked details
  //doctorlist - It's related to doctor details that's been working in the zyra hospital and it' an dummy data
  //doctorlistindividualdetail - It contains each doctor achivements and their bio detail
  //Importing the data from the Zustand Storage (acts like localStorage in React).
  const {doctorlist,PatientAppointmentDetailId,AddPatientsAppointmentDetailsId,
    doctorlistindividualdetail,PatientAppointmentDetails,
    ReschedulePatientAppointmentDetails,AddPatientsAppointmentDetails} = ZustandStorage();
    
  const {id} = useParams()

  const location = useLocation()
  
  //Below line is used to fetch the location.pathname after the '/FormPage/${id}' so it will contain the patientappointmentdetailid
  //and storing it in the local variable of patientappointmentdetailid   
  const patientappointmentdetailid = location.pathname.split(`/FormPage/${id}/`)[1] || '';
    
  const Navigate = useNavigate();

  //Below line is been used to find the current resolution where mobile or PC
  const isMobile = useMediaQuery('(max-width:600px)')

  // Filter a single doctor's details by ID, based on the user’s selection (e.g. from "Book Appointment" click).
  const filtereddoctordetail = doctorlist.filter((doctor) => doctor.id == id)
  
  //Filter the patientappointmentdetail as based upon patientappointmentdetailid if the id present 
  const filteredpatientappointmentdetail = PatientAppointmentDetails.filter((patient) => patient.Id == patientappointmentdetailid)

  const filteredpatienttimeslotdetail = PatientAppointmentDetails
  
  //Filter out the doctorname from the doctorlistindividualdetail to get the specific doctor detail
  const filtereddoctorindividualdetail = doctorlistindividualdetail.filter((doctor) => doctor.name == filtereddoctordetail[0].name)
  
  //State variable is used to set the calendar to show or hide  
  const [dateInput,setdateInput] = useState(false)
  
  //State variable is used to store the form date
  const [Formdetails,setFormdetails] = useState({
    doctorName : filtereddoctordetail[0].name,
    appointmentDate : filteredpatientappointmentdetail.length > 0 ? filteredpatientappointmentdetail[0].AppointmentDate :'',
    timeSlot : filteredpatientappointmentdetail.length > 0 ? filteredpatientappointmentdetail[0].TimeSlot :'',
    patientName : filteredpatientappointmentdetail.length > 0 ? filteredpatientappointmentdetail[0].PatientName :'',
    patientContactNo : filteredpatientappointmentdetail.length > 0 ? filteredpatientappointmentdetail[0].PatientContactNo : 0,
    patientEmail : filteredpatientappointmentdetail.length > 0 ? filteredpatientappointmentdetail[0].PatientEmail :'',
  })

  //State variable is used to handling the error validation 
  const [Formdetailserror,setFormdetailserror] = useState({
    appointmentDateError : false,
    timeSlotError : false,
    patientNameError : false,
    patientContactNoError : false
  })
  
  //It's used to fetch the today,tomorrow date and converting the tomorrow date to the desired format of 'yyyy-MM-dd'
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const formattedTomorrowDate = tomorrow.toISOString().split('T')[0]

  //Functions 
  //It's used to handle the calendar visiblity and setting the values in the Form details state variable,Also error handling 
  const handleDateClick = (info) => {
      setFormdetails((prevFormDetails) => ({...prevFormDetails,appointmentDate : info.dateStr}))
      setdateInput(false)
      setFormdetailserror((prevFormDetailserror) => ({...prevFormDetailserror,appointmentDateError : false}))
  }

  
  //It's used to handle the Form Submit
  const handleSubmit = () => {
    //These boolean values are used for validation
    let hasError = false;
  
    const isDateEmpty = Formdetails.appointmentDate === '';
    const isTimeSlotEmpty = Formdetails.timeSlot.trim() === '';
    const isPatientNameEmpty = Formdetails.patientName.trim() === '';
    const isContactInvalid = Formdetails.patientContactNo === 0 || Formdetails.patientContactNo.length <= 9;
  
    // Set errors
    setFormdetailserror({
      appointmentDateError: isDateEmpty,
      timeSlotError: isTimeSlotEmpty,
      patientNameError: isPatientNameEmpty,
      patientContactNoError: isContactInvalid,
    });
  
    //Checking whether the value is empty or not if it's empty set the hasError to true 
    if (isDateEmpty || isTimeSlotEmpty || isPatientNameEmpty || isContactInvalid) {
      hasError = true;
    }
  
    //if hasError is been true it will be return
    if (hasError) return; 
  
    //  If no errors → proceed to reschedule or add
  
    //Below startTime is used to change the dates to the ISO String format
    //Below startDateTime is used to create a new date with a argument of startTime
    //Below end is used to create a new date with an argument of startTime + 30 which means half an hour extra value will be stored
    //as an example if the startDatetime is 10:00 the end will store as 10:30 
    // Pad single-digit values with a leading zero to maintain proper date-time format (e.g. "09" instead of "9").
    // Construct the formatted ISO-like end date-time string (yyyy-mm-ddThh:mm:ss) for the appointment's end time.
    const startTime = `${Formdetails.appointmentDate}T${Formdetails.timeSlot}:00`;
    const startDateTime = new Date(startTime);
    const end = new Date(startDateTime.getTime() + 30 * 60000);
    const pad = (n) => n.toString().padStart(2, "0");
    const endDateTime = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}T${pad(end.getHours())}:${pad(end.getMinutes())}:${pad(end.getSeconds())}`;
  
    if (filteredpatientappointmentdetail.length > 0) {
      // Rescheduling
      ReschedulePatientAppointmentDetails(
        patientappointmentdetailid,
        Formdetails.appointmentDate,
        Formdetails.timeSlot,
        startTime,
        endDateTime
      );
      setFormdetails((prev) => ({ ...prev, appointmentDate: '', timeSlot: '' }));
    } else {
      // New appointment
      const PatientDetail = {
        Id: PatientAppointmentDetailId,
        DoctorId: id,
        DoctorName: Formdetails.doctorName,
        AppointmentDate: Formdetails.appointmentDate,
        StartDateTime: startTime,
        EndDateTime: endDateTime,
        TimeSlot: Formdetails.timeSlot,
        PatientName: Formdetails.patientName,
        PatientContactNo: Formdetails.patientContactNo,
        PatientEmail: Formdetails.patientEmail,
        title: `${Formdetails.doctorName} - ${filtereddoctordetail[0].specialization}`,
        color: '#FF6B6B',
        status: 'Pending',
      };
  
      AddPatientsAppointmentDetails(PatientDetail);
      AddPatientsAppointmentDetailsId();
      setFormdetails({
        appointmentDate: '',
        timeSlot: '',
        patientName: '',
        patientContactNo: 0,
      });
    }
  
    Navigate('/calendarschedule');
  };
  
  
  return (
    <>
        <Box display={'flex'} justify-content={filtereddoctorindividualdetail.length > 0 ? 'space-between' : 'center'}  px={{sm : 1}} flexDirection={{xs : 'column',md : 'row'}} marginTop={{xs : 0,md : 1}}>
            {dateInput == false || isMobile == true? 
            <Box mx={{xs : 0}}  paddingLeft={{xs :0 ,md : 1}} marginRight={{xs : 0,md : 8}} paddingRight={{xs :0 ,md : 2}}  px={0} 
            py={{xs : 0,md : 3}}
            sx={{height : {xs : '90vh', md : '80vh'},width : {xs : '99%',md : '50%'},border : '1px solid #E2E8F0',
            bgcolor : '#FAFAFA',borderRadius : 3, marginLeft : {md : 4} }}>
            <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 1}} >  
              {filtereddoctordetail.map(({name,specialization}) => (
                <Box key={name}>
                <Typography  variant='h3' fontWeight={'bold'} textAlign={'center'} paddingTop={4} sx={{color : '#334155'}}>Dr. {name}</Typography>
                <Typography variant='h6' textAlign={'center'} paddingBottom={{xs : 1,md : 4}} sx={{color : '#64748B'}}>{specialization}</Typography>
                </Box>
              ))}
              <Paper elevation={3} sx={{mx : 2,bgcolor : '#F5F5F5' , color :'	#334155',borderRadius : 4}} 
              border={'1px solid #CBD5E1'}>
              {filtereddoctorindividualdetail.length > 0 ?  
                filtereddoctorindividualdetail[0].details.map((paragraph,index) => (
                    <Typography key={index} variant='body1' px={2} py={2}>{paragraph}</Typography>
                ))
                :
              (
                <>
                <Typography variant='body1' px={2} py={2}>
                  Lorem ipsum dolor sit amet . The graphic and typographic operators know this well, 
                  in reality all the professions dealing with the universe of communication have a stable relationship with these 
                  words, but what is it? Lorem ipsum is a dummy text without any sense.t is a sequence of Latin words that, as they are 
                  positioned, do not form sentences with a complete sense, but give life to a test text useful to fill spaces that will 
                  subsequently be occupied from ad hoc texts composed by communication professionals.
                </Typography>
                <Typography variant='body1' px={2} py={2}>
                  Lorem ipsum contains the typefaces more in use, an aspect that allows you to have an overview of the rendering 
                  of the text in terms of font choice and font size.When referring to Lorem ipsum, different expressions are used, 
                  namely fill text , fictitious text , blind text or placeholder text : in short, its meaning can also be zero, 
                  but its usefulness is so clear as to go through the centuries and resist the ironic and modern versions that came with the 
                  arrival of the web.
                </Typography>
                </>
              )
              }
                </Paper>
                </motion.div>               
                </Box>                
                :
                (isMobile == false && dateInput == true) &&
                <Box mx={{xs : 0}}  paddingLeft={{xs :0 ,md : 2}} marginRight={{xs : 0,md : 8}} paddingRight={{xs :0 ,md : 2}}  px={0} 
                my
                py={{xs : 0,md : 4}}
                sx={{height : {xs : '90vh', md : '77vh'},width : {xs : '99%',md : '50%'},border : '1px solid #E2E8F0',
                bgcolor : '#FAFAFA',borderRadius : 3, marginLeft : {md : 4} }}>
                <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 1}} >
                <FullCalendar
                 plugins={[dayGridPlugin,interactionPlugin]}
                 initialView="dayGridMonth"
                 height="auto"
                 headerToolbar={false} 
                 selectable={true}
                 editable={false}
                 validRange={{
                  start : formattedTomorrowDate,
                 }}
                 dateClick={handleDateClick}
                 contentHeight={300} 
                />
                </motion.div>
                </Box>
                
                }
           

                
           <Box sx={{float : {md : 'right'},height : {xs : '90vh', md : '86vh'}}} my={{xs : 1,md :0}} px={2} 
           width={{xs : '92%', md : '50%'}} border={'1px solid black'}  
           borderRadius={3} bgcolor={'	#F5F5F5'} >
          {dateInput == false || isMobile == false ?
          <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 1}} >
          <>
            <Typography 
            color = {'#334155'} 
            sx={{fontWeight : 'bold',textAlign : 'center',py : {xs : 2,md : 2},
            paddingBottom : {xs : 0, md : 2},
            fontSize: {xs : '1.8rem',md : '1.7rem'},
            }}>Secure your consultation with Dr. {Formdetails.doctorName}</Typography>
            <Typography py={1} 
            
            sx={{color : (Formdetailserror.appointmentDateError == true ) ? '#FF6B6B' : '#64748B', 
            fontSize : {xs : '1rem',md : '1rem'} }}>
                Please Select the Appointment Date : 
            </Typography>
            <TextField variant='outlined' label=""
            value={Formdetails.appointmentDate}
            fullWidth
            sx={{
                '& .MuiInputBase-root': 
                {
                    height: 40,
   
                },
                '& .MuiOutlinedInput-root' : {
                  borderRadius : '5px',
                  fontSize : '14px',
                },
                }}
                slotProps={{
                  input : {
                    endAdornment : (
                      <InputAdornment position='end' >
                          <DateRangeIcon sx={{cursor : 'pointer'}} onClick={() => setdateInput(!dateInput)}/>
                      </InputAdornment>
                    )
                  }
                }}
            ></TextField>

            <Typography variant='body1' py={1} sx={{color : (Formdetailserror.timeSlotError) ? '#FF6B6B' : '#64748B' }}>Please Select the TimeSlot : </Typography>
            <TextField fullWidth select disabled={Formdetails.appointmentDate == ''} 
             label="Select"  
            value={Formdetails.timeSlot} 
            onChange={(e) => {setFormdetails((prevFormDetails) => ({...prevFormDetails,timeSlot : e.target.value}));
            setFormdetailserror((prevFormDetailserror) => ({...prevFormDetailserror,timeSlotError : false}))
            }} 
            variant='outlined'
            sx={{
              border : '#BFA7E4',
              '& .MuiInputBase-root': {
                         height: 45, 
              },
              py : {md : 1}
            }}
            
            >
            {Formdetails.appointmentDate != '' &&         
            filtereddoctordetail[0].timeSlots.map((time) => (
              filteredpatienttimeslotdetail.length > 0 || Formdetails.timeSlot === '' ? 
              (!filteredpatienttimeslotdetail.some(
                (patient) =>
                  patient.AppointmentDate === Formdetails.appointmentDate &&
                  patient.TimeSlot === time && 
                  Formdetails.timeSlot != time
              ) && (
                    <MenuItem key={time} value={time}>
                    {time}
                    </MenuItem>
              )) :
              (
                <MenuItem key={time} value={time}>
                    {time}
                </MenuItem> 
            )))}
            </TextField>

            <Typography sx={{fontSize : {xs : 20,md : 30}}} fontWeight={'bold'} py={1} color='	#334155'>Patient Details</Typography>

            <Typography variant='body1' sx={{color : (Formdetailserror.patientNameError) ? '#FF6B6B' : '#64748B' }}>Patient Name : </Typography>
            <TextField fullWidth label="" type='text' 
            disabled={filteredpatientappointmentdetail.length > 0}
            value={Formdetails.patientName} 
            onChange={(e) => {setFormdetails((prevFormDetails) => ({...prevFormDetails,patientName : e.target.value}));
            setFormdetailserror((prevFormDetailserror) => ({...prevFormDetailserror,patientNameError : false}))
            }}
            variant='outlined'
            sx={{
              '& .MuiInputBase-root': {
                         height: 40,
              },
              my :{xs : 1}
            }}
            ></TextField>



            <Typography variant='body1' paddingTop={2} sx={{color : (Formdetailserror.patientContactNoError) ? '#FF6B6B' : '#64748B' }}>Contact No : {Formdetailserror.name && <Typography>Please Select the Contact No</Typography>}</Typography>
            <TextField fullWidth label="" type='number'
             disabled={filteredpatientappointmentdetail.length > 0}
            value={Formdetails.patientContactNo == 0 ? '' : Formdetails.patientContactNo} 
            onChange={(e) => {setFormdetails((prevFormDetails) => ({...prevFormDetails,patientContactNo : e.target.value}));
            setFormdetailserror((prevFormDetailserror) => ({...prevFormDetailserror,patientContactNoError : false}))
            }}
            variant='outlined'
        
            sx={{
              '& .MuiInputBase-root': {
                         height: 40,
              },
              my : {xs : 1, md : 2}
            }}
            ></TextField>
            <Typography variant='body1' paddingTop={2} sx={{color : '#64748B' }}>Email (optional) :</Typography>
            <TextField fullWidth label="" type='text' 
            value={Formdetails.patientEmail} 
            onChange={(e) => setFormdetails((prevFormDetails) => ({...prevFormDetails,patientEmail : e.target.value}))}
            variant='outlined'
            sx={{
              '& .MuiInputBase-root': {
                         height: 40,
              }
            }}
            ></TextField>

            
                <Box sx={{display : 'flex',justifyContent : 'center',alignItems : 'center',my : 3}}>
                <Button variant='outlined' 
                    sx={{borderColor : '#4B0082',bgcolor : '#4B0082',color : 'white',borderRadius : 2,':hover' : {bgcolor : '#5F2DA1'}}} onClick={handleSubmit}>Submit</Button>
              </Box>
                </>
              </motion.div>     
            :
            <Box mx={{xs : 0}}  paddingLeft={{xs :0 ,md : 2}} marginRight={{xs : 0,md : 8}} paddingRight={{xs :0 ,md : 2}}  px={0} 
            my
            py={{xs : 0,md : 4}}
            sx={{height : {xs : '90vh', md : '77vh'},width : {xs : '99%',md : '50%'},border : '1px solid #E2E8F0',
            bgcolor : '#FAFAFA',borderRadius : 3, marginLeft : {md : 4} }}>
            <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 1}} >
            <FullCalendar
             plugins={[dayGridPlugin,interactionPlugin]}
             initialView="dayGridMonth"
             height="auto"
             headerToolbar={false} 
             selectable={true}
             editable={false}
             validRange={{
              start : formattedTomorrowDate,
             }}
             dateClick={handleDateClick}
             contentHeight={300} 
            />
            </motion.div>
            </Box>
            }
            </Box>
            
        </Box>
      </>
    
  )
}

export default FormPage