import React from 'react'
const Alert = ({ message, onClose }) => {
    return (
      <div style={styles.alertContainer}>
        <div style={styles.alertBox}>
          <p>{message}</p>
          <button onClick={onClose} style={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    );
  };
  const styles = {
    alertContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    alertBox: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
    },
    closeButton: {
      marginTop: '10px',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '3px',
      backgroundColor: '#007BFF',
      color: '#fff',
      cursor: 'pointer',
    },
  };

export default Alert