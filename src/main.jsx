import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/useThemeContext.jsx'
import { AuthProvider } from './context/UserContext.jsx'
import { MoviesProvider } from './context/useMovieContext.jsx' // Import MoviesProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <MoviesProvider> {/* Add MoviesProvider here */}
            <App />
          </MoviesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
