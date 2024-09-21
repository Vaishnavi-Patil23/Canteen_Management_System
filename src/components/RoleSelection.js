// src/components/RoleSelection.js
import React from 'react';

const RoleSelection = ({ onRoleSelect }) => {
  const handleRoleSelect = (role) => {
    onRoleSelect(role);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>Select Your Role</h1>
      <button onClick={() => handleRoleSelect('customer')} style={{ marginRight: '20px', padding: '10px 20px' }}>
        Customer
      </button>
      <button onClick={() => handleRoleSelect('owner')} style={{ padding: '10px 20px' }}>
        Owner
      </button>
    </div>
  );
};

export default RoleSelection;
