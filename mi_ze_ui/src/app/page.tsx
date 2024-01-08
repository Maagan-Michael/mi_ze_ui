"use client";

import Image from 'next/image'
import ImageWithClickableBoxes from './image_with_faces';
import ImageWithFaces from './image_with_faces';
import ParentComponent from './image_with_faces_list';
import ImageWithFacesList from './image_with_faces_list';
import NavBar from './nav_bar';
import { useEffect, useState } from 'react';
const imageUrl = 'https://images.toucharger.com/img/graphiques/fonds-d-ecran/nature--paysages/coucher-de-soleil/polynesie.72440.jpg'; // Replace with a valid image URL
var BACKEND="http://127.0.0.1:8000"

export default function Home() {

  const [personsData, setPersonsData] = useState<PersonDataModel[]>([]);

  useEffect(() => {
    // Fetch people data and set it to the state
    const fetchData = async () => {
      try {
        const response = await fetch(BACKEND +"/persons");
        const data = await response.json();
        setPersonsData(data);
      } catch (error) {
        console.error('Error fetching people data:', error);
      }
    };

    fetchData();
  }, []); //
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
     <NavBar setPersonsData={setPersonsData}/>

      <ImageWithFacesList imagesEndpoint={BACKEND + "/images"} persons={personsData}/>
      
    </main>
  )
}
