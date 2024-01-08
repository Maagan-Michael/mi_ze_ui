import React, { useState } from 'react';
import styled from 'styled-components';
var BACKEND="http://127.0.0.1:8000"



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

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  color: black;
`;

const Option = styled.option`
  font-size: 16px;
  color: black;
`;

const SelectedFaceId = styled.p`
  font-size: 16px;
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
  const [selectedPersonId, setSelectedPersonId] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedPersonId(selectedId);

    // Find the selected person based on the ID
    const selectedPerson = persons.find((person) => person.person_id === selectedId);
    console.log(selectedPerson?.name);
  };

const handleFilteredPersonClick = (selectedPersonId: string) => {
    setSelectedPersonId(selectedPersonId);

    // Find the selected person based on the ID
    const selectedPerson = persons.find((person) => person.person_id === selectedPersonId);
    const updatedFace: FaceDataModel = { ...face, person_id: selectedPersonId, is_verified: true };
    // Send HTTP request to the backend
    console.log(updatedFace);
    fetch(BACKEND +'/faces/' + face.face_id , {
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
        })
        .catch((error) => {
            // Handle any errors
            console.error(error);
        });
};



  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <UpdateFaceContainer>
      <Label>Do you know the person is?:</Label>


      <FilterInput
        type="text"
        placeholder="Filter persons..."
        value={filterText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
      />

      {filteredPersons.map((person) => (
        <FilteredPerson
          key={person.person_id}
          onClick={() => handleFilteredPersonClick(person.person_id)}
        >
          {person.name}
        </FilteredPerson>
      ))}

      <SelectedFaceId>Selected Face ID: {face.face_id}</SelectedFaceId>
    </UpdateFaceContainer>
  );
};

export default UpdateFace;
