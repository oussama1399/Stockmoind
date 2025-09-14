import React, { useState, useEffect } from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stockItems, setStockItems] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('stockItems');
    if (savedItems) {
      setStockItems(JSON.parse(savedItems));
    } else {
      // Add sample data if no items exist
      const sampleData = [
        { id: 1, name: 'Laptop Dell XPS 13', quantity: 15, price: 1299.99, category: 'Electronics' },
        { id: 2, name: 'Wireless Mouse Logitech', quantity: 45, price: 29.99, category: 'Accessories' },
        { id: 3, name: 'Office Chair Ergonomic', quantity: 8, price: 349.99, category: 'Furniture' },
        { id: 4, name: 'Coffee Beans Premium', quantity: 120, price: 24.99, category: 'Food' },
        { id: 5, name: 'Printer Ink Cartridge', quantity: 3, price: 49.99, category: 'Supplies' },
        { id: 6, name: 'USB Flash Drive 32GB', quantity: 67, price: 12.99, category: 'Storage' },
        { id: 7, name: 'Monitor 27" 4K', quantity: 12, price: 399.99, category: 'Electronics' },
        { id: 8, name: 'Notebook A4 100 pages', quantity: 200, price: 3.99, category: 'Stationery' },
        { id: 9, name: 'Water Bottle Stainless Steel', quantity: 35, price: 19.99, category: 'Accessories' },
        { id: 10, name: 'External Hard Drive 1TB', quantity: 5, price: 89.99, category: 'Storage' }
      ];
      setStockItems(sampleData);
      localStorage.setItem('stockItems', JSON.stringify(sampleData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stockItems', JSON.stringify(stockItems));
  }, [stockItems]);

  const addItem = (item) => {
    setStockItems([...stockItems, { ...item, id: Date.now() }]);
  };

  const updateItem = (id, updatedItem) => {
    setStockItems(stockItems.map(item => item.id === id ? { ...item, ...updatedItem } : item));
  };

  const deleteItem = (id) => {
    setStockItems(stockItems.filter(item => item.id !== id));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Stockmind</h1>
        <nav className="nav">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activeTab === 'stock' ? 'active' : ''}
            onClick={() => setActiveTab('stock')}
          >
            Stock Management
          </button>
          <button
            className={activeTab === 'chat' ? 'active' : ''}
            onClick={() => setActiveTab('chat')}
          >
            AI Chat
          </button>
          <button
            className={activeTab === 'upload' ? 'active' : ''}
            onClick={() => setActiveTab('upload')}
          >
            Upload Data
          </button>
        </nav>
      </header>
      <main className="main">
        {activeTab === 'dashboard' && <Dashboard stockItems={stockItems} />}
        {activeTab === 'stock' && <StockManagement stockItems={stockItems} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} />}
        {activeTab === 'chat' && <AIChat stockItems={stockItems} />}
        {activeTab === 'upload' && <UploadData addItem={addItem} />}
      </main>
    </div>
  );
}

function Dashboard({ stockItems }) {
  const totalItems = stockItems.length;
  const lowStockItems = stockItems.filter(item => item.quantity < 10).length;

  return (
    <div>
      <h2>Intelligent Dashboard</h2>
      <div className="card">
        <h3>Stock Overview</h3>
        <p>Total items: {totalItems}</p>
        <p>Low stock alerts: {lowStockItems}</p>
      </div>
      <div className="card">
        <h3>AI Insights</h3>
        <p>Optimizations available: {lowStockItems > 0 ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}

function StockManagement({ stockItems, addItem, updateItem, deleteItem }) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', quantity: '', price: '', category: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateItem(editingItem.id, formData);
      setEditingItem(null);
    } else {
      addItem(formData);
    }
    setFormData({ name: '', quantity: '', price: '' });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ name: item.name, quantity: item.quantity, price: item.price, category: item.category || '' });
    setShowForm(true);
  };

  return (
    <div>
      <h2>Stock Management</h2>
      <button className="btn" onClick={() => setShowForm(true)}>Add Item</button>
      {showForm && (
        <div className="card">
          <h3>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Item Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <button type="submit" className="btn">{editingItem ? 'Update' : 'Add'}</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditingItem(null); setFormData({ name: '', quantity: '', price: '', category: '' }); }}>Cancel</button>
          </form>
        </div>
      )}
      <div className="card">
        <h3>Stock Items</h3>
        {stockItems.length === 0 ? (
          <p>No items yet. Add some stock items.</p>
        ) : (
          <ul>
            {stockItems.map(item => (
              <li key={item.id} style={{ marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
                <strong>{item.name}</strong> - Category: {item.category} - Qty: {item.quantity} - Price: ${item.price}
                <div style={{ marginTop: '0.5rem' }}>
                  <button onClick={() => handleEdit(item)} style={{ marginRight: '0.5rem' }}>Edit</button>
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function AIChat({ stockItems }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useGemini, setUseGemini] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let aiResponse;
      if (useGemini && geminiApiKey) {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(`You are an AI assistant for stock management. Stock data: ${JSON.stringify(stockItems)}. User query: ${input}`);
        aiResponse = result.response.text();
      } else {
        const response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'qwen3-coder:latest',
            prompt: `You are an AI assistant for stock management. Stock data: ${JSON.stringify(stockItems)}. User query: ${input}`,
            stream: false,
          }),
        });
        const data = await response.json();
        aiResponse = data.response;
      }
      const aiMessage = { role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'assistant', content: 'Error: Could not get response from AI.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AI Chat for Insights</h2>
      <div className="card">
        <label>
          <input
            type="checkbox"
            checked={useGemini}
            onChange={(e) => setUseGemini(e.target.checked)}
          />
          Use Gemini API
        </label>
        {useGemini && (
          <input
            type="password"
            placeholder="Gemini API Key"
            value={geminiApiKey}
            onChange={(e) => setGeminiApiKey(e.target.value)}
          />
        )}
      </div>
      <div className="card" style={{ height: '400px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
      <div className="card">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask for insights..."
          style={{ width: '70%', marginRight: '1rem' }}
        />
        <button className="btn" onClick={sendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  );
}

function UploadData({ addItem }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData.forEach(row => {
        if (row.name && row.quantity && row.price) {
          addItem({
            name: row.name,
            quantity: parseInt(row.quantity),
            price: parseFloat(row.price),
            category: row.category || 'Uncategorized'
          });
        }
      });
      alert('Data uploaded successfully!');
      setFile(null);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2>Upload XLSX Data</h2>
      <div className="card">
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button className="btn" onClick={handleUpload} disabled={!file}>Upload</button>
        {file && <p>Selected file: {file.name}</p>}
      </div>
    </div>
  );
}

export default App;