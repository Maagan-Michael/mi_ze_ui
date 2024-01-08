"use client"


import { FC, useEffect, useState } from 'react';
import ImageWithFaces from './image_with_faces';

interface ImageWithFacesListProps {
  // You may need to adjust this based on the actual endpoint and request structure
  imagesEndpoint: string;
}

const ImageWithFacesList: FC<ImageWithFacesListProps> = ({ imagesEndpoint }) => {
  const [images, setImages] = useState<ImageDataModel[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(imagesEndpoint);
        const data = await response.json();
        setImages(data); // Assuming the response is an array of ImageDataModel
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [imagesEndpoint]);

  return (
    <div>
      <h1>List of Images with Faces</h1>
      {images.map((imageData, index) => (
        <ImageWithFaces key={index} imageData={imageData} />
      ))}
    </div>
  );
};

export default ImageWithFacesList;
