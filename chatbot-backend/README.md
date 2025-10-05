# Chatbot Demo - FastAPI + Ollama + Qwen

A modern chatbot application built with FastAPI backend using Ollama and the Qwen language model. This project provides a RESTful API for chat interactions with proper CORS configuration for frontend integration.

## 🚀 Features

- **FastAPI Backend**: High-performance async web framework
- **Ollama Integration**: Local LLM inference with Qwen model
- **CORS Support**: Ready for React/Vue.js frontend integration
- **Error Handling**: Comprehensive error handling and HTTP status codes
- **Environment Configuration**: Flexible configuration via environment variables
- **API Documentation**: Auto-generated OpenAPI/Swagger documentation

## 📋 Prerequisites

Before running this project, make sure you have:

- Python 3.8+ installed
- [Ollama](https://ollama.ai) installed and running
- Git (for cloning the repository)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd rag/chatbot-demo
```

### 2. Set Up Python Environment

```bash
# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
cd chatbot-backend
pip install -r requirements.txt
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

### Start the Backend Server

```bash
cd chatbot-backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The server will start at `http://localhost:8000`

### Verify Installation

1. **Health Check**: Visit `http://localhost:8000/` in your browser
2. **API Documentation**: Visit `http://localhost:8000/docs` for Swagger UI
3. **Alternative Docs**: Visit `http://localhost:8000/redoc` for ReDoc

## 📡 API Endpoints

### Health Check
```http
GET /
```
Returns server status and configuration information.

### Chat
```http
POST /chat
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

## 🧪 Testing the API

Use the provided HTTP test file [`test.http`](test.http) with the REST Client extension in VS Code:

1. Install the "REST Client" extension in VS Code
2. Open [`test.http`](test.http)
3. Click "Send Request" above any test case

Available test cases:
- Health check
- Basic conversation
- Technical questions
- Code generation requests
- Error handling (empty messages)
- Long message handling

## 📁 Project Structure

```
chatbot-demo/
├── README.md
├── test.http                    # API test cases
└── chatbot-backend/
    ├── main.py                  # FastAPI application
    ├── requirements.txt         # Python dependencies
    └── __pycache__/            # Python cache files
```

## ⚙️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OLLAMA_URL` | `http://localhost:11434` | Ollama server URL |
| `OLLAMA_MODEL` | `qwen2.5` | Ollama model name |

### CORS Configuration

The application is configured to accept requests from:
- `http://localhost:5173` (Vite React dev server)
- `http://localhost:3000` (Create React App dev server)

To add more origins, modify the [`origins`](chatbot-backend/main.py) list in [`main.py`](chatbot-backend/main.py).

## 🔧 Development

### Dependencies

The project uses these main dependencies:

- **FastAPI**: Web framework for building APIs
- **Uvicorn**: ASGI web server for running FastAPI
- **Requests**: HTTP library for Ollama API calls
- **Python-dotenv**: Environment variable management
- **Python-multipart**: Form data parsing support

### Code Structure

- [`main.py`](chatbot-backend/main.py): Contains the FastAPI application with:
  - CORS middleware configuration
  - Pydantic models for request/response validation
  - Ollama API integration
  - Error handling and HTTP status codes

## 🐛 Troubleshooting

### Common Issues

1. **Ollama service unavailable (503 error)**
   - Ensure Ollama is running: `ollama serve`
   - Check if the model exists: `ollama list`

2. **Model not found**
   - Pull the required model: `ollama pull qwen2.5`

3. **Port already in use**
   - Change the port: `uvicorn main:app --port 8001`

4. **CORS errors from frontend**
   - Add your frontend URL to the [`origins`](chatbot-backend/main.py) list in [`main.py`](chatbot-backend/main.py)

### Debugging

Enable debug mode for more detailed error messages:

```bash
uvicorn main:app --reload --log-level debug
```

## 🚀 Deployment

For production deployment:

1. **Set environment variables** for production Ollama instance
2. **Remove debug flags**: Use `uvicorn main:app --host 0.0.0.0 --port 8000`
3. **Configure reverse proxy** (nginx/Apache) for SSL and load balancing
4. **Update CORS origins** for your production frontend domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly using [`test.http`](test.http)
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) for the excellent web framework
- [Ollama](https://ollama.ai) for local LLM inference
- [Qwen](https://github.com/QwenLM/Qwen) for the language model