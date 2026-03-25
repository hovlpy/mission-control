import { useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');
  const [status, setStatus] = useState('active');

  const statuses = ['active', 'planning', 'on hold', 'completed'];

  const addProject = () => {
    if (newProject.trim()) {
      setProjects([...projects, { 
        id: Date.now(), 
        name: newProject, 
        status: status,
        created: new Date().toISOString().split('T')[0]
      }]);
      setNewProject('');
    }
  };

  const updateStatus = (id, newStatus) => {
    setProjects(projects.map(project =>
      project.id === id ? {...project, status: newStatus} : project
    ));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <div className="projects">
      <h2>Projects</h2>
      <p>Track major projects and initiatives</p>
      
      <div className="project-input">
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="Add a new project..."
          onKeyPress={(e) => e.key === 'Enter' && addProject()}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {statuses.map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <button onClick={addProject}>Add Project</button>
      </div>
      
      <div className="project-list">
        {projects.length === 0 ? (
          <p>No projects yet. Add your first project above!</p>
        ) : (
          <ul>
            {projects.map(project => (
              <li key={project.id}>
                <div className="project-info">
                  <strong>{project.name}</strong>
                  <span className={`status ${project.status}`}>{project.status}</span>
                  <small>Created: {project.created}</small>
                </div>
                <div className="project-actions">
                  <select 
                    value={project.status} 
                    onChange={(e) => updateStatus(project.id, e.target.value)}
                  >
                    {statuses.map(s => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                  <button onClick={() => deleteProject(project.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}