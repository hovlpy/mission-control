import { useState, useEffect } from 'react';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [assignedTo, setAssignedTo] = useState('me'); // 'me' or 'openclaw'
  const [activityFeed, setActivityFeed] = useState([]);
  const [status, setStatus] = useState({
    backlog: [],
    todo: [],
    inprogress: [],
    review: [],
    done: []
  });

  // Initialize with some sample tasks to demonstrate
  useEffect(() => {
    if (tasks.length === 0) {
      const initialTasks = [
        { 
          id: 1, 
          text: 'Set up mission control dashboard', 
          assignedTo: 'me', 
          created: new Date(Date.now() - 86400000).toISOString(),
          completed: true
        },
        { 
          id: 2, 
          text: 'Build task board component', 
          assignedTo: 'openclaw', 
          created: new Date(Date.now() - 43200000).toISOString(),
          completed: true
        },
        { 
          id: 3, 
          text: 'Review calendar integration', 
          assignedTo: 'me', 
          created: new Date(Date.now() - 21600000).toISOString(),
          completed: false
        }
      ];
      
      setTasks(initialTasks);
      
      // Distribute to columns based on completion status
      const initialStatus = {
        backlog: [],
        todo: initialTasks.filter(t => !t.completed && t.assignedTo === 'me'),
        inprogress: initialTasks.filter(t => !t.completed && t.assignedTo === 'openclaw'),
        review: [],
        done: initialTasks.filter(t => t.completed)
      };
      
      setStatus(initialStatus);
      
      // Add initial activity
      setActivityFeed([
        {
          id: 1,
          action: 'Opened mission control dashboard',
          agent: 'me',
          timestamp: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 2,
          action: 'Built task board component',
          agent: 'openclaw',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 3,
          action: 'Reviewed task board progress',
          agent: 'me',
          timestamp: new Date(Date.now() - 1800000).toISOString()
        }
      ]);
    }
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        assignedTo: assignedTo,
        created: new Date().toISOString(),
        completed: false
      };
      
      setTasks([...tasks, task]);
      
      // Add to appropriate column
      if (assignedTo === 'me') {
        setStatus(prev => ({
          ...prev,
          todo: [...prev.todo, task]
        }));
      } else {
        setStatus(prev => ({
          ...prev,
          inprogress: [...prev.inprogress, task]
        }));
      }
      
      // Add to activity feed
      setActivityFeed(prev => [
        ...prev,
        {
          id: Date.now(),
          action: `Added new task: "${newTask}" assigned to ${assignedTo === 'me' ? 'you' : 'OpenClaw'}`,
          agent: 'me',
          timestamp: new Date().toISOString()
        }
      ]);
      
      setNewTask('');
    }
  };

  const moveTask = (taskId, fromColumn, toColumn) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Remove from source column
    const newStatus = {...status};
    newStatus[fromColumn] = newStatus[fromColumn].filter(t => t.id !== taskId);
    
    // Add to destination column
    newStatus[toColumn] = [...newStatus[toColumn], task];
    
    setStatus(newStatus);
    
    // Update task completion status if moved to done
    if (toColumn === 'done' && !task.completed) {
      const updatedTasks = tasks.map(t => 
        t.id === taskId ? {...t, completed: true} : t
      );
      setTasks(updatedTasks);
    }
    
    // Add activity feed entry
    setActivityFeed(prev => [
      ...prev,
      {
        id: Date.now(),
        action: `Moved task "${task.text}" from ${fromColumn} to ${toColumn}`,
        agent: task.assignedTo === 'me' ? 'me' : 'openclaw',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const deleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
    
    // Remove from all columns
    const newStatus = {...status};
    Object.keys(newStatus).forEach(key => {
      newStatus[key] = newStatus[key].filter(t => t.id !== taskId);
    });
    setStatus(newStatus);
    
    // Add activity feed entry
    setActivityFeed(prev => [
      ...prev,
      {
        id: Date.now(),
        action: `Deleted task: "${task.text}"`,
        agent: 'me',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  // Simulate OpenClaw checking for tasks during heartbeat
  useEffect(() => {
    const checkForOpenClawTasks = () => {
      const openclawTasks = status.todo.filter(task => task.assignedTo === 'openclaw');
      if (openclawTasks.length > 0) {
        // In a real implementation, this would trigger OpenClaw to do the task
        // For simulation, we'll just move the first task to inprogress after a delay
        setTimeout(() => {
          const taskToMove = openclawTasks[0];
          moveTask(taskToMove.id, 'todo', 'inprogress');
          
          setActivityFeed(prev => [
            ...prev,
            {
              id: Date.now(),
              action: `Started working on task: "${taskToMove.text}"`,
              agent: 'openclaw',
              timestamp: new Date().toISOString()
            }
          ]);
        }, 1000);
      }
    };
    
    // Check every 5 seconds (simulating heartbeat checks)
    const interval = setInterval(checkForOpenClawTasks, 5000);
    return () => clearInterval(interval);
  }, [status.todo, moveTask]);

  return (
    <div className="task-board">
      <h2>Task Board 📋</h2>
      <p>Track everything your OpenClaw is doing with live activity feed</p>
      
      {/* Task Input */}
      <div className="task-input">
        <div className="input-group">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What should we work on?"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <select 
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="me">Assigned to You</option>
            <option value="openclaw">Assigned to OpenClaw</option>
          </select>
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
      
      {/* Board Columns */}
      <div className="board-columns">
        {['backlog', 'todo', 'inprogress', 'review', 'done'].map(column => (
          <div key={column} className="column">
            <h3>{column.toUpperCase()}</h3>
            <div className="task-list">
              {status[column].length === 0 ? (
                <p className="empty-column">No tasks</p>
              ) : (
                status[column].map(task => (
                  <div key={task.id} className="task-card">
                    <div className="task-header">
                      <span className="assignment-badge">
                        {task.assignedTo === 'me' ? 'A' : 'H'}
                      </span>
                      <h4>{task.text}</h4>
                    </div>
                    <div className="task-meta">
                      <small>Added: {new Date(task.created).toLocaleDateString()}</small>
                    </div>
                    <div className="task-actions">
                      {column !== 'done' && (
                        <button 
                          onClick={() => {
                            const nextColumn = 
                              column === 'backlog' ? 'todo' :
                              column === 'todo' ? 'inprogress' :
                              column === 'inprogress' ? 'review' :
                              'done';
                            moveTask(task.id, column, nextColumn);
                          }}
                        >
                          Move →
                        </button>
                      )}
                      {!task.completed && column === 'review' && (
                        <button 
                          onClick={() => {
                            moveTask(task.id, column, 'done');
                          }}
                        >
                          Approve
                        </button>
                      )}
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="delete-btn"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Activity Feed */}
      <div className="activity-feed">
        <h3>Live Activity Feed</h3>
        <div className="feed-content">
          {activityFeed.length === 0 ? (
            <p className="empty-feed">No activity yet</p>
          ) : (
            activityFeed.slice(0, 10).map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.agent === 'me' ? '👤' : '🤖'}
                </div>
                <div className="activity-text">
                  {activity.action}
                </div>
                <div className="activity-time">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}