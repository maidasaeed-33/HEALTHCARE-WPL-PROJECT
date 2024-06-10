import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './MyComponents/About';
import MainHome from './MyComponents/Mainhome';
import Contact from './MyComponents/Contact';
import MedicineDelivery from './MyComponents/MedicineDelivery';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DoctorList from './MyComponents/DoctorList.js'
import AppointmentForm from './MyComponents/AppointmentForm.js'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/medicine" element={<MedicineDelivery />} />
        <Route path="/doctorappointment" element={<DoctorList />} />
        <Route path="/appoint/:doctorId" element={<AppointmentForm />} />
      </Routes>
    </>
  );
}

export default App;
