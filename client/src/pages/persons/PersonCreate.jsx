import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function PersonCreate() {
  const [person, setPerson] = useState({
    nom: '',
    prenom: '',
    tele: '',
    ville: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/personne', person)
      navigate('/persons')
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div>
      <h2>Create Person</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            name="nom"
            value={person.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            name="prenom"
            value={person.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Téléphone</label>
          <input
            type="tel"
            className="form-control"
            name="tele"
            value={person.tele}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ville</label>
          <input
            type="text"
            className="form-control"
            name="ville"
            value={person.ville}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Person</button>
      </form>
    </div>
  )
}

export default PersonCreate
