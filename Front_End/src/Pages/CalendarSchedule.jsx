//Importing the necessary ones
import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ZustandStorage from '../Zustand/Zustand'
import Modal from '@mui/material/Modal';
import { Box,Typography,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';


const CalendarSchedule = () => {

    //Fetching the date in 'yyyy-MM-dd' in format 
    const today = new Date().toISOString().split('T')[0];
    
    //Getting the PatientAppointmentDetails,RemovePatientsAppointmentDetails from ZustandStorage
    const {PatientAppointmentDetails,RemovePatientsAppointmentDetails} = ZustandStorage();

    //State variable is used to store the patinent Appointment detail
    const [events, setEvents] = useState([])

    //State variable is used for modal popup 
    const [open,setOpen] = useState(false)

    //State variable is used for cancel appointment modal popup
    const [cancelAppointment,setcancelAppointment] = useState(false)
    
    //State variable is used for storing the events(patientindividualappointmentdetail) of the user clicked.
    const [info,setinfo] = useState([])

    const navigate = useNavigate()
   
    //Initalizing useEffect for storing the detail to the event state variable from mappedEvents
    useEffect(() => {
        if (PatientAppointmentDetails?.length > 0) {
            const mappedEvents = PatientAppointmentDetails.map((patient) => (
              patient.AppointmentDate >= today ? 
               {
                Id : patient.Id,
                title : patient.title,
                start : patient.StartDateTime,
                end :   patient.EndDateTime,
                color : patient.color,
                status : patient.status
               }
               : 
               [] 
            ))  
            setEvents(mappedEvents)
        }
    },[PatientAppointmentDetails]) 
        
      //This function is used for handling RescheduleAppointment   
      const handleRescheduleAppointment = (Id) => {
        navigate(`/FormPage/${info.DoctorId}/${Id}`)
      } 
    
      //This function is used for handling the Individual Patient Appointment detail of user clicked.
      const handleEventClick = (info) => {
        setOpen(true)
        const filteredappointmentdetail = PatientAppointmentDetails.find((patient) => patient.Id == info.event.extendedProps.Id)
        setinfo(filteredappointmentdetail)
      }

      //This function is used for handling the cancel popup visibility
      const handleCancelAppointmentPopup = () => {
          setcancelAppointment(true)
      }

      //This function is used for handling the cancel function where removepatientappointmentdeatails in zustand storage will delete
      //the specific data
      const handleCancelAppointment = (Id) => {
          RemovePatientsAppointmentDetails(Id)
          setcancelAppointment(false)
          setOpen(false)

      }


  return (
    <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} exit={{opacity : 0}} transition={{duration : 2}} style={{ maxWidth: '1000px', margin: 'auto', padding: '2rem' }}>
      <Typography variant='h6' textAlign={'center'} fontWeight={'bold'}>Upcoming Appointment Details</Typography>
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      events={events}
      eventClick={handleEventClick}
      eventDidMount={(info) => {
        info.el.style.cursor = 'pointer';
      }}
      selectable={true}
      editable={false}
      height={500}
    />
    {info.length != [] &&
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: {xs : 350,md : 800},height : {xs : 350,md : 550},
                  bgcolor: 'background.paper',border: '1px solid #3A0069',boxShadow: 24,p: 4,borderRadius : '10px'}}>
          {/* <Button variant='outlined'  sx={{float : 'right',border : '1px solid #3A0069',bgcolor : ' #3A0069',color : 'white'}} onClick={DownloadReceipt}>Download Receipt</Button> */}
          <Typography id="modal-modal-title"  fontWeight={'bold'}  textAlign={'center'} sx={{fontSize : {xs : 20,md : 25}}} paddingTop={{md : 1}}>
          Your Appointment with <span style={{color : 'rgb(135, 64, 194)'}}>Dr.{info.title}</span>
          </Typography>
          <Box width={{xs : '100%',md : '70%'}} borderRadius={2} border={{md : '1px solid  #3A0069'}} mx={{xs : 0,md : 20}} my={{xs : 1,md : 2}} >
          <Typography sx={{fontSize : {xs : 17,md : 23}}}  py={{xs : 1,md : 2}} px={{xs : 0,md : 2}} ><span style={{fontWeight : 'bold'}}>Doctor Name : </span>{info.title}</Typography>
          <Typography sx={{fontSize : {xs : 17,md : 23}}}  py={{xs : 1,md : 2}} px={{xs : 0,md : 2}} ><span style={{fontWeight : 'bold'}}>Date & Time: </span>{new Date(info?.StartDateTime).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true,
                                    }).replace(',', ' –')}</Typography>
          <Typography sx={{fontSize : {xs : 17,md : 23}}}  py={{xs : 1,md : 2}} px={{xs : 0,md : 2}} ><span style={{fontWeight : 'bold'}}>Location / Clinic:</span> Zyra Hospital,Room 204</Typography>
          <Typography sx={{fontSize : {xs : 17,md : 23}}}  py={{xs : 1,md : 2}} px={{xs : 0,md : 2}} ><span style={{fontWeight : 'bold'}}>Patient Name:</span> {info.PatientName}</Typography>
          <Typography sx={{fontSize : {xs : 17,md : 23}}}  py={{xs : 1,md : 2}} px={{xs : 0,md : 2}} ><span style={{fontWeight : 'bold'}}>Appointment Type:</span> InPerson</Typography>
          <Typography sx={{fontSize : {xs : 17,md : 23}}}  py={{xs : 1,md : 2}} px={{xs : 0,md : 2}} ><span style={{fontWeight : 'bold'}}>Status:</span> {info.status}</Typography>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} py={{xs : 0,md :2}} px={{md : 4}}>
          <Button variant='outlined' sx={{border : '1px solid #3A0069',bgcolor : ' #3A0069',color : 'white',fontSize: {xs : 10,md : 15},
          py : {xs : 0,md : 1},px:{xs :2},mx:{xs : 2}}} onClick={handleCancelAppointmentPopup}>Cancel the Appointment</Button>
          <Button variant='outlined' sx={{fontSize: {xs : 10,md : 15},py : {xs : 0,md : 1},px:{xs :2},mx:{xs : 2}}} onClick={() => handleRescheduleAppointment(info.Id)}>Reschedule the Appointment</Button>
          {/* <Button variant='outlined' sx={{border : '1px solid rgb(15, 114, 226)',bgcolor : ' rgb(15, 114, 226)',color : 'white',fontSize: {xs : 10,md : 15},py : {xs : 0,md : 1},px:{xs :2},mx:{xs : 2}}}>Chat with Doctor</Button> */}
          </Box>
        </Box>
        
      </Modal>}
      <Modal
      open={cancelAppointment}
      onClose={() => setcancelAppointment(false)}
      >
        <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width : {xs : 150,md : 500},height : {xs : 150,md : 150},
                  bgcolor: 'background.paper',border: '1px solid #3A0069',boxShadow: 24,p: 4,borderRadius : '10px'}}>
            <Typography sx={{fontSize : {xs : 17,md : 22}}} textAlign={'center'} fontWeight={'bold'} py={3}>Are you sure you want to Cancel the Appointment</Typography>
            <Box display={'flex'} justifyContent={'space-evenly'}>
            <Button variant='outlined' sx={{fontSize : {xs : 12,md : 17}}} onClick={() => setcancelAppointment(false)}>No</Button>
            <Button variant='outlined' sx={{fontSize : {xs : 12,md : 17}}} onClick={() => handleCancelAppointment(info.Id)}>Yes</Button>
            </Box>
        </Box>
      </Modal>
  </motion.div>
  )
}

export default CalendarSchedule