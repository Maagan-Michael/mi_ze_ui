import React from 'react';

var BACKEND = "http://127.0.0.1:8000";

interface NavBarProps {
  setPersonsData: React.Dispatch<React.SetStateAction<any[]>>;
}

const NavBar: React.FC<NavBarProps> = ({ setPersonsData }) => {
  const handleAddPerson = async () => {
    // Ask the user for the new person's name
    const newName = prompt('Enter the name of the new person:');
    
    if (newName) {
      try {
        var person :PersonDataModel = {name: newName, person_id: "",verified_faces:[]}
        // Make an HTTP request to create a new person
        const response = await fetch(`${BACKEND}/persons`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([person]),
        });

        if (response.ok) {
          // If the request is successful, update the persons data
          const newPerson = await response.json();
          setPersonsData((prevPersons) => [...prevPersons, newPerson]);
        } else {
          console.error('Failed to create a new person:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error creating a new person:', error);
      }
    }
  };

  return (
    <nav style={navStyles}>
      <div style={titleContainerStyles}>
        <h1 style={titleStyles}>Mi ZE</h1>
      </div>
      <div style={buttonContainerStyles}>
        <button style={buttonStyles} onClick={handleAddPerson}>
          Add Person
        </button>
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
  zIndex: 1000,
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
