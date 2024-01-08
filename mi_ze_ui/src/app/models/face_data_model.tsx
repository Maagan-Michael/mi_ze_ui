interface FaceDataModel {
    image_id: string;
    face_id: string;
    face_image_path: string;
    person_id: string;
    box: { x: number; y: number; w: number; h: number };
    certainty: number;
    face_encoding: number[] | null;
    is_verified: boolean;
  }
  