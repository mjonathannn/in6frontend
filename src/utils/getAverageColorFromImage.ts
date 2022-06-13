import { RGBColor } from './conversion/getLowAndHighColorsFromRGB';

export const getAverageColorFromImage = (image: HTMLImageElement): RGBColor => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const defaultRGB = { r: 0, g: 0, b: 0 };
  if (!context) return defaultRGB;

  canvas.width = image.naturalWidth || image.offsetWidth || image.width;
  canvas.height = image.naturalHeight || image.offsetHeight || image.height;
  const { width, height } = canvas;

  try {
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, width, height);
    const { length } = imageData.data;

    let count = 0;
    const finalColor = { r: 0, g: 0, b: 0 };
    const blockSize = 5 * 4; // only visit every 5 pixels

    for (let ind = -4 + blockSize; ind < length; ind += blockSize, count++) {
      finalColor.r += imageData.data[ind];
      finalColor.g += imageData.data[ind + 1];
      finalColor.b += imageData.data[ind + 2];
    }

    finalColor.r = Math.floor(finalColor.r / count);
    finalColor.g = Math.floor(finalColor.g / count);
    finalColor.b = Math.floor(finalColor.b / count);

    return finalColor;
  } catch (err) {
    return defaultRGB;
  }
};
