import { Routes,Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import DoctorListPage from './Pages/DoctorListPage'
import BottomHeader from './Components/BottomHeader'
import FormPage from './Pages/FormPage'
import Header from './Components/Header'
import CalendarSchedule from './Pages/CalendarSchedule'
import InfoPage from './Pages/InfoPage'

function App() {
  

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/Formpage/:id/*' element={<FormPage/>}/>
      <Route path='/calendarschedule' element={<CalendarSchedule/>}/>
      <Route path='/doctorlistpage' element={<DoctorListPage/>}/>
      <Route path='/Info' element={<InfoPage/>}/>
    </Routes>
    <BottomHeader/>  
    </>
  )
}

export default App
