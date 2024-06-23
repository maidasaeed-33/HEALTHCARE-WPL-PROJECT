import React, { useState, useEffect, useRef } from 'react';
import NavBar from './Navbar';
import './Styling/chatbot.css';
import Footer from './footer';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [botTyping, setBotTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input, language: 'urdu' }; // Add language property
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: input }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setIsTyping(false);
            setBotTyping(true);
            simulateTyping(data.answer);
        } catch (error) {
            setIsTyping(false);
            setBotTyping(false);
            console.error('Failed to fetch:', error);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const simulateTyping = (text) => {
        let index = 0;
        const botMessage = { sender: 'bot', text: '', language: 'urdu' }; // Add language property

        const interval = setInterval(() => {
            if (index < text.length) {
                botMessage.text += text[index];
                setMessages((prevMessages) => {
                    const newMessages = [...prevMessages];
                    if (newMessages[newMessages.length - 1]?.sender === 'bot') {
                        newMessages[newMessages.length - 1] = botMessage;
                    } else {
                        newMessages.push(botMessage);
                    }
                    return newMessages;
                });
                index++;
            } else {
                setBotTyping(false);
                clearInterval(interval);
            }
        }, 12); // Increase typing speed
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, botTyping]);

    return (
        <>
            <div className='chatbot_body'>
                <NavBar />
                <div className="chatbot-container">
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender} ${msg.language === 'urdu' ? 'urdu-text' : ''}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="typing-indicator">
                                <div className="typing-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>

            </div>
            {/* <Footer /> */}
        </>
    );
};

export default Chatbot;