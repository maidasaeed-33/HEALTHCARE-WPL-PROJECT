import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';
import './Styling/DoctorList.css';
import Footer from './footer';

const spaceId = 'yorSpaceID';
const accessToken = 'YOurTokenKEy';

async function getDoctors() {
  const res = await fetch(`https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}&content_type=doctors`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [assets, setAssets] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getDoctors()
      .then(data => {
        console.log('Fetched data:', data);
        if (data && data.items && data.includes && data.includes.Asset) {
          setDoctors(data.items);

          const assetMap = {};
          data.includes.Asset.forEach(asset => {
            assetMap[asset.sys.id] = asset.fields.file.url;
          });
          setAssets(assetMap);
        } else {
          setError('Unexpected data structure');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
        setError('Failed to fetch doctors');
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesCategory = selectedCategory === 'All' || doctor.fields.specialty === selectedCategory;
    const matchesSearch = doctor.fields.name.toLowerCase().includes(searchTerm.toLowerCase());
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
      <div className="doctor-list-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : (
          <div className="doctor-list">
            {filteredDoctors.map((doctor) => {
              const imageId = doctor.fields.image && doctor.fields.image.sys && doctor.fields.image.sys.id;
              const imageUrl = imageId && assets[imageId];
              console.log('Doctor:', doctor.fields.name, 'Image ID:', imageId, 'Image URL:', imageUrl);

              return (
                <div key={doctor.sys.id} className="doctor-card">
                  {imageUrl ? (
                    <img src={imageUrl} alt={doctor.fields.name} />
                  ) : (
                    <div>No image available</div>
                  )}
                  <h3>{doctor.fields.name}</h3>
                  <p>{doctor.fields.specialty}</p>
                  <Link
                    to={`/appoint/${doctor.sys.id}?name=${encodeURIComponent(doctor.fields.name)}&specialty=${encodeURIComponent(doctor.fields.specialty)}`}
                    className="appoint-button"
                  >
                    Appoint Me
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DoctorList;