import { Area } from "react-easy-crop";
import { createImage } from "./createImage"

export default async function getCroppedImg(imageSrc: string, crop: Area) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  const { width, height } = crop;

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    width,
    height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "cropped-image.png", { type: blob.type });
        resolve(file);
      }
    }, "image/png");
  });
}
