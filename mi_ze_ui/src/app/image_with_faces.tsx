// ImageWithFaces.tsx
import { FC, useEffect, useState } from 'react';
var BACKEND="http://127.0.0.1:8000"

interface ImageWithFacesProps {
  imageData: ImageDataModel;
}

const ImageWithFaces: FC<ImageWithFacesProps> = ({ imageData }) => {
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

  return (
    <div style={{ position: 'relative', width: '100%' }}>
    <img
      src={image.src}
      alt="Your Image"
      style={{ width: '100%', height: 'auto' }}
    />
    {imageData.faces.map((face) => (
      <div
        key={face.face_id}
        onClick={() => handleFaceClick(face.face_id)}
        style={{
          position: 'absolute',
          left: `${(face.box.x / imageData.metadata.original_width) * 100}%`,
          top: `${(face.box.y / imageData.metadata.original_height) * 100}%`,
          width: `${(face.box.w / imageData.metadata.original_width) * 100}%`,
          height: `${(face.box.h / imageData.metadata.original_height) * 100}%`,
          border: selectedFaceId === face.face_id ? '6px solid red' : '4px solid green',
          cursor: 'pointer',
        }}
      >
       <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', color: 'white', background: 'rgba(0, 0, 0, 0.7)', padding: '2px', borderRadius: '4px' }}>
        <p>{`${face.person_id}`}</p>
        <p>{`${face.is_verified?"verified": face.certainty}`}</p>
      </div>
      <div style={{ border: selectedFaceId === face.face_id ? '6px solid red' : '4px solid green' }}></div>
    </div>
    ))}
  </div>
  
  );
};

export default ImageWithFaces;


