import React from 'react';

const Placeholder = ({ text }) => {
  return (
    <div style={{ padding: '20px', border: '1px dashed gray', textAlign: 'center' }}>
      <h2>{text}</h2>
    </div>
  );
};

export default Placeholder;