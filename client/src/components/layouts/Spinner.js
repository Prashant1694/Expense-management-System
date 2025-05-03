import React from 'react';
import './Spinner.css'; // optional: if using external CSS

const Spinner = ({ message = "Waking up The Server! Please Wait, This May Take A Moment" }) => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-content">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Spinner;
