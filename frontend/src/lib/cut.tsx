import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage'; // Utility function to crop the image

interface ImageCropperProps {
  imageSrc: string; // Source of the image
  onCropComplete: (croppedAreaPixels: any) => void; // Function called when crop is complete
  aspect?: number; // Aspect ratio (default is 1 for square)
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onCropComplete, aspect = 1 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      onCropComplete(croppedAreaPixels);
    },
    [onCropComplete]
  );

  return (
    <div className="crop-container" style={{ position: 'relative', width: '100%', height: '300px' }}>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};
