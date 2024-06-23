import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';
import './Styling/DoctorList.css';
import Image1 from './Assets/Doctors/1.jpeg';
import Image2 from './Assets/Doctors/2.jpeg';
import Image3 from './Assets/Doctors/3.jpeg';
import Image4 from './Assets/Doctors/4.jpeg';
import Image5 from './Assets/Doctors/5.jpeg';
import Image6 from './Assets/Doctors/6.jpeg';
import Image7 from './Assets/Doctors/7.jpeg';
import Image8 from './Assets/Doctors/8.jpeg';
import Footer from './footer';
const doctors = [
    {
      id: 1,
      name: 'Dr. John Doe',
      specialty: 'Neurologist',
      image: Image1,
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      specialty: 'Dermatologist',
      image: Image2,
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      specialty: 'Dermatologist',
      image: Image3,
    },
    {
      id: 4,
      name: 'Dr. Michael Thompson',
      specialty: 'Cardiologist',
      image: Image4,
    },
    {
      id: 5,
      name: 'Dr. Sarah Wilson',
      specialty: 'Pediatrician',
      image: Image5,
    },
    {
      id: 6,
      name: 'Dr. David Lee',
      specialty: 'Orthopedist',
      image: Image6,
    },
    {
      id: 7,
      name: 'Dr. Emily Davis',
      specialty: 'Gynecologist',
      image: Image7,
    },
    {
      id: 8,
      name: 'Dr. James Smith',
      specialty: 'Oncologist',
      image: Image8,
    },
  ];
  
  const DoctorList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesCategory = selectedCategory === 'All' || doctor.specialty === selectedCategory;
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <NavBar />
      <div className="filter-container">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All Specialties</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Orthopedist">Orthopedist</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Oncologist">Oncologist</option>
        </select>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="doctor-list">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.image} alt={doctor.name} />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            <Link
              to={{
                pathname: `/appoint/${doctor.id}`,
                state: { doctorName: doctor.name, doctorSpecialty: doctor.specialty }
              }}
              className="appoint-button"
            >
              Appoint Me
            </Link>
          </div>
        ))}
      </div>
      <Footer/>
    </>
  );
};

export default DoctorList;