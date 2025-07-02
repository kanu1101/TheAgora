import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { BlogProvider } from './contexts/BlogContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BlogProvider>

        <App />
        </BlogProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
