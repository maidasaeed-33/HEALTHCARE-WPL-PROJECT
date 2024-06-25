
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from './redux/cartReducer';
import NavBar from './Navbar';
import Footer from './footer';
import './Styling/cart.css';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        country: '',
        city: '',
    });

    const handleChange = (e) => {
        setCustomerDetails({
            ...customerDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderDetails = {
            customer_name: customerDetails.name,
            phone_number: customerDetails.phoneNumber,
            email: customerDetails.email,
            address: customerDetails.address,
            country: customerDetails.country,
            city: customerDetails.city,
            items: cartItems,
            total_price: getTotalPrice(),
        };

        try {
            const response = await fetch('http://localhost:3001/orders/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            if (response.ok) {
                dispatch(clearCart());
                alert('Order placed successfully!');
                navigate('/');
            } else {
                alert('Error placing order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order. Please try again.');
        }
    };


    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        dispatch(updateQuantity({ itemId, quantity: Math.max(1, newQuantity) }));
    };

    const calculateItemTotal = (price, quantity) => {
        return price * quantity;
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <>
            <NavBar />
            <div className="page-container2">
                <div className="content-wrap2">
                    <div className="cart">
                        <h1>Your Cart</h1>
                        {cartItems.length === 0 ? (
                            <p className='emptycart'>Your cart is empty.</p>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <img src={item.image} alt={item.name} className="cart-item-image" />
                                            <div className="cart-item-details">
                                                <h2>{item.name}</h2>
                                                <p>Price: Rs&nbsp;{item.price}</p>
                                                <div className="quantity-controls">
                                                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                                </div>
                                                <p>Total: Rs&nbsp;{calculateItemTotal(item.price, item.quantity)}</p>
                                                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total">
                                    <h2>Total Price: Rs&nbsp;{getTotalPrice()}</h2>
                                </div>
                                <div className="customer-form">
                                    <h2>Customer Details</h2>
                                    <form onSubmit={handleSubmit} className="form-grid">
                                        <div>
                                            <label htmlFor="name">Name:</label>
                                            <input type="text" id="name" name="name" value={customerDetails.name} onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="phoneNumber">Phone Number:</label>
                                            <input type="text" id="phoneNumber" name="phoneNumber" value={customerDetails.phoneNumber} onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="email">Email:</label>
                                            <input type="email" id="email" name="email" value={customerDetails.email} onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="address">Address:</label>
                                            <input type="text" id="address" name="address" value={customerDetails.address} onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="country">Country:</label>
                                            <input type="text" id="country" name="country" value={customerDetails.country} onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="city">City:</label>
                                            <input type="text" id="city" name="city" value={customerDetails.city} onChange={handleChange} required />
                                        </div>
                                        <button type="submit">Place Order</button>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Cart;