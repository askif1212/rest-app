import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Project Manager</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/projects">Projects</Link>
          <Link className="nav-link" to="/persons">Personnel</Link>
          <Link className="nav-link" to="/affectations">Affectations</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
