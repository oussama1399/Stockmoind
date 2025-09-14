import React, { useState, useEffect } from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stockItems, setStockItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('stockItems');
    const savedCustomers = localStorage.getItem('customers');
    const savedOrders = localStorage.getItem('orders');

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

    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    } else {
      // Add sample customers
      const sampleCustomers = [
        { id: 1, name: 'John Smith', email: 'john.smith@email.com', phone: '+1-555-0123', address: '123 Main St, City, State 12345' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1-555-0456', address: '456 Oak Ave, Town, State 67890' },
        { id: 3, name: 'Mike Wilson', email: 'mike.wilson@company.com', phone: '+1-555-0789', address: '789 Pine Rd, Village, State 54321' },
        { id: 4, name: 'Emma Davis', email: 'emma.davis@email.com', phone: '+1-555-0321', address: '321 Elm St, Borough, State 98765' },
        { id: 5, name: 'Robert Brown', email: 'robert.brown@business.com', phone: '+1-555-0654', address: '654 Maple Dr, District, State 13579' }
      ];
      setCustomers(sampleCustomers);
      localStorage.setItem('customers', JSON.stringify(sampleCustomers));
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Add sample orders
      const sampleOrders = [
        {
          id: 1,
          customerId: 1,
          customerName: 'John Smith',
          items: [
            { stockId: 1, name: 'Laptop Dell XPS 13', quantity: 1, price: 1299.99 },
            { stockId: 2, name: 'Wireless Mouse Logitech', quantity: 2, price: 29.99 }
          ],
          total: 1359.97,
          status: 'completed',
          date: '2025-09-14',
          notes: 'Urgent delivery requested'
        },
        {
          id: 2,
          customerId: 2,
          customerName: 'Sarah Johnson',
          items: [
            { stockId: 7, name: 'Monitor 27" 4K', quantity: 1, price: 399.99 },
            { stockId: 9, name: 'Water Bottle Stainless Steel', quantity: 3, price: 19.99 }
          ],
          total: 459.96,
          status: 'pending',
          date: '2025-09-13',
          notes: 'Call before delivery'
        },
        {
          id: 3,
          customerId: 3,
          customerName: 'Mike Wilson',
          items: [
            { stockId: 3, name: 'Office Chair Ergonomic', quantity: 1, price: 349.99 }
          ],
          total: 349.99,
          status: 'processing',
          date: '2025-09-12',
          notes: 'Company purchase'
        }
      ];
      setOrders(sampleOrders);
      localStorage.setItem('orders', JSON.stringify(sampleOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stockItems', JSON.stringify(stockItems));
  }, [stockItems]);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addItem = (item) => {
    setStockItems([...stockItems, { ...item, id: Date.now() }]);
  };

  const updateItem = (id, updatedItem) => {
    setStockItems(stockItems.map(item => item.id === id ? { ...item, ...updatedItem } : item));
  };

  const deleteItem = (id) => {
    setStockItems(stockItems.filter(item => item.id !== id));
  };

  const addCustomer = (customer) => {
    setCustomers([...customers, { ...customer, id: Date.now() }]);
  };

  const updateCustomer = (id, updatedCustomer) => {
    setCustomers(customers.map(customer => customer.id === id ? { ...customer, ...updatedCustomer } : customer));
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const addOrder = (order) => {
    setOrders([...orders, { ...order, id: Date.now() }]);
  };

  const updateOrder = (id, updatedOrder) => {
    setOrders(orders.map(order => order.id === id ? { ...order, ...updatedOrder } : order));
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
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
            Stock
          </button>
          <button
            className={activeTab === 'customers' ? 'active' : ''}
            onClick={() => setActiveTab('customers')}
          >
            Customers
          </button>
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            Orders
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
            Upload
          </button>
        </nav>
      </header>
      <main className="main">
        {activeTab === 'dashboard' && <Dashboard stockItems={stockItems} customers={customers} orders={orders} />}
        {activeTab === 'stock' && <StockManagement stockItems={stockItems} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} />}
        {activeTab === 'customers' && <CustomerManagement customers={customers} addCustomer={addCustomer} updateCustomer={updateCustomer} deleteCustomer={deleteCustomer} />}
        {activeTab === 'orders' && <OrderManagement orders={orders} customers={customers} stockItems={stockItems} addOrder={addOrder} updateOrder={updateOrder} deleteOrder={deleteOrder} updateItem={updateItem} />}
        {activeTab === 'chat' && <AIChat stockItems={stockItems} customers={customers} orders={orders} />}
        {activeTab === 'upload' && <UploadData addItem={addItem} />}
      </main>
    </div>
  );
}

function Dashboard({ stockItems, customers, orders }) {
  const totalItems = stockItems.length;
  const totalValue = stockItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const lowStockItems = stockItems.filter(item => item.quantity < 10).length;
  const categories = [...new Set(stockItems.map(item => item.category))].length;

  const totalCustomers = customers.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  return (
    <div>
      <h2>Intelligent Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="number">{totalItems}</div>
          <div className="label">Total Items</div>
        </div>
        <div className="stat-card">
          <div className="number">${totalValue.toFixed(2)}</div>
          <div className="label">Total Value</div>
        </div>
        <div className="stat-card">
          <div className="number">{totalCustomers}</div>
          <div className="label">Total Customers</div>
        </div>
        <div className="stat-card">
          <div className="number">{totalOrders}</div>
          <div className="label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="number">${totalRevenue.toFixed(2)}</div>
          <div className="label">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="number">{pendingOrders}</div>
          <div className="label">Pending Orders</div>
        </div>
        <div className="stat-card">
          <div className="number">{lowStockItems}</div>
          <div className="label">Low Stock Alerts</div>
        </div>
        <div className="stat-card">
          <div className="number">{categories}</div>
          <div className="label">Categories</div>
        </div>
      </div>
      <div className="card">
        <h3>AI Insights</h3>
        <p>Optimizations available: {lowStockItems > 0 ? 'Yes' : 'No'}</p>
        <p>Stock health: {lowStockItems === 0 ? 'Excellent' : lowStockItems < 3 ? 'Good' : 'Needs Attention'}</p>
        <p>Sales performance: {totalRevenue > 1000 ? 'Strong' : totalRevenue > 500 ? 'Good' : 'Needs Improvement'}</p>
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
    setFormData({ name: '', quantity: '', price: '', category: '' });
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
          <div>
            {stockItems.map(item => (
              <div key={item.id} className="stock-item">
                <div className="category">{item.category}</div>
                <strong>{item.name}</strong>
                <div className="details">
                  Quantity: {item.quantity} | Price: ${item.price}
                </div>
                <div className="actions">
                  <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AIChat({ stockItems, customers, orders }) {
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
        const result = await model.generateContent(`You are an AI assistant for stock management. Stock data: ${JSON.stringify(stockItems)}. Customer data: ${JSON.stringify(customers)}. Order data: ${JSON.stringify(orders)}. User query: ${input}`);
        aiResponse = result.response.text();
      } else {
        const response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'qwen3-coder:latest',
            prompt: `You are an AI assistant for stock management. Stock data: ${JSON.stringify(stockItems)}. Customer data: ${JSON.stringify(customers)}. Order data: ${JSON.stringify(orders)}. User query: ${input}`,
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
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div className="loading"></div>}
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

function OrderManagement({ orders, customers, stockItems, addOrder, updateOrder, deleteOrder, updateItem }) {
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    items: [],
    status: 'pending',
    notes: ''
  });
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = selectedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const orderData = {
      ...formData,
      items: selectedItems,
      total: total,
      date: new Date().toISOString().split('T')[0]
    };

    if (editingOrder) {
      updateOrder(editingOrder.id, orderData);
      setEditingOrder(null);
    } else {
      addOrder(orderData);
      // Update stock quantities
      selectedItems.forEach(orderItem => {
        const stockItem = stockItems.find(item => item.id === orderItem.stockId);
        if (stockItem) {
          updateItem(stockItem.id, { quantity: stockItem.quantity - orderItem.quantity });
        }
      });
    }

    setFormData({
      customerId: '',
      customerName: '',
      items: [],
      status: 'pending',
      notes: ''
    });
    setSelectedItems([]);
    setShowForm(false);
  };

  const handleCustomerChange = (customerId) => {
    const customer = customers.find(c => c.id === parseInt(customerId));
    setFormData({
      ...formData,
      customerId: customerId,
      customerName: customer ? customer.name : ''
    });
  };

  const addItemToOrder = (stockId) => {
    const stockItem = stockItems.find(item => item.id === stockId);
    if (stockItem && stockItem.quantity > 0) {
      const existingItem = selectedItems.find(item => item.stockId === stockId);
      if (existingItem) {
        setSelectedItems(selectedItems.map(item =>
          item.stockId === stockId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setSelectedItems([...selectedItems, {
          stockId: stockItem.id,
          name: stockItem.name,
          quantity: 1,
          price: stockItem.price
        }]);
      }
    }
  };

  const removeItemFromOrder = (stockId) => {
    setSelectedItems(selectedItems.filter(item => item.stockId !== stockId));
  };

  const updateItemQuantity = (stockId, quantity) => {
    if (quantity <= 0) {
      removeItemFromOrder(stockId);
    } else {
      const stockItem = stockItems.find(item => item.id === stockId);
      if (stockItem && quantity <= stockItem.quantity) {
        setSelectedItems(selectedItems.map(item =>
          item.stockId === stockId
            ? { ...item, quantity: quantity }
            : item
        ));
      }
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      customerId: order.customerId,
      customerName: order.customerName,
      items: order.items,
      status: order.status,
      notes: order.notes || ''
    });
    setSelectedItems(order.items);
    setShowForm(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'processing': return '#f59e0b';
      case 'pending': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div>
      <h2>Order Management</h2>
      <button className="btn" onClick={() => setShowForm(true)}>Create Order</button>
      {showForm && (
        <div className="card">
          <h3>{editingOrder ? 'Edit Order' : 'Create New Order'}</h3>
          <form onSubmit={handleSubmit}>
            <select
              value={formData.customerId}
              onChange={(e) => handleCustomerChange(e.target.value)}
              required
            >
              <option value="">Select Customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>

            <h4>Add Items to Order</h4>
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
              {stockItems.filter(item => item.quantity > 0).map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', border: '1px solid #e5e7eb', marginBottom: '0.5rem', borderRadius: '8px' }}>
                  <div>
                    <strong>{item.name}</strong> - ${item.price} (Stock: {item.quantity})
                  </div>
                  <button type="button" className="btn" onClick={() => addItemToOrder(item.id)}>Add</button>
                </div>
              ))}
            </div>

            {selectedItems.length > 0 && (
              <div>
                <h4>Order Items</h4>
                {selectedItems.map(item => (
                  <div key={item.stockId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: '#f8fafc', marginBottom: '0.5rem', borderRadius: '8px' }}>
                    <div>
                      {item.name} - ${item.price} x
                      <input
                        type="number"
                        min="1"
                        max={stockItems.find(s => s.id === item.stockId)?.quantity || 1}
                        value={item.quantity}
                        onChange={(e) => updateItemQuantity(item.stockId, parseInt(e.target.value))}
                        style={{ width: '60px', margin: '0 0.5rem' }}
                      />
                      = ${(item.quantity * item.price).toFixed(2)}
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={() => removeItemFromOrder(item.stockId)}>Remove</button>
                  </div>
                ))}
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '1rem' }}>
                  Total: ${selectedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
                </div>
              </div>
            )}

            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>

            <input
              type="text"
              placeholder="Notes (optional)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />

            <button type="submit" className="btn" disabled={selectedItems.length === 0}>
              {editingOrder ? 'Update Order' : 'Create Order'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => {
              setShowForm(false);
              setEditingOrder(null);
              setFormData({
                customerId: '',
                customerName: '',
                items: [],
                status: 'pending',
                notes: ''
              });
              setSelectedItems([]);
            }}>Cancel</button>
          </form>
        </div>
      )}
      <div className="card">
        <h3>Orders</h3>
        {orders.length === 0 ? (
          <p>No orders yet. Create your first order.</p>
        ) : (
          <div>
            {orders.map(order => (
              <div key={order.id} className="stock-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>Order #{order.id} - {order.customerName}</strong>
                  <span style={{
                    background: getStatusColor(order.status),
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {order.status}
                  </span>
                </div>
                <div className="details">
                  Date: {order.date} | Total: ${order.total.toFixed(2)}
                </div>
                <div className="details">
                  Items: {order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                </div>
                {order.notes && <div className="details">Notes: {order.notes}</div>}
                <div className="actions">
                  <button className="edit-btn" onClick={() => handleEdit(order)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteOrder(order.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;