import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientLogin from './Component/patient/PatientLogin';
import PatientLayout from './Component/patient/PatientLayout';
import MyAppointment from './Component/patient/MyAppointments';
import ViewCenter from './Component/patient/ViewCenter';
import PatientHome from './Component/patient/PatientHome';
import BookSlots from './Component/patient/BookSlots';
import SuperAdminLogin from './Component/superAdmin/SuperAdminLogin';
import SuperAdminLayout from './Component/superAdmin/SuperAdminLayout';
import CreateCenter from './Component/superAdmin/CreateCenter';
import CreateVaccine from './Component/superAdmin/CreateVaccine';
import CreateAdmin from './Component/superAdmin/CreateAdmin';
import SuperAdminProfile from './Component/superAdmin/SuperAdminProfile';
import AddAdmin from './Component/superAdmin/AddAdmin';
import { ToastContainer } from 'react-toastify';
import UpdateAdmin from './Component/superAdmin/UpdateAdmin';

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
        <Route path='/superAdmin/login' element={<SuperAdminLogin/>}/>
        <Route path='/superAdmin/:email/*' element={<SuperAdminLayout/>}>
          <Route index element={<CreateCenter/>}/>
          <Route path='createVaccine' element={<CreateVaccine/>}/>
          <Route path='createAdmin' element={<CreateAdmin/>}/>
          <Route path='updateAdmin/:adminId' element={<UpdateAdmin/>}/>
          <Route path='addAdmin' element={<AddAdmin/>}/>
          <Route path='profile' element={<SuperAdminProfile/>}/>
        </Route>
      </Routes>
    </Router>
    <ToastContainer />
    </>
    
  );
}

export default App;
