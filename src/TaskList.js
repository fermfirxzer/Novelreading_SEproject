// src/BranchList.js
import React, { useState, useEffect } from 'react';

const BranchList = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    // Fetch branches from the server when the component mounts
    fetch('http://localhost:5000/api/tasks')
      .then((response) => response.json())
      .then((data) => setBranches(data))
      .catch((error) => console.error('Error fetching branches:', error));
  }, []);

  return (
    <div>
      <h2>Branch List</h2>
      <ul>
        {branches.map((branch) => (
          <li key={branch.branch_id}>Branch ID: {branch.branch_id}</li>
        ))}
      </ul>
    </div>
  );
};

export default BranchList;
