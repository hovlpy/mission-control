import { useState } from 'react';

export default function Team() {
  const [agents, setAgents] = useState([]);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentRole, setNewAgentRole] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statuses = ['all', 'active', 'idle', 'busy', 'offline'];

  const addAgent = () => {
    if (newAgentName.trim()) {
      setAgents([...agents, { 
        id: Date.now(), 
        name: newAgentName, 
        role: newAgentRole || 'Assistant',
        status: 'idle',
        lastActive: new Date().toISOString()
      }]);
      setNewAgentName('');
      setNewAgentRole('');
    }
  };

  const updateAgentStatus = (id, newStatus) => {
    setAgents(agents.map(agent =>
      agent.id === id ? {...agent, status: newStatus} : agent
    ));
  };

  const removeAgent = (id) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  const filteredAgents = statusFilter === 'all' 
    ? agents 
    : agents.filter(agent => agent.status === statusFilter);

  return (
    <div className="team">
      <h2>Team Overview</h2>
      <p>Overview of agents and sub-agents</p>
      
      <div className="team-controls">
        <div className="agent-add">
          <input
            type="text"
            value={newAgentName}
            onChange={(e) => setNewAgentName(e.target.value)}
            placeholder="Agent name"
          />
          <input
            type="text"
            value={newAgentRole}
            onChange={(e) => setNewAgentRole(e.target.value)}
            placeholder="Role (optional)"
          />
          <button onClick={addAgent}>Add Agent</button>
        </div>
        
        <div className="filter">
          <label>Status: </label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="agent-list">
        {filteredAgents.length === 0 ? (
          <p>No agents yet. Add your first agent above!</p>
        ) : (
          <ul>
            {filteredAgents.map(agent => (
              <li key={agent.id} className={`agent-status-${agent.status}`}>
                <div className="agent-info">
                  <div className="agent-header">
                    <strong>{agent.name}</strong>
                    <span className="agent-role">{agent.role}</span>
                  </div>
                  <div className="agent-status">
                    <span className="status-dot" />
                    <span>{agent.status}</span>
                  </div>
                  <small>Last active: {new Date(agent.lastActive).toLocaleTimeString()}</small>
                </div>
                <div className="agent-actions">
                  <select 
                    value={agent.status} 
                    onChange={(e) => updateAgentStatus(agent.id, e.target.value)}
                  >
                    {statuses.slice(1).map(status => ( /* exclude 'all' */ 
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => removeAgent(agent.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="team-summary">
        <p>Total agents: {agents.length}</p>
        <p>Active: {agents.filter(a => a.status === 'active').length}</p>
        <p>Idle: {agents.filter(a => a.status === 'idle').length}</p>
      </div>
    </div>
  );
}