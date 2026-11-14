import { useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const categories = [
  'Java',
  'Spring Boot',
  'Microservices',
  'Azure',
  'DevOps',
  'SQL',
  'System Design',
  'Others',
]

function Header() {
  const { pathname } = useLocation()
  const navigationRef = useRef(null)
  const navigationTogglerRef = useRef(null)

  const closeMobileNavigation = () => {
    if (
      window.matchMedia('(max-width: 991.98px)').matches &&
      navigationRef.current?.classList.contains('show')
    ) {
      navigationTogglerRef.current?.click()
    }
  }

  return (
    <header>
      <div className="brand-ribbon">
        <div className="container d-flex align-items-center justify-content-between">
          <Link className="brand-link" to="/" aria-label="Code Classic home">
            <span className="brand-mark" aria-hidden="true">
              &lt;/&gt;
            </span>
            <span>Code Classic</span>
          </Link>
          <div className="d-flex align-items-center gap-3">
            <div className="social-placeholders d-none d-lg-flex" aria-label="Social profiles">
              <span title="YouTube profile not configured">YouTube</span>
              <span title="LinkedIn profile not configured">LinkedIn</span>
              <span title="Instagram profile not configured">Instagram</span>
            </div>
            <Link className="btn btn-outline-light login-link d-none d-lg-inline-flex" to="/login">
              Login
            </Link>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              ref={navigationTogglerRef}
              data-bs-toggle="collapse"
              data-bs-target="#primaryNavigation"
              aria-controls="primaryNavigation"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark navigation-ribbon">
        <div className="container">
          <div
            className="collapse navbar-collapse"
            id="primaryNavigation"
            ref={navigationRef}
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  end
                  onClick={closeMobileNavigation}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle${pathname.startsWith('/blog') ? ' active' : ''}`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Blog
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/blog"
                      end
                      onClick={closeMobileNavigation}
                    >
                      All Blogs
                    </NavLink>
                  </li>
                  {categories.map((category) => (
                    <li key={category}>
                      <NavLink
                        className="dropdown-item"
                        to={`/blog/${encodeURIComponent(category.toLowerCase().replaceAll(' ', '-'))}`}
                        onClick={closeMobileNavigation}
                      >
                        {category}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/qa"
                  onClick={closeMobileNavigation}
                >
                  Q&amp;A
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/about"
                  onClick={closeMobileNavigation}
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item d-lg-none">
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={closeMobileNavigation}
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
