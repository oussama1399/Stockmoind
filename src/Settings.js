import React, { useState } from 'react';
import translations from './translations';
import { FaEye, FaEyeSlash, FaSave, FaTrash, FaCheck, FaExclamationTriangle, FaKey, FaInfoCircle } from 'react-icons/fa';

function Settings({ geminiApiKey, setGeminiApiKey }) {
  const [inputKey, setInputKey] = useState(geminiApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSave = () => {
    if (!inputKey.trim()) {
      setFeedback({ type: 'error', message: 'Veuillez entrer une clé API valide.' });
      return;
    }

    setGeminiApiKey(inputKey);
    setFeedback({ type: 'success', message: 'Votre clé API Gemini a été ajoutée avec succès.' });
    setTimeout(() => setFeedback({ type: '', message: '' }), 5000);
  };

  const handleClear = () => {
    setShowConfirmModal(true);
  };

  const confirmClear = () => {
    setGeminiApiKey('');
    setInputKey('');
    setShowConfirmModal(false);
    setFeedback({ type: 'success', message: 'La clé API a été supprimée avec succès.' });
    setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="settings-title">Configuration de l'Assistant IA Gemini</h1>
        <p className="settings-description">Connectez votre clé API Gemini pour activer le chat IA.</p>
      </div>

      <div className="settings-content">
        <div className="api-config-card">
          <div className="card-header">
            <div className="card-icon">🔐</div>
            <h2 className="card-title">Configuration de l'API</h2>
          </div>

          <div className="form-group">
            <label className="form-label">
              <FaKey className="label-icon" />
              Clé API
              <span className="tooltip-icon" title="Votre clé API Google Gemini pour accéder au service d'IA">
                <FaInfoCircle />
              </span>
            </label>
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Entrez votre clé API Gemini ici..."
                  className="api-key-input"
                  aria-label="Clé API Gemini"
                  aria-describedby="api-key-help"
                />
                <div className="input-icon">🔑</div>
              </div>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="toggle-visibility-btn"
                aria-label={showKey ? 'Masquer la clé API' : 'Afficher la clé API'}
              >
                {showKey ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div id="api-key-help" className="input-help">
              Votre clé API sera stockée localement et ne sera jamais transmise à des serveurs externes.
            </div>
          </div>

          <div className="button-group">
            <button onClick={handleSave} className="btn btn-primary save-btn" disabled={!inputKey.trim()}>
              <FaSave />
              Sauvegarder la clé API
            </button>
            <button onClick={handleClear} className="btn btn-secondary clear-btn" disabled={!geminiApiKey}>
              <FaTrash />
              Effacer la clé API
            </button>
          </div>

          {feedback.message && (
            <div className={`feedback-message ${feedback.type}`}>
              <div className="feedback-icon">
                {feedback.type === 'success' ? <FaCheck /> : <FaExclamationTriangle />}
              </div>
              <div className="feedback-content">
                <strong>{feedback.type === 'success' ? 'Succès' : 'Erreur'}</strong>
                <p>{feedback.message}</p>
              </div>
            </div>
          )}

          {geminiApiKey && (
            <div className="status-indicator active">
              <div className="status-icon">✅</div>
              <div className="status-content">
                <strong>Clé API configurée</strong>
                <p>Votre clé API Gemini est définie et prête à être utilisée avec la fonctionnalité de chat IA.</p>
              </div>
            </div>
          )}

          {!geminiApiKey && (
            <div className="status-indicator inactive">
              <div className="status-icon">⚠️</div>
              <div className="status-content">
                <strong>Clé API requise</strong>
                <p>Veuillez entrer votre clé API Gemini ci-dessus pour utiliser la fonctionnalité de chat IA.</p>
              </div>
            </div>
          )}

          <div className="help-section">
            <h4>Comment obtenir une clé API Gemini :</h4>
            <ol>
              <li>Allez sur <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a></li>
              <li>Connectez-vous avec votre compte Google</li>
              <li>Cliquez sur "Créer une clé API"</li>
              <li>Copiez la clé générée</li>
              <li>Collez-la dans le champ ci-dessus et cliquez sur "Sauvegarder la clé API"</li>
            </ol>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <div className="modal-header">
              <h3>Confirmer la suppression</h3>
            </div>
            <div className="modal-body">
              <p>Êtes-vous sûr de vouloir supprimer votre clé API Gemini ? Cette action est irréversible.</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowConfirmModal(false)} className="btn btn-secondary">
                Annuler
              </button>
              <button onClick={confirmClear} className="btn btn-danger">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;