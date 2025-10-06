# Chatbot Frontend - React + TypeScript + Vite

A modern React frontend for the AI chatbot application that communicates with a FastAPI backend using Ollama and the Qwen language model. Built with TypeScript and Vite for optimal development experience.

## 🚀 Features

- **React 19**: Latest React version with modern hooks and features
- **TypeScript**: Full type safety and excellent developer experience
- **Vite**: Lightning-fast development server and build tool
- **Real-time Chat**: Interactive chat interface with message history
- **Local Persistence**: Chat history saved to localStorage
- **Error Handling**: Graceful error handling with user feedback
- **Responsive Design**: Clean, mobile-friendly chat interface
- **Loading States**: Visual feedback during API calls

## 📋 Prerequisites

Before running this frontend, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- The FastAPI backend running on `http://localhost:8000`

## 🛠️ Installation

### 1. Navigate to Frontend Directory

```bash
cd chatbot-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

## 🚀 Running the Application

### Development Server

```bash
npm run dev
# or
yarn dev
```

The application will start at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
chatbot-frontend/
├── public/
│   └── vite.svg                 # Vite logo
├── src/
│   ├── assets/
│   │   └── react.svg           # React logo
│   ├── App.css                 # Chat interface styles
│   ├── App.tsx                 # Main chat component
│   ├── index.css               # Global styles
│   └── main.tsx                # React app entry point
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # App-specific TypeScript config
├── tsconfig.node.json          # Node-specific TypeScript config
├── vite.config.ts              # Vite configuration
└── eslint.config.js            # ESLint configuration
```

## 🎨 Chat Interface Features

### Message Types
- **User Messages**: Blue bubbles aligned to the right
- **Bot Messages**: Gray bubbles aligned to the left
- **Error Messages**: Red bubbles for error handling
- **Loading State**: Shows "Loading..." while waiting for responses

### Functionality
- **Message Input**: Text input with send button
- **Auto-scroll**: Chat window automatically scrolls to latest messages
- **Persistence**: Chat history persists across browser sessions
- **Validation**: Prevents sending empty messages
- **Disabled States**: Input disabled while processing requests

## 🔧 Configuration

### Backend API Endpoint

The frontend is configured to communicate with the FastAPI backend at:
```typescript
const response = await fetch('http://localhost:8000/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ user_message: userInput }),
});
```

To change the backend URL, modify the fetch URL in [`src/App.tsx`](src/App.tsx).

### CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative React dev server)

## 📡 API Integration

### Chat Message Format

```typescript
interface ChatMessage {
  type: 'user' | 'bot' | 'error';
  text: string;
}
```

### API Request Format

```json
{
  "user_message": "Hello, how are you?"
}
```

### API Response Format

```json
{
  "bot_response": "I'm doing well, thank you for asking!"
}
```

## 🎯 TypeScript Configuration

The project uses a modern TypeScript setup with:

- **Strict Mode**: Full type checking enabled
- **Module Resolution**: Bundler mode for Vite compatibility
- **JSX**: React JSX transform
- **ES2022**: Modern JavaScript features

### Key TypeScript Features Used

- Interface definitions for type safety
- Generic types for useState hooks
- Event handler typing
- Async/await with proper error handling

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build

### ESLint Configuration

The project includes comprehensive ESLint rules for:
- TypeScript best practices
- React hooks rules
- React refresh compatibility
- Code quality standards

### Expanding the ESLint Configuration

For production applications, consider enabling type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      // Replace with type-checked configs
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure the FastAPI backend is running on `http://localhost:8000`
   - Check browser console for CORS errors
   - Verify the backend CORS configuration includes your frontend URL

2. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check TypeScript configuration for any type errors
   - Ensure all imports have proper file extensions

3. **Development Server Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check if port 5173 is available

### Debugging

Enable detailed error logging by checking the browser console. The application includes comprehensive error handling with user-friendly messages.

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This creates a `dist/` directory with optimized static files ready for deployment.

### Deployment Options

- **Static Hosting**: Deploy to Netlify, Vercel, or GitHub Pages
- **CDN**: Upload to any CDN or static file server
- **Docker**: Include in a Docker container with nginx

### Environment Variables

For different environments, you may want to configure:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with proper TypeScript types
4. Run linting: `npm run lint`
5. Test the build: `npm run build`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the component framework
- [Vite](https://vitejs.dev/) for the build tool
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [FastAPI](https://fastapi.tiangolo.com/) for the backend API
