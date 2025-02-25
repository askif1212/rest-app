import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const response = await axios.get("http://localhost:8000/api/projets");
    setProjects(response.data.data);
  };

  const deleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const { data } = await axios.delete(
          `http://localhost:8000/api/projets/${id}`
        );
        alert(data.message);
        loadProjects();
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      <Link to="/projects/create" className="btn btn-primary mb-3">
        Create Project
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.intitule}</td>
              <td>{new Date(project.dateDebut).toLocaleDateString()}</td>
              <td>{project.duree}</td>
              <td>
                <Link
                  to={`/projects/edit/${project.id}`}
                  className="btn btn-sm btn-info me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProject(project.id)}
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

export default ProjectList;
