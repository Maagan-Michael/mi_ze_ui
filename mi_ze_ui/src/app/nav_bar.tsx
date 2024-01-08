import React from 'react';

interface NavBarProps {
  setPersonsData: React.Dispatch<React.SetStateAction<any[]>>; // Adjust the type based on your actual data structure
}
const NavBar: React.FC<NavBarProps> = ({ setPersonsData }) => {  return (
    <nav style={navStyles}>
      <div style={titleContainerStyles}>
        <h1 style={titleStyles}>Mi ZE</h1>
      </div>
      <div style={buttonContainerStyles}>
        <button style={buttonStyles}>Add Person</button>
        <button style={buttonStyles}>Add Image</button>
      </div>
    </nav>
  );
};

const navStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  background: '#333',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  zIndex: 1000, // Ensure it's above other elements
};

const titleContainerStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const titleStyles: React.CSSProperties = {
  margin: 0,
  color: '#fff',
  fontSize: '1.5rem',
  fontWeight: 700,
};

const buttonContainerStyles: React.CSSProperties = {
  display: 'flex',
};

const buttonStyles: React.CSSProperties = {
  marginRight: '1rem',
  padding: '0.5rem 1rem',
  background: 'lightblue',
  border: 'none',
  borderRadius: '4px',
  color: '#333',
  cursor: 'pointer',
  transition: 'background 0.3s',
};

export default NavBar;
