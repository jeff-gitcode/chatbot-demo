# Chatbot Demo - Full Stack AI Assistant

A modern full-stack chatbot application built with FastAPI backend using Ollama and the Qwen language model, paired with a React + TypeScript frontend. This project demonstrates how to create a professional AI-powered chat interface with local LLM inference.

![Chatbot Demo](./doc/chatbot-demo.gif)

## 🚀 Features

### Backend (FastAPI + Ollama)
- **FastAPI Backend**: High-performance async web framework
- **Ollama Integration**: Local LLM inference with Qwen model
- **CORS Support**: Ready for frontend integration
- **Error Handling**: Comprehensive error handling and HTTP status codes
- **Environment Configuration**: Flexible configuration via environment variables
- **API Documentation**: Auto-generated OpenAPI/Swagger documentation

### Frontend (React + TypeScript + Vite)
- **React 19**: Latest React version with modern hooks and features
- **TypeScript**: Full type safety and excellent developer experience
- **Vite**: Lightning-fast development server and build tool
- **Real-time Chat**: Interactive chat interface with message history
- **Local Persistence**: Chat history saved to localStorage
- **Professional UI**: Modern, responsive design with animations
- **Loading States**: Visual feedback during API calls

## 📁 Project Structure

```
chatbot-demo/
├── README.md                   # Main project documentation
├── .gitignore                  # Git ignore rules for full stack
├── doc/
│   └── chatbot-demo.gif       # Demo screenshot/video
├── chatbot-backend/            # FastAPI backend
│   ├── main.py                # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── test.http              # API test cases
│   ├── README.md              # Backend documentation
│   └── __pycache__/           # Python cache (ignored)
└── chatbot-frontend/           # React frontend
    ├── src/
    │   ├── App.tsx            # Main chat component
    │   ├── App.css            # Chat interface styles
    │   ├── main.tsx           # React app entry point
    │   └── index.css          # Global styles
    ├── public/
    │   └── vite.svg           # Vite logo
    ├── package.json           # Node.js dependencies
    ├── index.html             # HTML template
    ├── vite.config.ts         # Vite configuration
    ├── tsconfig.json          # TypeScript configuration
    └── README.md              # Frontend documentation
```

## 📋 Prerequisites

Before running this project, ensure you have:

- **Python 3.8+** installed
- **Node.js 18+** installed
- **npm or yarn** package manager
- **[Ollama](https://ollama.ai)** installed and running
- **Git** (for cloning the repository)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd chatbot-demo
```

### 2. Set Up Backend (FastAPI + Ollama)

```bash
# Navigate to backend directory
cd chatbot-backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Set Up Frontend (React + TypeScript)

```bash
# Navigate to frontend directory (from project root)
cd chatbot-frontend

# Install dependencies
npm install
# or
yarn install
```

### 4. Set Up Ollama

Install Ollama from [ollama.ai](https://ollama.ai) and pull the Qwen model:

```bash
# Start Ollama service
ollama serve

# In another terminal, pull the Qwen model
ollama pull qwen2.5
```

### 5. Environment Configuration (Optional)

Create a `.env` file in the `chatbot-backend/` directory:

```env
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5
```

## 🚀 Running the Application

### 1. Start the Backend Server

```bash
cd chatbot-backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will start at `http://localhost:8000`

### 2. Start the Frontend Server

In a new terminal:

```bash
cd chatbot-frontend
npm run dev
# or
yarn dev
```

The frontend will start at `http://localhost:5173`

### 3. Access the Application

- **Frontend**: Open `http://localhost:5173` in your browser
- **Backend API Docs**: Visit `http://localhost:8000/docs` for Swagger UI
- **Health Check**: Visit `http://localhost:8000/` for server status

## 🧪 Testing

### Backend API Testing

Use the provided HTTP test file:

1. Install the "REST Client" extension in VS Code
2. Open `chatbot-backend/test.http`
3. Click "Send Request" above any test case

Available test cases:
- Health check
- Basic conversation
- Technical questions
- Code generation requests
- Error handling (empty messages)
- Long message handling

### Frontend Testing

1. Open `http://localhost:5173`
2. Type messages in the chat interface
3. Verify message persistence by refreshing the page
4. Test responsive design on different screen sizes

## 📡 API Documentation

### Health Check Endpoint
```http
GET http://localhost:8000/
```

**Response:**
```json
{
  "status": "ok",
  "model": "qwen2.5",
  "ollama_url": "http://localhost:11434"
}
```

### Chat Endpoint
```http
POST http://localhost:8000/chat
Content-Type: application/json

{
  "user_message": "Your message here"
}
```

**Response:**
```json
{
  "bot_response": "AI response here"
}
```

## 🎨 Frontend Features

### Chat Interface
- **Professional Design**: Modern gradient background with card-based chat container
- **Message Bubbles**: Distinct styling for user, bot, and error messages
- **Animations**: Smooth message appearance with slide-in effects
- **Loading Indicators**: Animated dots while AI processes requests
- **Auto-scroll**: Automatically scrolls to latest messages
- **Empty State**: Welcoming message when chat is empty

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Support**: Enter key to send messages
- **Message Persistence**: Chat history saved across browser sessions
- **Clear Chat**: Option to clear conversation history
- **Input Validation**: Prevents sending empty messages
- **Error Handling**: User-friendly error messages

### Accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **Reduced Motion**: Respects user's motion preferences
- **Focus Management**: Clear focus indicators
- **Color Contrast**: High contrast for readability

## 🔧 Configuration

### Backend Configuration

Environment variables for the FastAPI backend:

| Variable | Default | Description |
|----------|---------|-------------|
| `OLLAMA_URL` | `http://localhost:11434` | Ollama server URL |
| `OLLAMA_MODEL` | `qwen2.5` | Ollama model name |

### Frontend Configuration

The frontend communicates with the backend at `http://localhost:8000`. To change this, modify the fetch URL in `chatbot-frontend/src/App.tsx`:

```typescript
const response = await fetch('http://localhost:8000/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ user_message: userMessage.text }),
});
```

### CORS Configuration

The backend accepts requests from:
- `http://localhost:5173` (Vite React dev server)
- `http://localhost:3000` (Alternative React dev server)

## 🐛 Troubleshooting

### Common Issues

1. **Ollama service unavailable (503 error)**
   ```bash
   # Ensure Ollama is running
   ollama serve
   
   # Check if the model exists
   ollama list
   ```

2. **Model not found**
   ```bash
   # Pull the required model
   ollama pull qwen2.5
   ```

3. **Backend port conflicts**
   ```bash
   # Change the port
   uvicorn main:app --port 8001
   ```

4. **Frontend build errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **CORS errors from frontend**
   - Verify backend CORS origins include your frontend URL
   - Check browser console for specific CORS errors

### Debug Mode

Enable debug logging for the backend:

```bash
uvicorn main:app --reload --log-level debug
```

## 🚀 Deployment

### Production Build

1. **Backend**: Remove debug flags and set production environment variables
2. **Frontend**: Build optimized static files
   ```bash
   cd chatbot-frontend
   npm run build
   ```

### Deployment Options

- **Backend**: Deploy to cloud services (AWS, Azure, GCP) with Docker
- **Frontend**: Deploy to static hosting (Netlify, Vercel, GitHub Pages)
- **Full Stack**: Use container orchestration (Docker Compose, Kubernetes)

### Docker Support

Create `Dockerfile` for backend:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes in both backend and frontend as needed
4. Test thoroughly:
   - Backend: Use `test.http` file
   - Frontend: Test in browser with various scenarios
5. Run linting:
   - Backend: `flake8` or `black`
   - Frontend: `npm run lint`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **[FastAPI](https://fastapi.tiangolo.com/)** for the excellent web framework
- **[Ollama](https://ollama.ai)** for local LLM inference
- **[Qwen](https://github.com/QwenLM/Qwen)** for the language model
- **[React](https://reactjs.org/)** for the frontend framework
- **[Vite](https://vitejs.dev/)** for the build tool
- **[TypeScript](https://www.typescriptlang.org/)** for type safety

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Ollama Documentation](https://ollama.ai/docs)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Happy Coding! 🎉**