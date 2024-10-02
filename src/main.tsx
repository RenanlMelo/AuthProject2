import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './routes'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
)
