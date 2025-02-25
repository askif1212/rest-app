import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function ProjectEdit() {
  const [project, setProject] = useState({
    intitule: '',
    dateDebut: '',
    duree: ''
  })
  const [availablePersons, setAvailablePersons] = useState([])
  const [assignedPersons, setAssignedPersons] = useState([])
  const [selectedPerson, setSelectedPerson] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    loadProject()
  }, [])

  const loadProject = async () => {
    const response = await axios.get(`http://localhost:8000/api/projets/${id}`)
    const data = response.data.data
    setProject({
      intitule: data.intitule,
      dateDebut: data.dateDebut,
      duree: data.duree
    })
    setAssignedPersons(data.personne || [])
    loadPersons(data.personne || [])
  }

  const loadPersons = async (assignedPersons) => {
    const response = await axios.get('http://localhost:8000/api/personne')
    const allPersons = response.data.data
    setAvailablePersons(allPersons.filter(p => !assignedPersons.some(ap => ap.id === p.id)))
  }

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`http://localhost:8000/api/projets/${id}`, { ...project, personnes: assignedPersons.map(p => p.id) })
    navigate('/')
  }

  const assignPerson = async () => {
    if (!selectedPerson) return

    await axios.post('http://localhost:8000/api/affectation', { idpr: id, idp: selectedPerson })
    loadProject()
    setSelectedPerson('')
  }

  const removePerson = async (personId) => {
    await axios.post('http://localhost:8000/api/affectation/delete', { idpr: id, idp: personId })
    loadProject()
  }

  return (
    <div>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" name="intitule" value={project.intitule} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input type="date" className="form-control" name="dateDebut" value={project.dateDebut} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input type="text" className="form-control" name="duree" value={project.duree} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Update Project</button>
      </form>
      <div className="mt-4">
        <h3>Assign Person</h3>
        <select className="form-select" value={selectedPerson} onChange={(e) => setSelectedPerson(e.target.value)}>
          <option value="">Select a person</option>
          {availablePersons.filter(p => !assignedPersons.some(ap => ap.id === p.id)).map(person => (
            <option key={person.id} value={person.id}>{person.nom} {person.prenom}</option>
          ))}
        </select>
        <button onClick={assignPerson} className="btn btn-success mt-2">Assign Person</button>
        <h3 className="mt-4">Assigned Persons</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedPersons.map(person => (
              <tr key={person.id}>
                <td>{person.nom} {person.prenom}</td>
                <td>
                  <button onClick={() => removePerson(person.id)} className="btn btn-sm btn-danger">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProjectEdit
