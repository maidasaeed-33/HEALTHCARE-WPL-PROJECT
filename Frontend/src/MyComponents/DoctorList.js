import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';
import './Styling/DoctorList.css';
import Footer from './footer';

const spaceId = 'aqxvxbaxg42i';
const accessToken = 'thagZQi0iG4XD1IKrCvF9tzUi96042JHoG1ohhBEBCE';

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

      <div className="pagedoctors-container">
        <div className="content-wrap">
          <div className="filter-container">

            <h1 className='doctor-h1' >Doctors appointments</h1>

            <label className="search-label-doctors" htmlFor="selectedCategory">Select Category: </label>
            <select className='select-doctors' id='selectedCategory' value={selectedCategory} onChange={handleCategoryChange}>
              <option value="All">All Specialties</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Orthopedist">Orthopedist</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Oncologist">Oncologist</option>
            </select>
            <label htmlFor="search" className="search-label-doctors">Search Doctors: </label>
            <input
              id='search'
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input-doctors"
            />

          </div >
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
                  const doctorId = doctor.fields.id;

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
                        to={`/appoint/${doctorId}?name=${encodeURIComponent(doctor.fields.name)}&specialty=${encodeURIComponent(doctor.fields.specialty)}`}
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
        </div >
      </div >
    </>
  );
};

export default DoctorList;