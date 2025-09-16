import React, { useState, useEffect } from 'react';
import './App.css';
import './Header.css';
import * as XLSX from 'xlsx';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import UploadData from './UploadData';
import Settings from './Settings';
import translations from './translations';
import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaRobot,
  FaCog,
  FaUpload,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaInfoCircle,
  FaChartBar,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stockItems, setStockItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [geminiApiKey, setGeminiApiKey] = useState(process.env.REACT_APP_GEMINI_API_KEY || process.env.GEMINI_API_KEY || localStorage.getItem('geminiApiKey') || '');
  // Translation function
  const t = (key) => translations[key] || key;
  // Format currency as MAD with proper French formatting
  const formatMAD = (amount) => {
    // Ensure amount is a number
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) return '0,00 MAD';
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numAmount);
  };
  // Format large numbers with proper French formatting
  const formatNumber = (num) => {
    const number = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(number)) return '0';
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  };
  useEffect(() => {
    const savedItems = localStorage.getItem('stockItems');
    const savedCustomers = localStorage.getItem('customers');
    const savedOrders = localStorage.getItem('orders');
    if (savedItems) {
      setStockItems(JSON.parse(savedItems));
    } else {
      // Add sample data if no items exist
      const sampleData = [
        { id: 1, name: t('laptop-dell-xps-13'), quantity: 15, price: 1299.99, category: t('electronics') },
        { id: 2, name: t('wireless-mouse-logitech'), quantity: 45, price: 29.99, category: t('accessories') },
        { id: 3, name: t('office-chair-ergonomic'), quantity: 8, price: 349.99, category: t('furniture') },
        { id: 4, name: t('coffee-beans-premium'), quantity: 120, price: 24.99, category: t('food') },
        { id: 5, name: t('printer-ink-cartridge'), quantity: 3, price: 49.99, category: t('supplies') },
        { id: 6, name: t('usb-flash-drive-32gb'), quantity: 67, price: 12.99, category: t('storage') },
        { id: 7, name: t('monitor-27-4k'), quantity: 12, price: 399.99, category: t('electronics') },
        { id: 8, name: t('notebook-a4-100-pages'), quantity: 200, price: 3.99, category: t('stationery') },
        { id: 9, name: t('water-bottle-stainless-steel'), quantity: 35, price: 19.99, category: t('accessories') },
        { id: 10, name: t('external-hard-drive-1tb'), quantity: 5, price: 89.99, category: t('storage') }
      ];
      setStockItems(sampleData);
      localStorage.setItem('stockItems', JSON.stringify(sampleData));
    }
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    } else {
      // Add sample customers
      const sampleCustomers = [
        { id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '+212-6-12-34-56-78', address: '123 Rue Principale, Ville, Maroc 12345' },
        { id: 2, name: 'Sarah Alaoui', email: 'sarah.alaoui@email.ma', phone: '+212-6-98-76-54-32', address: '456 Avenue Hassan II, Ville, Maroc 67890' },
        { id: 3, name: 'Mohammed Tazi', email: 'mohammed.tazi@entreprise.ma', phone: '+212-6-55-44-33-22', address: '789 Boulevard Mohammed V, Ville, Maroc 54321' },
        { id: 4, name: 'Fatima Bennani', email: 'fatima.bennani@email.com', phone: '+212-6-11-22-33-44', address: '321 Rue de la Kasbah, Ville, Maroc 98765' },
        { id: 5, name: 'Ahmed Alaoui', email: 'ahmed.alaoui@business.ma', phone: '+212-6-77-88-99-00', address: '654 Avenue Allal Ben Abdallah, Ville, Maroc 13579' }
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
          customerName: 'Jean Dupont',
          items: [
            { stockId: 1, name: t('laptop-dell-xps-13'), quantity: 1, price: 1299.99 },
            { stockId: 2, name: t('wireless-mouse-logitech'), quantity: 2, price: 29.99 }
          ],
          total: 1359.97,
          status: 'completed',
          date: '2025-09-14',
          notes: t('urgent-delivery-requested')
        },
        {
          id: 2,
          customerId: 2,
          customerName: 'Sarah Alaoui',
          items: [
            { stockId: 7, name: t('monitor-27-4k'), quantity: 1, price: 399.99 },
            { stockId: 9, name: t('water-bottle-stainless-steel'), quantity: 3, price: 19.99 }
          ],
          total: 459.96,
          status: 'pending',
          date: '2025-09-13',
          notes: t('call-before-delivery')
        },
        {
          id: 3,
          customerId: 3,
          customerName: 'Mohammed Tazi',
          items: [
            { stockId: 3, name: t('office-chair-ergonomic'), quantity: 1, price: 349.99 }
          ],
          total: 349.99,
          status: 'processing',
          date: '2025-09-12',
          notes: t('company-purchase')
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
  useEffect(() => {
    localStorage.setItem('geminiApiKey', geminiApiKey);
  }, [geminiApiKey]);
  useEffect(() => {
    if (activeTab === 'chat' && !geminiApiKey) {
      setActiveTab('settings');
      alert(translations['set-api-key-message']);
    }
  }, [activeTab, geminiApiKey]);
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
        <div className="header-content">
          <div className="brand">
            <div className="brand-icon">■</div>
            <h1 className="brand-name">Stockmind</h1>
          </div>
          <div className="header-meta">
            <div className="last-updated">Mis à jour il y a 2 minutes</div>
          </div>
        </div>
        <nav className="nav">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartBar /> {t('dashboard')}
          </button>
          <button
            className={activeTab === 'stock' ? 'active' : ''}
            onClick={() => setActiveTab('stock')}
          >
            <FaBox /> {t('stock')}
          </button>
          <button
            className={activeTab === 'customers' ? 'active' : ''}
            onClick={() => setActiveTab('customers')}
          >
            <FaUsers /> {t('customers')}
          </button>
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            <FaShoppingCart /> {t('orders')}
          </button>
          <button
            className={activeTab === 'chat' ? 'active' : ''}
            onClick={() => setActiveTab('chat')}
          >
            <FaRobot /> {t('ai-chat')}
          </button>
          <button
            className={activeTab === 'upload' ? 'active' : ''}
            onClick={() => setActiveTab('upload')}
          >
            <FaUpload /> {t('upload')}
          </button>
          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            <FaCog /> {t('settings')}
          </button>
        </nav>
      </header>
      <main className="main">
        {activeTab === 'dashboard' && <Dashboard
          stockItems={stockItems}
          customers={customers}
          orders={orders}
          formatMAD={formatMAD}
          formatNumber={formatNumber}
          onNavigate={setActiveTab}
        />}
        {activeTab === 'stock' && <StockManagement stockItems={stockItems} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} formatMAD={formatMAD} />}
        {activeTab === 'customers' && <CustomerManagement customers={customers} addCustomer={addCustomer} updateCustomer={updateCustomer} deleteCustomer={deleteCustomer} />}
        {activeTab === 'orders' && <OrderManagement orders={orders} customers={customers} stockItems={stockItems} addOrder={addOrder} updateOrder={updateOrder} deleteOrder={deleteOrder} updateItem={updateItem} formatMAD={formatMAD} />}
        
        {activeTab === 'chat' && <AIChat stockItems={stockItems} customers={customers} orders={orders} geminiApiKey={geminiApiKey} />}
        {activeTab === 'upload' && <UploadData addItem={addItem} />}
        {activeTab === 'settings' && <Settings geminiApiKey={geminiApiKey} setGeminiApiKey={setGeminiApiKey} />}
      </main>
    </div>
  );
}
function Dashboard({ stockItems, customers, orders, formatMAD, formatNumber, onNavigate }) {
  const totalItems = stockItems.length;
  const totalValue = stockItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const lowStockItems = stockItems.filter(item => item.quantity < 10).length;
  const categories = [...new Set(stockItems.map(item => item.category))].length;
  const totalCustomers = customers.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const getStockHealthStatus = () => {
    if (lowStockItems === 0) return { status: 'excellent', color: '#4CAF50', icon: '✅' };
    if (lowStockItems < 3) return { status: 'good', color: '#FF9800', icon: '⚠️' };
    return { status: 'needs-attention', color: '#F44336', icon: '🚨' };
  };
  const getRevenueStatus = () => {
    if (totalRevenue > 10000) return { status: 'strong', color: '#4CAF50', icon: '📈' };
    if (totalRevenue > 5000) return { status: 'good', color: '#FF9800', icon: '📊' };
    return { status: 'needs-improvement', color: '#F44336', icon: '📉' };
  };
  const stockHealth = getStockHealthStatus();
  const revenueStatus = getRevenueStatus();
  return (
    <div className="fade-in-up">
      <div className="dashboard-header">
        <h2 className="dashboard-title text-4xl font-extrabold text-primary tracking-wide mb-6">{translations['intelligent-dashboard']}</h2>
        <div className="dashboard-subtitle">Aperçu en temps réel de votre activité</div>
      </div>
      <div className="stats-grid">
        <div className="stat-card" onClick={() => onNavigate && onNavigate('stock')}>
          <div className="stat-card-content">
            <div className="stat-icon">📦</div>
            <div className="number">{formatNumber(totalItems)}</div>
            <div className="label">{translations['total-items']}</div>
          </div>
        </div>
        <div className="stat-card" onClick={() => onNavigate && onNavigate('stock')}>
          <div className="stat-card-content">
            <div className="stat-icon">💰</div>
            <div className="number">{formatMAD(totalValue)}</div>
            <div className="label">{translations['total-value']}</div>
          </div>
        </div>
        <div className="stat-card" onClick={() => onNavigate && onNavigate('customers')}>
          <div className="stat-card-content">
            <div className="stat-icon">👥</div>
            <div className="number">{formatNumber(totalCustomers)}</div>
            <div className="label">{translations['total-customers']}</div>
          </div>
        </div>
        <div className="stat-card" onClick={() => onNavigate && onNavigate('orders')}>
          <div className="stat-card-content">
            <div className="stat-icon">📝</div>
            <div className="number">{formatNumber(totalOrders)}</div>
            <div className="label">{translations['total-orders']}</div>
          </div>
        </div>
        <div className="stat-card success" onClick={() => onNavigate && onNavigate('orders')}>
          <div className="stat-card-content">
            <div className="stat-icon">📈</div>
            <div className="number">{formatMAD(totalRevenue)}</div>
            <div className="label">{translations['total-revenue']}</div>
          </div>
        </div>
        <div className="stat-card warning" onClick={() => onNavigate && onNavigate('orders')}>
          <div className="stat-card-content">
            <div className="stat-icon">⏳</div>
            <div className="number">{formatNumber(pendingOrders)}</div>
            <div className="label">{translations['pending-orders']}</div>
          </div>
        </div>
        <div className="stat-card alert" onClick={() => onNavigate && onNavigate('stock')}>
          <div className="stat-card-content">
            <div className="stat-icon">⚠️</div>
            <div className="number">{formatNumber(lowStockItems)}</div>
            <div className="label">{translations['low-stock-alerts']}</div>
          </div>
        </div>
        <div className="stat-card" onClick={() => onNavigate && onNavigate('stock')}>
          <div className="stat-card-content">
            <div className="stat-icon">🗂️</div>
            <div className="number">{formatNumber(categories)}</div>
            <div className="label">{translations['categories']}</div>
          </div>
        </div>
      </div>
      <div className="insights-section">
        <div className="insights-header">
          <h3 className="insights-title">
            <span className="insights-icon">🤖</span>
            {translations['ai-insights']}
          </h3>
          <div className="insights-status">
            <span className={`status-badge ${stockHealth.status}`}>
              {stockHealth.icon} {translations[stockHealth.status]}
            </span>
          </div>
        </div>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">🔧</div>
            <div className="insight-content">
              <h4>{translations['optimizations']}</h4>
              <p>{lowStockItems > 0 ? 'Oui - Réapprovisionnement nécessaire' : 'Non - Stock optimal'}</p>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">{stockHealth.icon}</div>
            <div className="insight-content">
              <h4>{translations['stock-health']}</h4>
              <p style={{ color: stockHealth.color }}>
                {lowStockItems === 0 ? translations['excellent'] :
                 lowStockItems < 3 ? translations['good'] :
                 translations['needs-attention']}
              </p>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">{revenueStatus.icon}</div>
            <div className="insight-content">
              <h4>{translations['sales-performance']}</h4>
              <p style={{ color: revenueStatus.color }}>
                {totalRevenue > 10000 ? translations['strong'] :
                 totalRevenue > 5000 ? translations['good'] :
                 translations['needs-improvement']}
              </p>
            </div>
          </div>
        </div>
        {lowStockItems > 0 && (
          <div className="recommendation-card">
            <div className="recommendation-header">
              <span className="recommendation-icon">💡</span>
              <h4>Recommandation IA</h4>
            </div>
            <p>Réapprovisionnez les articles en faible stock pour éviter les ruptures. {lowStockItems} article(s) nécessitent une attention immédiate.</p>
          </div>
        )}
      </div>
    </div>
  );
}
function StockManagement({ stockItems, addItem, updateItem, deleteItem, formatMAD }) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', quantity: '', price: '', category: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Validate form data
      const quantity = parseFloat(formData.quantity);
      const price = parseFloat(formData.price);
      if (isNaN(quantity) || quantity < 0) {
        alert(translations['quantity'] + ' doit être un nombre positif');
        return;
      }
      if (isNaN(price) || price < 0) {
        alert(translations['price'] + ' doit être un nombre positif');
        return;
      }
      if (!formData.name.trim()) {
        alert('Le nom de l\'article est requis');
        return;
      }
      if (!formData.category.trim()) {
        alert('La catégorie est requise');
        return;
      }
      const validatedData = {
        ...formData,
        quantity: quantity,
        price: price
      };
      if (editingItem) {
        updateItem(editingItem.id, validatedData);
        setEditingItem(null);
      } else {
        addItem(validatedData);
      }
      setFormData({ name: '', quantity: '', price: '', category: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };
  const handleEdit = (item) => {
    try {
      setEditingItem(item);
      setFormData({ name: item.name, quantity: item.quantity, price: item.price, category: item.category || '' });
      setShowForm(true);
    } catch (error) {
      console.error('Erreur lors de l\'édition de l\'article:', error);
      alert('Une erreur s\'est produite lors de l\'édition.');
    }
  };
  const handleDelete = (itemId) => {
    try {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        deleteItem(itemId);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      alert('Une erreur s\'est produite lors de la suppression.');
    }
  };
  // Filter and sort items
  const filteredAndSortedItems = stockItems
    .filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      if (sortBy === 'price' || sortBy === 'quantity') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: 'out-of-stock', color: '#E74C3C', icon: '🚫', text: 'Rupture' };
    if (quantity < 5) return { status: 'low-stock', color: '#E67E22', icon: '⚠️', text: 'Stock faible' };
    if (quantity < 10) return { status: 'medium-stock', color: '#3498DB', icon: '📦', text: 'Stock moyen' };
    return { status: 'good-stock', color: '#2ECC71', icon: '✅', text: 'Stock bon' };
  };
  const getCategoryColor = (category) => {
    const colors = {
      'Électronique': '#3498DB',
      'Informatique': '#2ECC71',
      'Mobilier': '#E67E22',
      'Accessoires': '#BDC3C7',
      'default': '#3498DB'
    };
    return colors[category] || colors.default;
  };
  return (
    <div className="stock-management">
      {/* Header Section */}
      <div className="stock-header">
        <div className="stock-title-section">
          <h2 className="stock-main-title text-3xl font-bold text-primary tracking-wide">{translations['stock-management']}</h2>
          <div className="stock-stats">
            <span className="stat-item">📊 {stockItems.length} articles</span>
            <span className="stat-item">💰 {formatMAD(stockItems.reduce((sum, item) => sum + (item.quantity * item.price), 0))}</span>
          </div>
        </div>
        <button
          className="btn btn-primary add-item-btn"
          onClick={() => setShowForm(true)}
        >
          <FaPlus /> {translations['add-item']}
        </button>
      </div>
      {/* Search and Sort Controls */}
      <div className="stock-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Rechercher par nom ou catégorie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="sort-controls">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Trier par nom</option>
            <option value="category">Trier par catégorie</option>
            <option value="quantity">Trier par quantité</option>
            <option value="price">Trier par prix</option>
          </select>
          <button
            className="sort-order-btn"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '⬆️' : '⬇️'}
          </button>
        </div>
      </div>
      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content stock-form-modal">
            <div className="modal-header">
              <h3>{editingItem ? '✏️ Modifier l\'article' : '➕ Ajouter un article'}</h3>
              <button
                className="modal-close"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  setFormData({ name: '', quantity: '', price: '', category: '' });
                }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="stock-form">
              <div className="form-row">
                <div className="form-group">
                  <label>📦 Nom de l'article</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Dell XPS 13"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>🏷️ Catégorie</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Ex: Électronique"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>🔢 Quantité</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    min="0"
                    step="1"
                    placeholder="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>💰 Prix (MAD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    min="0"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div className="form-buttons">
                <button type="submit" className="btn btn-primary">
                  <FaCheck /> {editingItem ? translations['save'] : translations['add']}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                    setFormData({ name: '', quantity: '', price: '', category: '' });
                  }}
                >
                  <FaTimes /> {translations['cancel']}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Stock Items Table */}
      <div className="stock-table-container">
        {filteredAndSortedItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>Aucun article trouvé</h3>
            <p>{searchTerm ? 'Aucun article ne correspond à votre recherche.' : 'Commencez par ajouter votre premier article de stock.'}</p>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              <span className="btn-icon">➕</span>
              Ajouter le premier article
            </button>
          </div>
        ) : (
          <div className="stock-table-wrapper">
            <table className="stock-table">
              <thead>
                <tr>
                  <th className="col-category">🏷️ Catégorie</th>
                  <th className="col-name">📦 Article</th>
                  <th className="col-quantity">🔢 Quantité</th>
                  <th className="col-price">💰 Prix (MAD)</th>
                  <th className="col-status">📊 Statut</th>
                  <th className="col-actions">⚡ Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedItems.map(item => {
                  const stockStatus = getStockStatus(item.quantity);
                  const categoryColor = getCategoryColor(item.category);
                  return (
                    <tr key={item.id} className="stock-row">
                      <td className="col-category">
                        <span
                          className="category-badge"
                          style={{ backgroundColor: categoryColor }}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td className="col-name">
                        <div className="item-name">{item.name}</div>
                      </td>
                      <td className="col-quantity">
                        <span className="quantity-value">{item.quantity}</span>
                      </td>
                      <td className="col-price">
                        <span className="price-value">{formatMAD(item.price)}</span>
                      </td>
                      <td className="col-status">
                        <span
                          className="status-badge"
                          style={{ backgroundColor: stockStatus.color }}
                        >
                          {stockStatus.icon} {stockStatus.text}
                        </span>
                      </td>
                      <td className="col-actions">
                        <div className="action-buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEdit(item)}
                            title="Modifier"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(item.id)}
                            title="Supprimer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
function AIChat({ stockItems, customers, orders, geminiApiKey }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);
    try {
      let aiResponse;
      if (!geminiApiKey) {
        throw new Error('Gemini API key is missing. Please set it in your .env file.');
      }
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(`You are an AI assistant for stock management. Stock data: ${JSON.stringify(stockItems)}. Customer data: ${JSON.stringify(customers)}. Order data: ${JSON.stringify(orders)}. User query: ${input}`);
      aiResponse = result.response.text();
      const aiMessage = { role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'assistant', content: `Error: ${error.message}` };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fade-in-up">
      <div className="chat-header">
        <div className="ai-assistant-info">
          <div className="ai-avatar">
            <span className="ai-icon">🧠</span>
          </div>
          <div className="ai-details">
            <h2 className="ai-name">Sage IA</h2>
            <p className="ai-subtitle">Votre assistant intelligent pour la gestion de stock</p>
          </div>
        </div>
        <div className="status-indicator online" role="status" aria-live="polite">
          <div className="status-dot" aria-hidden="true"></div>
          <span>En ligne</span>
          <span className="sr-only">Sage IA est en ligne et prêt à répondre à vos questions</span>
        </div>
      </div>
      <div className="chat-messages">
        {messages.length === 0 && !loading && (
          <div className="chat-welcome">
            <div className="welcome-icon">�</div>
            <h3>Sage IA</h3>
            <p>Je peux vous aider avec votre gestion de stock. Posez-moi des questions sur :</p>
            <div className="welcome-examples">
              <div className="example-item" onClick={() => setInput("Quelle est la valeur totale de mon stock ?")}>
                📊 "Quelle est la valeur totale de mon stock ?"
              </div>
              <div className="example-item" onClick={() => setInput("Quels produits sont en rupture de stock ?")}>
                📦 "Quels produits sont en rupture de stock ?"
              </div>
              <div className="example-item" onClick={() => setInput("Quel est mon revenu ce mois-ci ?")}>
                💰 "Quel est mon revenu ce mois-ci ?"
              </div>
              <div className="example-item" onClick={() => setInput("Montrez-moi les tendances de vente")}>
                📈 "Montrez-moi les tendances de vente"
              </div>
            </div>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message-bubble ${msg.role}`}>
            <div className="message-label">
              {msg.role === 'user' ? 'VOUS :' : 'SAGE IA :'}
            </div>
            <div className="message-content">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="message-bubble assistant typing-indicator">
            <div className="message-label">SAGE IA :</div>
            <div className="message-content">
              <div className="typing-animation">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="typing-text">Réflexion en cours...</span>
            </div>
          </div>
        )}
      </div>
      <div className="card chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Posez votre question ici..."
          disabled={loading}
          aria-label="Message à envoyer à Sage IA"
          aria-describedby="chat-input-help"
        />
        <div id="chat-input-help" className="sr-only">
          Tapez votre question et appuyez sur Entrée ou cliquez sur le bouton Envoyer pour poser une question à Sage IA
        </div>
        <button
          className="btn btn-primary"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          aria-label="Envoyer le message"
        >
          {loading ? '⏳' : '➤'} {translations['send'] || 'ENVOYER'}
        </button>
      </div>
    </div>
  );
}
function CustomerManagement({ customers, addCustomer, updateCustomer, deleteCustomer }) {
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
      setEditingCustomer(null);
    } else {
      addCustomer(formData);
    }
    setFormData({ name: '', email: '', phone: '', address: '' });
    setShowForm(false);
  };
  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({ name: customer.name, email: customer.email, phone: customer.phone, address: customer.address });
    setShowForm(true);
  };
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary tracking-wide mb-6">{translations['customer-management']}</h2>
      <button className="btn" onClick={() => setShowForm(true)}><FaPlus /> {translations['add-customer']}</button>
      {showForm && (
        <div className="card">
          <h3>{editingCustomer ? translations['edit-customer'] : translations['add-new-customer']}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={translations['customer-name']}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder={translations['email-address']}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder={translations['phone-number']}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder={translations['address']}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
            <button type="submit" className="btn"><FaCheck /> {editingCustomer ? translations['update'] : translations['add']}</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditingCustomer(null); setFormData({ name: '', email: '', phone: '', address: '' }); }}><FaTimes /> {translations['cancel']}</button>
          </form>
        </div>
      )}
      <div className="card">
        <h3>{translations['customers']}</h3>
        {customers.length === 0 ? (
          <p>{translations['no-customers-yet']}</p>
        ) : (
          <div>
            {customers.map(customer => (
              <div key={customer.id} className="stock-item">
                <strong>{customer.name}</strong>
                <div className="details">
                  {translations['email']}: {customer.email} | {translations['phone']}: {customer.phone}
                </div>
                <div className="details">
                  {translations['address']}: {customer.address}
                </div>
                <div className="actions">
                  <button className="edit-btn" onClick={() => handleEdit(customer)}><FaEdit /> {translations['edit']}</button>
                  <button className="delete-btn" onClick={() => deleteCustomer(customer.id)}><FaTrash /> {translations['delete']}</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function OrderManagement({ orders, customers, stockItems, addOrder, updateOrder, deleteOrder, updateItem, formatMAD }) {
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    customerId: '',
    items: [],
    notes: '',
    status: 'pending'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const t = (key) => translations[key] || key;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingOrder) {
      updateOrder(editingOrder.id, formData);
    } else {
      addOrder({
        ...formData,
        customerName: customers.find(c => c.id === parseInt(formData.customerId))?.name || '',
        date: new Date().toISOString().split('T')[0],
        total: formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
      });
    }
    setShowForm(false);
    setEditingOrder(null);
    setFormData({ customerId: '', items: [], notes: '', status: 'pending' });
  };
  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      customerId: order.customerId,
      items: order.items,
      notes: order.notes || '',
      status: order.status
    });
    setShowForm(true);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#2ECC71';
      case 'processing': return '#F39C12';
      case 'pending': return '#F39C12';
      case 'cancelled': return '#C0392B';
      default: return '#7F8C8D';
    }
  };
  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Complétée';
      case 'processing': return 'En cours';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return (
    <div className="order-management">
      <div className="section-header">
        <h2>Gestion des Commandes</h2>
        <button className="btn btn-primary create-order-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> CRÉER UNE COMMANDE
        </button>
      </div>
      <div className="filters-section">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher par client ou numéro de commande..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <FaFilter className="filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="processing">En cours</option>
            <option value="completed">Complétée</option>
            <option value="cancelled">Annulée</option>
          </select>
        </div>
      </div>
      <div className="orders-grid">
        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            <FaShoppingCart className="empty-icon" />
            <h3>Aucune commande trouvée</h3>
            <p>Créez votre première commande pour commencer.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3 className="order-title">Commande #{order.id} – {order.customerName}</h3>
                <span className="order-date">{order.date}</span>
              </div>
              <div className="order-items">
                <h4>Articles commandés :</h4>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} (x{item.quantity}) - {formatMAD(item.price * item.quantity)}
                    </li>
                  ))}
                </ul>
              </div>
              {order.notes && (
                <div className="order-notes">
                  <strong>Notes :</strong> <em>{order.notes}</em>
                </div>
              )}
              <div className="order-footer">
                <div className="order-total">
                  <strong>Total : {formatMAD(order.total)}</strong>
                </div>
                <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                  {getStatusText(order.status)}
                </div>
                <div className="order-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(order)}>
                    Modifier
                  </button>
                  <button className="btn btn-delete" onClick={() => deleteOrder(order.id)}>
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content order-form-modal">
            <div className="modal-header">
              <h3>{editingOrder ? 'Modifier la commande' : 'Créer une nouvelle commande'}</h3>
              <button className="close-btn" onClick={() => { setShowForm(false); setEditingOrder(null); }}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Client :</label>
                <select
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  required
                >
                  <option value="">Sélectionner un client</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Articles :</label>
                <div className="items-selection">
                  {stockItems.map(item => (
                    <div key={item.id} className="item-selection">
                      <input
                        type="checkbox"
                        id={`item-${item.id}`}
                        checked={formData.items.some(i => i.stockId === item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              items: [...formData.items, {
                                stockId: item.id,
                                name: item.name,
                                quantity: 1,
                                price: item.price
                              }]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              items: formData.items.filter(i => i.stockId !== item.id)
                            });
                          }
                        }}
                      />
                      <div className="item-info">
                        <div className="item-name">{item.name}</div>
                        <div className="item-details">
                          <span className="item-stock">Stock: {item.quantity}</span>
                          <span className="item-price">{formatMAD(item.price)}</span>
                        </div>
                      </div>
                      {formData.items.some(i => i.stockId === item.id) && (
                        <input
                          type="number"
                          min="1"
                          max={item.quantity}
                          value={formData.items.find(i => i.stockId === item.id)?.quantity || 1}
                          onChange={(e) => {
                            const quantity = parseInt(e.target.value);
                            setFormData({
                              ...formData,
                              items: formData.items.map(i =>
                                i.stockId === item.id ? { ...i, quantity } : i
                              )
                            });
                          }}
                          className="quantity-input"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Notes :</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Notes optionnelles..."
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Statut :</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="pending">En attente</option>
                  <option value="processing">En cours</option>
                  <option value="completed">Complétée</option>
                  <option value="cancelled">Annulée</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <FaCheck /> {editingOrder ? 'Mettre à jour' : 'Créer'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingOrder(null);
                    setFormData({ customerId: '', items: [], notes: '', status: 'pending' });
                  }}
                >
                  <FaTimes /> Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
