import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function AffectationList() {
  const [affectations, setAffectations] = useState([])

  useEffect(() => {
    loadAffectations()
  }, [])

  const loadAffectations = async () => {
    const response = await axios.get('http://localhost:8000/api/affectation')
    setAffectations(response.data.data)
  }

  const handleDelete = async (idpr, idp) => {
    if (window.confirm('Are you sure you want to delete this affectation?')) {
      await axios.delete('http://localhost:8000/api/affectation', {
        data: { idpr, idp }
      })
      loadAffectations()
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Project Affectations</h2>
        <Link to="/affectations/create" className="btn btn-primary">New Affectation</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Person ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {affectations.map((affectation, index) => (
            <tr key={index}>
              <td>{affectation.projet_id}</td>
              <td>{affectation.personne_id}</td>
              <td>
                <button 
                  onClick={() => handleDelete(affectation.projet_id, affectation.personne_id)} 
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AffectationList
