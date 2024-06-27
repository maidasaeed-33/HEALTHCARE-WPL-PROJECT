import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/cartReducer';
import './Styling/medicine.css';
import NavBar from './Navbar';
import Footer from './footer';

const spaceId = 'YourSpcaeID2i';
const accessToken = 'YourAPiKey';

async function getMedicines() {
  const res = await fetch(`https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}&content_type=medicines`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const MedicineDelivery = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    getMedicines()
      .then(data => {
        console.log('Fetched data:', data);
        if (data && data.items && data.includes && data.includes.Asset) {
          setMedicines(data.items.map(item => ({
            id: item.sys.id,
            ...item.fields,
            image: data.includes.Asset.find(asset => asset.sys.id === item.fields.image.sys.id)?.fields.file.url
          })));
        } else {
          setError('Unexpected data structure');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching medicines:', error);
        setError('Failed to fetch medicines');
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedMedicine(null);
  };

  const handleOrderNow = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...selectedMedicine, quantity: parseInt(quantity) }));
    setNotificationMessage(`${selectedMedicine.name} has been added to your cart.`);
    setShowNotification(true);
    setSelectedMedicine(null);
    setQuantity(1);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const closeFullScreenCard = () => {
    setSelectedMedicine(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMedicines = medicines.filter((med) => {
    return (
      (selectedCategory === '' || med.category === selectedCategory) &&
      med.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <NavBar />
      <div className="page-container">
        <div className="content-wrap">
          <div className="medicine-delivery">
            <h1>Medicine Delivery</h1>

            <label htmlFor="category">Select Category: </label>
            <select id="category" onChange={handleCategoryChange} value={selectedCategory}>
              <option value="">All</option>
              <option value="eye, ear, nose">Eye, Ear, Nose</option>
              <option value="circulatory system">Circulatory System</option>
              <option value="digestive system">Digestive System</option>
              <option value="skin care">Skin Care</option>
              <option value="others">Others</option>
            </select>

            <label htmlFor="search" className="search-label">Search Medicine: </label>
            <input
              type="text"
              id="search"
              placeholder="Enter medicine name"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />

            <div className="medicine-list-container">
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
              ) : error ? (
                <div className="error-message">Error: {error}</div>
              ) : (
                <div className="medicine-cards">
                  {filteredMedicines.map((medicine) => (
                    <div key={medicine.id} className="medicine-card">
                      <img src={medicine.image} alt={medicine.name} className="medicine-image" />
                      <h2>{medicine.name}</h2>
                      <p>Price: Rs&nbsp;{medicine.price}</p>
                      <button onClick={() => handleOrderNow(medicine)}>Order Now</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedMedicine && (
              <div className="selected-medicine-card">
                <div className="selected-medicine-content">
                  <button className="close-button" onClick={closeFullScreenCard}>X</button>
                  <img src={selectedMedicine.image} alt={selectedMedicine.name} className="selected-medicine-image" />
                  <h2>{selectedMedicine.name}</h2>
                  <p>Price: Rs&nbsp;{selectedMedicine.price}</p>
                  <label htmlFor="quantity">Quantity: </label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <p><button onClick={handleAddToCart}>Add to Cart</button></p>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>

      {showNotification && (
        <div className="notification">
          <p>{notificationMessage}</p>
        </div>
      )}
    </>
  );
};

export default MedicineDelivery;