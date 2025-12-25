import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import InfiniteScroll from './assets/InfiniteScroll/InfiniteScroll.tsx'
import Home from './assets/Home/Home.tsx'

const root = document.getElementById('root')

if (root) {
  const reactDOMRoot = createRoot(root)

  reactDOMRoot.render(
    <BrowserRouter>
      <StrictMode>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/InfiniteScroll" element={<InfiniteScroll />} />
          </Route>
        </Routes>
      </StrictMode>
    </BrowserRouter>
  )
}
