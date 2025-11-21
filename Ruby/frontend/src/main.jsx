import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Locadora from './pages/locadora.jsx'
import Paginateste from './pages/paginateste.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Locadora />
      <Paginateste />
    </BrowserRouter>
  </StrictMode>,
)
