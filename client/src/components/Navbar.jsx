import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Project Manager</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Projects</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/persons">Persons</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/affectations">Affectations</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
