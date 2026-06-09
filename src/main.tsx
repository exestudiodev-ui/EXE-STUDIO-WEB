import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Latin + latin-ext only — removes ~140KB of cyrillic/greek font files
import '@fontsource/inter/latin-300.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/space-grotesk/latin-700.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
