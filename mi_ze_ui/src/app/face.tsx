import React,{ useState } from 'react';
interface FaceComponentProps {
    face: FaceDataModel;
    imageData: ImageDataModel;
    person: PersonDataModel | null;
    handleFaceClick: (faceId: string) => void;
    selectedFaceId: string | null;

    }
    
    interface FaceComponentProps {
      face: FaceDataModel;
      imageData: ImageDataModel;
      person: PersonDataModel | null;
      handleFaceClick: (faceId: string) => void;
      selectedFaceId: string | null;
    }
    
    const FaceComponent: React.FC<FaceComponentProps> = ({
      face,
      imageData,
      person,
      selectedFaceId,
      handleFaceClick,
    }) => {
      const [isHovered, setIsHovered] = useState(false);
    
      return (
        <div
          key={face.face_id}
          onClick={() => handleFaceClick(face.face_id)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'absolute',
            left: `${(face.box.x / imageData.metadata.original_width) * 100}%`,
            top: `${(face.box.y / imageData.metadata.original_height) * 100}%`,
            width: `${(face.box.w / imageData.metadata.original_width) * 100}%`,
            height: `${(face.box.h / imageData.metadata.original_height) * 100}%`,
            border: selectedFaceId === face.face_id ? '3px solid red' : '2px solid green',
            cursor: 'pointer',
          }}
        >
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                top: '-60px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                background: 'rgba(0, 0, 0, 0.7)',
                padding: '2px',
                borderRadius: '4px',
              }}
            >
              <p>{`${person == null ? 'unknown' : person.name}`}</p>
              <p>{`${face.is_verified ? 'Verified' :  `${(face.certainty*100).toFixed(1)}%`} `}</p>
            </div>
          )}
        </div>
      );
    };
    
    export default FaceComponent;
    