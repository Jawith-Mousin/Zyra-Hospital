import { create } from "zustand";
import { persist } from "zustand/middleware";

//Initalizing storage for storing doctor and patientappointmentdetails
const ZustandStorage = create(persist((set) => ({
    
PatientAppointmentDetailId : 34092,
doctorlist : [
{
    id : 109745,
    img : 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
    name : 'Alex',
    specialization : 'Cardiology',
    availability_status : 'Available from 9:00AM to 12:00PM',
    main_page : true,
    timeSlots : ['10:00','10:30','11:00','11:30','12:00','12:30']
},
{
    id : 129075,
    img : 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
    name : 'Yusuf',
    specialization : 'Neurologist',
    availability_status : 'Available from 10:00AM to 1:00PM',
    main_page : true,
    timeSlots : ['10:00','10:30','11:00','11:30','12:00','12:30']
},
{
    id : 134235,
    img : 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
    name : 'Mohamed',
    specialization : 'Psychiatrist',
    availability_status : 'On Leave',
    main_page : false,
    timeSlots : []
},
{
    id : 134615,
    img : 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
    name : 'Ashraf',
    specialization : 'Dermatologist',
    availability_status : 'Available from 10:00AM to 1:00PM',
    main_page : true,
    timeSlots : ['10:00','10:30','11:00','11:30','12:00','12:30']
}
],
doctorappointmentdetail : [],
doctorlistindividualdetail : [
    {
        name : 'Alex',
        details : [
            "Dr. Alex is a highly dedicated cardiologist with a deep passion for heart health and preventive care. With a strong foundation in cardiovascular medicine, Alex has built a reputation for diagnosing and managing heart-related conditions with precision and empathy. Whether it’s guiding patients through lifestyle changes or providing advanced treatment plans", 
            "Dr. Alex ensures that every patient receives personalized attention tailored to their unique needs. Committed to staying at the forefront of cardiac innovations, Alex combines medical expertise with a compassionate approach to help patients lead healthier, longer lives."
        ] 
        
    },
    {
        name : 'Yusuf',
        details : [
                "Dr. Yusuf is an experienced neurologist known for his calm demeanor, analytical thinking, and in-depth knowledge of neurological disorders. He specializes in diagnosing and treating conditions related to the brain, spinal cord, and nervous system, including migraines, epilepsy, and movement disorders.", 
                "Dr. Yusuf believes in building trust through clear communication and ensuring patients feel understood and supported throughout their treatment journey. His commitment to patient care, combined with a keen interest in medical research, allows him to provide cutting-edge neurological solutions rooted in empathy and clinical excellence."
            ] 
        
    },
    {
        name : 'Mohamed',
        details : [
            "Dr. Mohamed is a compassionate and insightful psychiatrist who is deeply committed to promoting mental health and emotional well-being. With expertise in managing a wide range of psychiatric conditions—from anxiety and depression to complex personality and mood disorders",
            "Dr. Mohamed brings a warm and supportive presence to each consultation. He believes that healing begins with listening and strives to create a safe space where patients can openly discuss their challenges. By combining evidence-based treatments with genuine human connection, Dr. Mohamed empowers individuals to reclaim control over their mental health and thrive in their daily lives."
        ]
       
    },
    {
        name : 'Ashraf',
        details : [
            "Dr. Ashraf is a skilled dermatologist with a deep understanding of skin health, cosmetic treatments, and chronic skin conditions. Known for his gentle approach and attention to detail, Dr. Ashraf specializes in treating acne, eczema, psoriasis, and hair-related disorders.",
            "With years of experience and a passion for both medical and aesthetic dermatology, he empowers patients with personalized skincare plans and evidence-based treatments. Whether it’s managing sensitive skin conditions or guiding patients through anti-aging therapies, Dr. Ashraf ensures comfort, clarity, and results in every consultation."
        ]
    }
],
PatientAppointmentDetails : [],

AddPatientsAppointmentDetails : (PatientDetail) => set((state) => ({
    PatientAppointmentDetails : [...state.PatientAppointmentDetails,PatientDetail]
    
})),
AddPatientsAppointmentDetailsId: () =>
    set((state) => ({
      PatientAppointmentDetailId: state.PatientAppointmentDetailId + 1
})),
RemovePatientsAppointmentDetails : (PatientId) => set((state) => ({
    PatientAppointmentDetails : state.PatientAppointmentDetails.filter((patient) => patient.Id != PatientId)
})),
ReschedulePatientAppointmentDetails : (PatientId,AppointmentDate,TimeSlot,startTime,endDateTime) => set((state) => ({
  PatientAppointmentDetails : state.PatientAppointmentDetails.map((patient) => (
    patient.Id == PatientId ? {...patient,AppointmentDate : AppointmentDate,TimeSlot : TimeSlot,
        StartDateTime : startTime,EndDateTime : endDateTime} : patient
  ))  
}))

}),
{
    name : 'localstorage-doctor-appointment-details'
}

))

export default ZustandStorage