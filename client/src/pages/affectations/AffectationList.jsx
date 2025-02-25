import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AffectationList() {
  const [affectations, setAffectations] = useState([]);

  useEffect(() => {
    loadAffectations();
  }, []);

  const loadAffectations = async () => {
    const response = await axios.get("http://localhost:8000/api/affectation");
    setAffectations(response.data.data);
  };

  const handleDelete = async (idpr, idp) => {
    console.log(idpr,idp)
    if (window.confirm("Are you sure you want to delete this affectation?")) {
      await axios.post('http://localhost:8000/api/affectation/delete', { idpr: idpr, idp: idp })
      loadAffectations();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Project Affectations</h2>
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
              <td>{affectation.personnes_id}</td>
              <td>
                <button
                  onClick={() =>
                    handleDelete(affectation.projet_id, affectation.personnes_id)
                  }
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
  );
}

export default AffectationList;
