import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './aiagent.css';
import { useNavigate } from 'react-router-dom';

function AiAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);
    setError('');

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('http://localhost:5000/api/flight-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userRequest: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get suggestions');
      }

      if (!data.suggestions) {
        throw new Error('No suggestions were returned from the server');
      }

      // Add AI response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: data.suggestions }]);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AiAgent">
      <header className="AiAgent-header">
        <div className="header-content">
          <h1>Flight Booking AI Assistant</h1>
        </div>
      </header>
      <main className="AiAgent-main">
        <div className="chat-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.role === 'user' ? (
                <div className="message-content user-message">
                  <strong>You:</strong> {message.content}
                </div>
              ) : (
                <div className="message-content assistant-message">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <div className="message-content assistant-message">
                <div className="loading-dots">
                  Getting recommendations
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="error">
              <h3>Error</h3>
              <p>{error}</p>
              <p>Please check if the server is running and try again.</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-container">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your travel request (e.g., 'I want to fly from Delhi to Mumbai next month')"
              required
              rows={3}
            />
            <button type="submit" disabled={loading} className="send-button">
              <span className="material-icons">send</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AiAgent;