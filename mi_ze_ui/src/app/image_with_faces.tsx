// ImageWithFaces.tsx
import { FC, useEffect, useState } from 'react';
import FaceComponent from './face';
var BACKEND="http://127.0.0.1:8000"

interface ImageWithFacesProps {
  imageData: ImageDataModel;
  persons: PersonDataModel[];
}

const ImageWithFaces: FC<ImageWithFacesProps> = ({ imageData, persons }) => {
  const [image, setImage] = useState<HTMLImageElement  | null>(null);
  const [selectedFaceId, setSelectedFaceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const img = new Image();
        img.src = BACKEND + "/images/media/" + imageData.image_id;

        img.onload = () => {
          setImage(img);
        };
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [imageData.image_id]);



  useEffect(() => {
    const handleResize = () => {
      // Recalculate box positions and sizes based on new image dimensions
      // You might want to handle aspect ratio adjustments if needed
      forceUpdate();
    };

    const forceUpdate = () => {
      // This forces a re-render
      setImage((prevImage) => prevImage);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [image]);

  const handleFaceClick = (faceId: string) => {
    if(selectedFaceId === faceId) {
      setSelectedFaceId(null);
      return;
    }
    setSelectedFaceId(faceId);
    // Perform any other actions when a box is clicked
    console.log(`Box with ID ${faceId} clicked`);
  };

  if (!image) {
    return <div>Loading image...</div>;
  }

  const getPersonById = (persons: PersonDataModel[], id: string): PersonDataModel | undefined => {
    const person = persons.find(person => person.person_id === id);
    return person;
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
    <img
      src={image.src}
      alt="Your Image"
      style={{ width: '100%', height: 'auto' }}
    />
    {imageData.faces.map((face) => (
      <FaceComponent
        key={face.face_id}
        face={face}
        imageData={imageData}
        person={getPersonById(persons, face.person_id) as PersonDataModel}
        handleFaceClick={handleFaceClick}
        selectedFaceId={selectedFaceId}
      />
    ))}
  </div>
  
  );
};

export default ImageWithFaces;


