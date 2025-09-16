import React, { useRef } from 'react';
import * as XLSX from 'xlsx';
import translations from './translations';
import { FaUpload } from 'react-icons/fa';

function UploadData({ addItem }) {
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      json.forEach(row => {
        // Expecting columns: name, quantity, price, category
        if (row.name && row.quantity && row.price && row.category) {
          addItem({
            name: row.name,
            quantity: Number(row.quantity),
            price: Number(row.price),
            category: row.category
          });
        }
      });
      alert(translations['upload-successful']);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2>{translations['upload-stock-data']}</h2>
      <div className="card">
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <button
          className="btn btn-primary"
          onClick={() => fileInputRef.current.click()}
          style={{ width: '100%', marginBottom: '1rem' }}
        >
          <FaUpload /> {translations['select-file']}
        </button>
        <p>{translations['upload-excel-file']}</p>
      </div>
    </div>
  );
}

export default UploadData;
