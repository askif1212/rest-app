import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function PersonEdit() {
  const [person, setPerson] = useState({
    nom: "",
    prenom: "",
    tele: "",
    ville: "",
  });
  const [projects, setProjects] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadPerson();
    loadAvailableProjects();
  }, []);

  const loadPerson = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/personne/${id}`
      );
      setPerson(response.data.data);
      if (response.data.data.projet) {
        setProjects(response.data.data.projet);
      }
    } catch (error) {
      alert("Error loading person data");
      navigate("/persons");
    }
  };

  const loadAvailableProjects = async () => {
    try {
      console.log("Fetching projects...");
      const response = await axios.get("http://localhost:8000/api/projets");
      console.log("Projects response:", response.data);
      if (response.data.data) {
        setAvailableProjects(response.data.data);
      } else {
        console.error("No data property in response:", response.data);
        alert("Invalid response format from server");
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      alert(
        "Error loading available projects: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleChange = (e) => {
    setPerson({
      ...person,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/personne/${id}`,
        person
      );
      alert(response.data.message);
      navigate("/persons");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating person");
    }
  };

  const assignToProject = async () => {
    if (!selectedProject) {
      alert("Please select a project");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/affectation",
        {
          idpr: selectedProject,
          idp: id,
        }
      );
      loadPerson();
      setSelectedProject("");
    } catch (error) {
      alert(error.response?.data?.message || "Error assigning to project");
    }
  };

  const removeFromProject = async (projectId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this person from the project?"
      )
    ) {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/affectation/delete`,
          {
            idpr: projectId,
            idp: id,
          }
        );
        alert(response.data.message);
        loadPerson();
      } catch (error) {
        alert(error.response?.data?.message || "Error removing from project");
      }
    }
  };

  return (
    <div>
      <h2>Edit Person</h2>
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
        <button type="submit" className="btn btn-primary">
          Update Person
        </button>
      </form>

      <div className="mt-4">
        <h3>Assign to Project</h3>
        <div className="mb-3">
          <select
            className="form-select"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Select a project</option>
            {availableProjects
              .filter((p) => !projects.some((assigned) => assigned.id === p.id))
              .map((project) => (
                <option key={project.id} value={project.id}>
                  {project.intitule}
                </option>
              ))}
          </select>
        </div>
        <button onClick={() => assignToProject()} className="btn btn-success">
          Assign to Project
        </button>

        <h3>Assigned Projects</h3>
        {projects.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.intitule}</td>
                  <td>
                    <button
                      onClick={() => removeFromProject(project.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No projects assigned</p>
        )}
      </div>
    </div>
  );
}

export default PersonEdit;
