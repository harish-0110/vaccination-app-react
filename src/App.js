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
import AddCenter from './Component/superAdmin/AddCenter';
import AddVaccine from './Component/superAdmin/AddVaccine';
import UpdateCenter from './Component/superAdmin/updateCenter';
import UpdateVaccine from './Component/superAdmin/updateVaccine';
import AdminLayout from './Component/admin/AdminLayout';
import CreateSlot from './Component/admin/CreateSlot';
import ManageAppointments from './Component/admin/ManageAppoitments';
import ManageCenter from './Component/admin/ManageCenter';
import ManageVaccines from './Component/admin/ManageVaccine';
import AdminHome from './Component/admin/AdminHome';
import AdminLogin from './Component/admin/AdminLogin';
import ViewVaccine from './Component/admin/ViewVaccine';
import EditSlot from './Component/admin/EditSlot';
import AddSlot from './Component/admin/AddSlot';
import SideEffect from './Component/admin/SideEffects';

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
          <Route path='addCenter' element={<AddCenter/>}/>
          <Route path='addVaccine' element={<AddVaccine/>}/>
          <Route path='updateCenter/:centerId' element={<UpdateCenter/>}/>
          <Route path='updateVaccine/:vaccineId' element={<UpdateVaccine/>}/>


          
        </Route>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/:email/*' element={<AdminLayout/>}>
          <Route index element={<ManageCenter/>}/>
          <Route path='manageVaccines' element={<ManageVaccines/>}/>
          <Route path='manageSlots' element={<CreateSlot/>}/>
          <Route path='manageAppointments' element={<ManageAppointments/>}/>
          <Route path='sideEffects' element={<SideEffect/>}/>
          <Route path='addSlot' element={<CreateSlot/>}/>
          <Route path='profile' element={<AdminHome/>}/>
          <Route path='viewVaccine' element={<ViewVaccine/>}/>
          <Route path='editSlot/:id' element={<EditSlot/>}/>
          <Route path='newSlot' element={<AddSlot/>}/>
        </Route>
      </Routes>
    </Router>
    <ToastContainer />
    </>
    
  );
}

export default App;
