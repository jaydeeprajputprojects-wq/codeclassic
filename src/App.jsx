import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import About from './pages/About.jsx'
import Blogs from './pages/Blogs.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import QAComingSoon from './pages/QAComingSoon.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blogs />} />
        <Route path="blog/:category" element={<Blogs />} />
        <Route path="qa" element={<QAComingSoon />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route
          path="*"
          element={
            <section className="placeholder-card" aria-labelledby="page-title">
              <h1 id="page-title">Page not found</h1>
              <p>The page you requested does not exist.</p>
            </section>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
