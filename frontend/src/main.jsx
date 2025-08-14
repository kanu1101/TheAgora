import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { BlogProvider } from './contexts/BlogContext.jsx'
import { MenuProvider } from './contexts/MenuContext.jsx'
import { DebateProvider } from './contexts/DebateContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DebateProvider>
          <BlogProvider>
            <MenuProvider>
              <App />
            </MenuProvider>
          </BlogProvider>
        </DebateProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
