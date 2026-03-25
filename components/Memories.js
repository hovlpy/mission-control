import { useState } from 'react';

export default function Memories() {
  const [memories, setMemories] = useState([]);
  const [newMemory, setNewMemory] = useState('');
  const [category, setCategory] = useState('general');

  const categories = ['general', 'decision', 'lesson', 'idea', 'reference'];

  const addMemory = () => {
    if (newMemory.trim()) {
      setMemories([...memories, { 
        id: Date.now(), 
        text: newMemory, 
        category: category,
        date: new Date().toISOString()
      }]);
      setNewMemory('');
    }
  };

  const deleteMemory = (id) => {
    setMemories(memories.filter(memory => memory.id !== id));
  };

  return (
    <div className="memories">
      <h2>Memories</h2>
      <p>Organized conversations and important facts</p>
      
      <div className="memory-input">
        <textarea
          value={newMemory}
          onChange={(e) => setNewMemory(e.target.value)}
          placeholder="Add a memory or insight..."
          rows={3}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <button onClick={addMemory}>Add Memory</button>
      </div>
      
      <div className="memory-list">
        {memories.length === 0 ? (
          <p>No memories recorded yet. Add your first memory above!</p>
        ) : (
          <ul>
            {memories.map(memory => (
              <li key={memory.id} className={`category-${memory.category}`}>
                <div className="memory-content">
                  <p>{memory.text}</p>
                  <small>
                    {memory.category} • {new Date(memory.date).toLocaleString()}
                  </small>
                </div>
                <button onClick={() => deleteMemory(memory.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}