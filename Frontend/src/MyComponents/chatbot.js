import React, { useState, useEffect, useRef } from 'react';
import NavBar from './Navbar';
import './Styling/chatbot.css';
import medicalIcon from './Assets/logo2.png';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [botTyping, setBotTyping] = useState(false);
    const chatbotMessagesRef = useRef(null);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMessage = { sender: 'user', text: input, time: currentTime };
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

    const simulateTyping = (text) => {
        let index = 0;
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const botMessage = { sender: 'bot', text: '', time: currentTime };

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
                scrollChatToBottom();
            }
        }, 5);
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const scrollChatToBottom = () => {
        if (chatbotMessagesRef.current) {
            chatbotMessagesRef.current.scrollTop = chatbotMessagesRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollChatToBottom();
    }, [messages]);

    const getInitials = (name) => {
        return name.split(' ').map(word => word[0].toUpperCase()).join('');
    };

    const stringToColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    };

    return (
        <>
            <div className='chatbotbody'>
                <div className='chatbot_body'>
                    <NavBar />
                    <div className="chatbot-container">
                        <div className="chatbot-header">
                            <img src={medicalIcon} alt="Medical Icon" className="medical-icon" />
                            <h1>Pak+ Medical Chatbot</h1>
                        </div>
                        <div className="chatbot-messages" ref={chatbotMessagesRef}>
                            {messages.map((msg, index) => (
                                <div key={index} className={`message-container ${msg.sender}`}>
                                    <div
                                        className="avatar"
                                        style={{ backgroundColor: stringToColor(msg.sender === 'user' ? 'You' : 'Pak+ Chatbot') }}
                                    >
                                        {getInitials(msg.sender === 'user' ? 'You' : 'PC')}
                                    </div>
                                    <div className="message-content">
                                        <div className={`message ${msg.sender}`}>
                                            {msg.text.split('\n').map((line, i) => (
                                                <React.Fragment key={i}>
                                                    {line}
                                                    {i < msg.text.split('\n').length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <div className="message-time">{msg.time}</div>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="typing-indicator">
                                    <div className="typing-dots">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            )}
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
            </div>
        </>
    );
};

export default Chatbot;