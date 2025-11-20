import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        {/* Render App for all subpaths so nested routes work (e.g., #/about, #/services) */}
        <Route path="/*" element={<App />} />
        {/* Standalone test route remains available */}
        <Route path="/test" element={<Test />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
