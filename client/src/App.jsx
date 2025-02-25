import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProjectList from './pages/projects/ProjectList'
import ProjectCreate from './pages/projects/ProjectCreate'
import ProjectEdit from './pages/projects/ProjectEdit'
import PersonList from './pages/persons/PersonList'
import PersonCreate from './pages/persons/PersonCreate'
import PersonEdit from './pages/persons/PersonEdit'
import AffectationList from './pages/affectations/AffectationList'
import AffectationCreate from './pages/affectations/AffectationCreate'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <div className='w-[100vw] h-[100vh]'>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/projects/create" element={<ProjectCreate />} />
            <Route path="/projects/edit/:id" element={<ProjectEdit />} />
            <Route path="/persons" element={<PersonList />} />
            <Route path="/persons/create" element={<PersonCreate />} />
            <Route path="/persons/edit/:id" element={<PersonEdit />} />
            <Route path="/affectations" element={<AffectationList />} />
            <Route path="/affectations/create" element={<AffectationCreate />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
