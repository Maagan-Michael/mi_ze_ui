import React, { useState } from 'react';
import styled from 'styled-components';

// Snackbar component to display success or error messages
const Snackbar = styled.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px;
  background-color: ${(props) => (props.isSuccess ? 'green' : 'red')};
  color: white;
  border-radius: 4px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

var BACKEND = 'http://127.0.0.1:8000';

interface UpdateFaceProps {
  persons: PersonDataModel[];
  face: FaceDataModel;
}

const UpdateFaceContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1.0);
  background-color: black;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  color: black;
`;

const FilteredPerson = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:hover {
    background-color: #ddd;
  }
`;

const UpdateFace: React.FC<UpdateFaceProps> = ({ persons, face }) => {
  const [filterText, setFilterText] = useState<string>('');
  const [isSnackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [isSuccessSnackbar, setSuccessSnackbar] = useState<boolean>(false);

  const handleFilteredPersonClick = (selectedPersonId: string) => {
    const selectedPerson = persons.find((person) => person.person_id === selectedPersonId);
    const updatedFace: FaceDataModel = { ...face, person_id: selectedPersonId, is_verified: true };

    fetch(BACKEND + '/faces/' + face.face_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFace),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log(data);
        setSnackbarVisible(true);
        setSuccessSnackbar(true);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        setSnackbarVisible(true);
        setSuccessSnackbar(false);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return isSnackbarVisible? ( <Snackbar isVisible={isSnackbarVisible} isSuccess={isSuccessSnackbar} onClick={handleCloseSnackbar}>
    {isSuccessSnackbar ? 'Request successful!' : 'Error in the request.'}
  </Snackbar>):(
    <UpdateFaceContainer>
      <Label>Do you know the person is?:</Label>

      <FilterInput
        type="text"
        placeholder="Filter persons..."
        value={filterText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
      />

      {filteredPersons.map((person) => (
        <FilteredPerson key={person.person_id} onClick={() => handleFilteredPersonClick(person.person_id)}>
          {person.name}
        </FilteredPerson>
      ))}



      <p>Selected Face ID: {face.face_id}</p>
    </UpdateFaceContainer>
      
  );
};

export default UpdateFace;
