import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ProjectCreate() {
  const navigate = useNavigate()
  const [project, setProject] = useState({
    intitule: '',
    dateDebut: '',
    duree: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:8000/api/projets', project)
    navigate('/projects')
  }

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="intitule"
            value={project.intitule}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            name="dateDebut"
            value={project.dateDebut}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input
            type="text"
            className="form-control"
            name="duree"
            value={project.duree}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Project</button>
      </form>
    </div>
  )
}

export default ProjectCreate
