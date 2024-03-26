import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientLogin from './Component/patient/PatientLogin';
import PatientLayout from './Component/patient/PatientLayout';
import MyAppointment from './Component/patient/MyAppointments';
import ViewCenter from './Component/patient/ViewCenter';
import PatientHome from './Component/patient/PatientHome';
import BookSlots from './Component/patient/BookSlots';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/patient/login' element={<PatientLogin/>} />
        <Route path='/patient/:email/*' element={<PatientLayout/>}>
          <Route index element={<MyAppointment/>}/>
          <Route path='viewCenters' element={<ViewCenter/>}/>
          <Route path='profile' element={<PatientHome/>} />
          <Route path='viewCenter/:centerId' element={<BookSlots/>} />
        </Route>
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
