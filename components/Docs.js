import { useState } from 'react';

export default function Docs() {
  const [documents, setDocuments] = useState([]);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocContent, setNewDocContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addDocument = () => {
    if (newDocTitle.trim() && newDocContent.trim()) {
      setDocuments([...documents, { 
        id: Date.now(), 
        title: newDocTitle, 
        content: newDocContent,
        created: new Date().toISOString()
      }]);
      setNewDocTitle('');
      setNewDocContent('');
    }
  };

  const updateDocument = (id, updates) => {
    setDocuments(documents.map(doc =>
      doc.id === id ? {...doc, ...updates} : doc
    ));
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="docs">
      <h2>Document Manager</h2>
      <p>Store and manage documentation</p>
      
      <div className="docs-header">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search documents..."
        />
        <button onClick={() => setSearchTerm('')}>Clear Search</button>
      </div>
      
      <div className="document-editor">
        <h3>New Document</h3>
        <input
          type="text"
          value={newDocTitle}
          onChange={(e) => setNewDocTitle(e.target.value)}
          placeholder="Document title"
        />
        <textarea
          value={newDocContent}
          onChange={(e) => setNewDocContent(e.target.value)}
          placeholder="Document content..."
          rows={6}
        />
        <button onClick={addDocument}>Save Document</button>
      </div>
      
      <div className="document-list">
        {filteredDocuments.length === 0 ? (
          <p>No documents yet. Create your first document above!</p>
        ) : (
          <ul>
            {filteredDocuments.map(doc => (
              <li key={doc.id}>
                <div className="document-card">
                  <div className="document-header">
                    <h4>{doc.title}</h4>
                    <small>Created: {new Date(doc.created).toLocaleDateString()}</small>
                  </div>
                  <div className="document-content">
                    <p>{doc.content.substring(0, 200)}{doc.content.length > 200 ? '...' : ''}</p>
                  </div>
                  <div className="document-actions">
                    <button onClick={() => {
                      setNewDocTitle(doc.title);
                      setNewDocContent(doc.content);
                    }}>Edit</button>
                    <button onClick={() => deleteDocument(doc.id)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}