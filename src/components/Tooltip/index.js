import React from 'react';

const Tooltip = ({ top, left, data }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        width: '200px',
      }}
    >
      <h4 style={{ margin: '0 0 10px 0', color: '#1890F9' }}>{data.title}</h4>
      <p style={{ margin: 0 }}>
        <strong>Population: </strong> {data.population}
      </p>
      <p style={{ margin: 0 }}>
        <strong>Capital: </strong> {data.capital}
      </p>
    </div>
  );
};

export default Tooltip;
