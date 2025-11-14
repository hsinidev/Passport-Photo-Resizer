
import type { PhotoStandard, CropBox } from '../types';

function mmToPx(mm: number, dpi: number): number {
    return (mm / 25.4) * dpi;
}

export function draw(
    canvas: HTMLCanvasElement, 
    image: HTMLImageElement | null, 
    cropBox: CropBox, 
    bgColor: string,
    standard: PhotoStandard
) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (image) {
        // Calculate aspect ratios
        const canvasAspect = canvas.width / canvas.height;
        const imageAspect = image.width / image.height;
        
        let drawWidth, drawHeight, drawX, drawY;

        if (imageAspect > canvasAspect) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imageAspect;
            drawX = 0;
            drawY = (canvas.height - drawHeight) / 2;
        } else {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imageAspect;
            drawY = 0;
            drawX = (canvas.width - drawWidth) / 2;
        }

        ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    }
    
    // Draw semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Clear the crop area
    ctx.clearRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
    
    // Draw image inside crop area again
    if (image) {
        const sx = (cropBox.x / canvas.width) * image.width;
        const sy = (cropBox.y / canvas.height) * image.height;
        const sWidth = (cropBox.width / canvas.width) * image.width;
        const sHeight = (cropBox.height / canvas.height) * image.height;
        ctx.drawImage(image, sx, sy, sWidth, sHeight, cropBox.x, cropBox.y, cropBox.width, cropBox.height);
    } else {
        ctx.fillStyle = bgColor;
        ctx.fillRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
    }

    // Draw crop box border
    ctx.strokeStyle = '#06b6d4'; // cyan-500
    ctx.lineWidth = 2;
    ctx.strokeRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);

    // Draw resize handle
    const handleSize = 10;
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(cropBox.x + cropBox.width - handleSize / 2, cropBox.y + cropBox.height - handleSize / 2, handleSize, handleSize);

    // Draw helper lines (e.g., for head position)
    const headTopY = cropBox.y + cropBox.height * 0.2;
    const chinBottomY = cropBox.y + cropBox.height * 0.7;
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.moveTo(cropBox.x, headTopY);
    ctx.lineTo(cropBox.x + cropBox.width, headTopY);
    ctx.moveTo(cropBox.x, chinBottomY);
    ctx.lineTo(cropBox.x + cropBox.width, chinBottomY);
    ctx.stroke();
    ctx.setLineDash([]);
}

export function cropAndExport(
    image: HTMLImageElement,
    cropBox: CropBox,
    standard: PhotoStandard,
    format: 'jpeg' | 'png',
    bgColor: string
) {
    const finalWidthPx = mmToPx(standard.widthMM, standard.dpi);
    const finalHeightPx = mmToPx(standard.heightMM, standard.dpi);

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = finalWidthPx;
    tempCanvas.height = finalHeightPx;
    const ctx = tempCanvas.getContext('2d');

    if (!ctx) {
        console.error("Could not get 2D context for cropping canvas");
        return;
    }

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, finalWidthPx, finalHeightPx);

    // Calculate the source crop region from the original image
    // This requires mapping the preview canvas cropBox back to original image coordinates
    
    // Find the scale of the displayed image relative to original
    const previewCanvas = document.querySelector('canvas')!; // a bit hacky, but works for this context
    const canvasAspect = previewCanvas.width / previewCanvas.height;
    const imageAspect = image.width / image.height;

    let scale: number;
    if (imageAspect > canvasAspect) {
        scale = previewCanvas.width / image.width;
    } else {
        scale = previewCanvas.height / image.height;
    }

    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const drawX = (previewCanvas.width - drawWidth) / 2;
    const drawY = (previewCanvas.height - drawHeight) / 2;

    const sourceX = (cropBox.x - drawX) / scale;
    const sourceY = (cropBox.y - drawY) / scale;
    const sourceWidth = cropBox.width / scale;
    const sourceHeight = cropBox.height / scale;

    ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0, 0, finalWidthPx, finalHeightPx
    );

    const dataUrl = tempCanvas.toDataURL(`image/${format}`, format === 'jpeg' ? 0.95 : undefined);

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `passport_photo.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
