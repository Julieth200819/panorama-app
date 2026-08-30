import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Users from './pages/Users'
import UserDetail from './pages/UserDetail'
import Photos from './pages/Photos'
import PhotoDetail from './pages/PhotoDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/fotos" element={<Photos />} />

          <Route path="/usuarios/:id" element={<UserDetail />} />
          <Route path="/fotos/:id" element={<PhotoDetail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        Panorama — usuarios y fotografías en un solo lugar
      </footer>
    </div>
  )
}
