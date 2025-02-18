import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AffectationCreate() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [persons, setPersons] = useState([])
  const [formData, setFormData] = useState({
    idpr: '',
    idp: ''
  })

  useEffect(() => {
    loadProjects()
    loadPersons()
  }, [])

  const loadProjects = async () => {
    const response = await axios.get('http://localhost:8000/api/projets')
    setProjects(response.data.data)
  }

  const loadPersons = async () => {
    const response = await axios.get('http://localhost:8000/api/personne')
    setPersons(response.data.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:8000/api/affectation', formData)
    navigate('/affectations')
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2>Create New Affectation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Project</label>
          <select 
            className="form-control" 
            name="idpr" 
            value={formData.idpr}
            onChange={handleChange}
          >
            <option value="">Select Project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.intitule}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Person</label>
          <select 
            className="form-control" 
            name="idp" 
            value={formData.idp}
            onChange={handleChange}
          >
            <option value="">Select Person</option>
            {persons.map(person => (
              <option key={person.id} value={person.id}>
                {person.nom} {person.prenom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create Affectation</button>
      </form>
    </div>
  )
}

export default AffectationCreate
