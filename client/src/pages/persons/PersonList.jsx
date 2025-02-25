import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function PersonList() {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    loadPersons()
  }, [])

  const loadPersons = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/personne')
      setPersons(response.data.data)
    } catch (error) {
      alert('Error loading persons')
    }
  }

  const deletePerson = async (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/personne/${id}`)
        alert(response.data.message)
        loadPersons()
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting person')
      }
    }
  }

  return (
    <div>
      <h2>Persons</h2>
      <Link to="/persons/create" className="btn btn-primary mb-3">Create Person</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Ville</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map(person => (
            <tr key={person.id}>
              <td>{person.nom}</td>
              <td>{person.prenom}</td>
              <td>{person.tele}</td>
              <td>{person.ville}</td>
              <td>
                <Link to={`/persons/edit/${person.id}`} className="btn btn-sm btn-info me-2">Edit</Link>
                <button onClick={() => deletePerson(person.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PersonList
