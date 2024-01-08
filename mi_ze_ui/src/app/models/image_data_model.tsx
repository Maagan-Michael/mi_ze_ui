interface ImageDataModel {
    image_id: string;
    image_path: string;
    metadata: Record<string, any>;
    faces: FaceDataModel[];
  }