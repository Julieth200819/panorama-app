import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/usuarios', label: 'Usuarios' },
  { to: '/fotos', label: 'Fotos' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <div className="navbar__brand">
          <strong>Panorama</strong>
        </div>
        <nav className="navbar__links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                'navbar__link' + (isActive ? ' navbar__link--active' : '')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
