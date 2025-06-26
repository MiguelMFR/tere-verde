import React from 'react';
import './AdminHeader.css';

const AdminHeader = ({ title, onAddClick, currentCategory }) => {
  return (
    <div className="admin-header">
      <h1 className="admin-title">{title}</h1>
      <button 
        className="btn"
        onClick={onAddClick}
      >
        Adicionar {currentCategory}
      </button>
    </div>
  );
};

export default AdminHeader; 