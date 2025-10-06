import { useState, useEffect, useRef } from 'react'
import './App.css'

// Define the message type interface
interface ChatMessage {
  type: 'user' | 'bot' | 'error';
  text: string;
  timestamp: Date;
}

function App() {
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Effect to load chat history from local storage when the app starts
  useEffect(() => {
    const storedChatLog = localStorage.getItem('chatLog');
    if (storedChatLog) {
      try {
        const parsedLog = JSON.parse(storedChatLog);
        // Convert timestamp strings back to Date objects
        const logWithDates = parsedLog.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setChatLog(logWithDates);
      } catch (error) {
        console.error('Error parsing stored chat log:', error);
      }
    }
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatLog, loading]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userInput.trim() || loading) return; // Don't send empty messages or while loading

    const userMessage: ChatMessage = {
      type: 'user',
      text: userInput.trim(),
      timestamp: new Date()
    };
    const newChatLog = [...chatLog, userMessage];
    setChatLog(newChatLog);
    setUserInput('');
    setLoading(true);

    try {
      // The API call to our FastAPI backend
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_message: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        type: 'bot',
        text: data.bot_response,
        timestamp: new Date()
      };

      // Update the chat log with the bot's response
      const finalChatLog = [...newChatLog, botMessage];
      setChatLog(finalChatLog);

      // Save the updated chat log to local storage for persistence
      localStorage.setItem('chatLog', JSON.stringify(finalChatLog));

    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage: ChatMessage = {
        type: 'error',
        text: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date()
      };
      setChatLog(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event as any);
    }
  };

  const clearChat = () => {
    setChatLog([]);
    localStorage.removeItem('chatLog');
  };

  return (
    <div className="App">
      <h1>AI Assistant</h1>

      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat with Qwen</h2>
          <p>Powered by Ollama • Ask me anything</p>
        </div>

        <div className="chat-window" ref={chatWindowRef}>
          {chatLog.length === 0 ? (
            <div className="empty-state">
              <h3>Welcome to AI Assistant</h3>
              <p>Start a conversation by typing a message below. I'm here to help with questions, explanations, coding, and more!</p>
            </div>
          ) : (
            chatLog.map((message, index) => (
              <div key={`${index}-${message.timestamp.getTime()}`} className={`message ${message.type}`}>
                {message.text}
              </div>
            ))
          )}

          {loading && (
            <div className="message bot loading">
              <span>AI is thinking</span>
              <div className="loading-dots">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="chat-form">
          <div className="input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              disabled={loading}
              maxLength={1000}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !userInput.trim()}
            className="send-button"
            aria-label="Send message"
          >
            {loading ? '...' : 'Send'}
          </button>
        </form>
      </div>

      {chatLog.length > 0 && (
        <button
          onClick={clearChat}
          className="clear-button"
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          Clear Chat
        </button>
      )}
    </div>
  );
}

export default App;
