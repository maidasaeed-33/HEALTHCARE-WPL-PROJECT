import React, { useState } from 'react';
import './Styling/medicine.css';
import NavBar from './Navbar';
import Footer from './footer';


const medicines = [
  { id: 1, name: 'Femicon Eye Drops 5Ml', price: 134.81, category: 'eye, ear, nose', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FProductsImages%2F12463.jpg&w=1920&q=50ia.placeholder.com/300' },
  { id: 2, name: 'Dexatob Ear Drops 5Ml', price: 199.50, category: 'eye, ear, nose', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwMg4D5bntKdolZ7VZbUcfx8tBJ64LMa_Lpw&s' },
  { id: 3, name: 'Hivate Nasal Spray 50Mcg', price: 122, category: 'eye, ear, nose', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2Fdvago-products-images%2Fhivate-nasal-spray-120-1s.webp&w=1920&q=50' },
  { id: 4, name: 'Systane Eye Drops 10Ml', price: 529, category: 'eye, ear, nose', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FProductsImages%2F10236.jpg&w=320&q=50' },
  { id: 5, name: 'Novidat Tablets 500Mg', price: 1220, category: 'circulatory system', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FProductsImages%2F212%2F05787.webp&w=320&q=50' },
  { id: 6, name: 'Myfortic Tablets 360Mg ', price: 3320, category: 'circulatory system', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2Fdvago-products-images%2Fmyfortic-360-mg-120-tablets.webp&w=320&q=50' },
  { id: 7, name: 'Hydrozole Cream 20G ', price: 540, category: 'circulatory system', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FProductsImages%2F565%2F02486.webp&w=320&q=50' },
  { id: 8, name: 'Lophos Tablets 667Mg', price: 322, category: 'circulatory system', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd0LrYJeAfcKjqjijNxolgKp7TXG-ICy45qw&s' },
  { id: 9, name: 'Methycobal Tablets 500Mcg ', price: 271.50, category: 'circulatory system', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2Fdvago-products-images%2Fmethycobal-tablets-100s.webp&w=320&q=50' },
  { id: 10, name: 'Panadol Extra Tablets (1 Strip = 10 Tablets)', price: 38, category: 'others', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FProductsImages%2F02557.webp&w=1920&q=50' },
  { id: 11, name: 'Softin Tablets 10Mg (1 Box = 10 Tablets)', price: 125, category: 'others', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FProductsImages%2F11179.jpg&w=320&q=50' },
  { id: 12, name: 'Augmentin Tablets 625Mg (1 Box = 1 Strip)', price: 318, category: 'others', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FProductsImages%2F565%2F14787.webp&w=320&q=50' },
  { id: 13, name: 'Caflam Tablets 50Mg', price: 218.67, category: 'others', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FProductsImages%2F05678.jpg&w=320&q=50' },
  { id: 14, name: 'Enterogermina Oral Suspension 2Billion/5Ml', price: 110, category: 'digestive system', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FProductsImages%2F212%2F07503.webp&w=320&q=50' },
  { id: 15, name: 'Risek Insta Sugar Free Sachets 20Mg ', price: 357, category: 'digestive system', image: 'https://dwatson.pk/media/catalog/product/cache/05d0b9b316ef5704ebda3486c0293fcb/R/i/Risek_insta_40mg_sachet.webp' },
  { id: 16, name: 'Plasil With Enzyme Tablets', price: 35, category: 'digestive system', image: 'https://media.naheed.pk/catalog/product/cache/fd6f1e57839b9b324771e8de21428b3f/p/i/piu1013392-1.jpg' },
  { id: 17, name: 'Skin A Cream 10G', price: 18, category: 'skin care', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FProductsImages%2F565%2F03556.webp&w=320&q=50' },
  { id: 18, name: 'Skin Aqua Clear White Spf-50 Cream 25G', price: 422, category: 'skin care', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FProductsImages%2F15718.jpg&w=320&q=50' },
  { id: 19, name: 'Derma E Anti-Wrinkle Eye Cream', price: 640, category: 'skin care', image: 'https://cdn.cosmostore.org/cache/front/shop/products/204/552674/350x350.jpg' },
  { id: 20, name: 'Acta White Cleanser Skin Brightening Face Wash 50Ml', price: 640, category: 'skin care', image: 'https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2Fdvago-products-images%2Facta-white-face-wash-1s.webp&w=320&q=50' },
];

const MedicineDelivery = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedMedicine(null); 
  };

  const handleOrderNow = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} of ${selectedMedicine.name} to cart`);
    setSelectedMedicine(null); 
    setQuantity(1); 
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
              <option value="others">Others</option>
              <option value="digestive system">Digestive System</option>
              <option value="skin care">Skin Care</option>
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
    </>
  );
};

export default MedicineDelivery;
