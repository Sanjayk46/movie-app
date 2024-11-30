import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/useThemeContext.jsx'
import { AuthProvider } from './context/UserContext.jsx'
import { MoviesProvider } from './context/useMovieContext.jsx' // Import MoviesProvider
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <MoviesProvider> {/* Add MoviesProvider here */}
            <App />
            <ToastContainer
           position='bottom-right'
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnHover
           theme="light"
           />
          </MoviesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
