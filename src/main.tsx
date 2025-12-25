import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')

if (root) {
  const reactDOMRoot = createRoot(root)

  reactDOMRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
