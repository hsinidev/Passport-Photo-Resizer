import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { PhotoStandard, CropBox } from '../types';
import { draw, cropAndExport } from '../services/imageProcessor';

const STANDARDS: PhotoStandard[] = [
    { name: 'US Passport (2x2 in)', widthMM: 51, heightMM: 51, dpi: 300 },
    { name: 'UK Passport (35x45 mm)', widthMM: 35, heightMM: 45, dpi: 600 },
    { name: 'Indian Visa (51x51 mm)', widthMM: 51, heightMM: 51, dpi: 300 },
    { name: 'Schengen Visa (35x45 mm)', widthMM: 35, heightMM: 45, dpi: 600 },
    { name: 'Canadian Passport (50x70 mm)', widthMM: 50, heightMM: 70, dpi: 600 },
];

const PhotoResizerTool: React.FC = () => {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [selectedStandard, setSelectedStandard] = useState<PhotoStandard>(STANDARDS[0]);
    const [outputFormat, setOutputFormat] = useState<'jpeg' | 'png'>('jpeg');
    const [bgColor, setBgColor] = useState<string>('#ffffff');
    const [cropBox, setCropBox] = useState<CropBox>({ x: 50, y: 50, width: 200, height: 200 });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const [interaction, setInteraction] = useState<{ type: 'move' | 'resize' | null, startX: number, startY: number, startBox: CropBox }>({ type: null, startX: 0, startY: 0, startBox: cropBox });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setImage(img);
                    const canvas = canvasRef.current;
                    if (canvas) {
                        const aspectRatio = selectedStandard.widthMM / selectedStandard.heightMM;
                        const initialWidth = Math.min(img.width, canvas.width) * 0.5;
                        const initialHeight = initialWidth / aspectRatio;
                        setCropBox({
                            x: (canvas.width - initialWidth) / 2,
                            y: (canvas.height - initialHeight) / 2,
                            width: initialWidth,
                            height: initialHeight
                        });
                    }
                };
                img.src = event.target!.result as string;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const redrawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        draw(canvas, image, cropBox, bgColor, selectedStandard);
    }, [image, cropBox, bgColor, selectedStandard]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !containerRef.current) return;
        
        const resizeCanvas = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            const aspectRatio = 4 / 3;
            canvas.width = containerWidth;
            canvas.height = containerWidth / aspectRatio;
            redrawCanvas();
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [redrawCanvas]);

    useEffect(() => {
        const aspectRatio = selectedStandard.widthMM / selectedStandard.heightMM;
        setCropBox(prev => ({ ...prev, height: prev.width / aspectRatio }));
    }, [selectedStandard, cropBox.width]); // added cropBox.width dependency

    useEffect(() => {
        redrawCanvas();
    }, [redrawCanvas]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const { x: bx, y: by, width: bw, height: bh } = cropBox;
        const handleSize = 10;
        
        // Check for resize handle
        if ( x > bx + bw - handleSize && x < bx + bw + handleSize &&
             y > by + bh - handleSize && y < by + bh + handleSize ) {
            setInteraction({ type: 'resize', startX: x, startY: y, startBox: cropBox });
        // Check for move
        } else if (x > bx && x < bx + bw && y > by && y < by + bh) {
            setInteraction({ type: 'move', startX: x, startY: y, startBox: cropBox });
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (interaction.type === null || !image) return;

        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = x - interaction.startX;
        const dy = y - interaction.startY;

        if (interaction.type === 'move') {
            setCropBox(prev => ({
                ...prev,
                x: Math.max(0, Math.min(canvas.width - prev.width, interaction.startBox.x + dx)),
                y: Math.max(0, Math.min(canvas.height - prev.height, interaction.startBox.y + dy)),
            }));
        } else if (interaction.type === 'resize') {
            const aspectRatio = selectedStandard.widthMM / selectedStandard.heightMM;
            const newWidth = Math.max(50, interaction.startBox.width + dx);
            const newHeight = newWidth / aspectRatio;

            if (interaction.startBox.x + newWidth < canvas.width && interaction.startBox.y + newHeight < canvas.height) {
                setCropBox(prev => ({
                    ...prev,
                    width: newWidth,
                    height: newHeight,
                }));
            }
        }
    };

    const handleMouseUp = () => {
        setInteraction({ type: null, startX: 0, startY: 0, startBox: cropBox });
    };

    const handleDownload = () => {
        if (!image) {
            alert("Please upload an image first.");
            return;
        }
        cropAndExport(image, cropBox, selectedStandard, outputFormat, bgColor);
    };

    return (
        <section className="bg-gray-900 bg-opacity-60 border border-gray-700 rounded-2xl p-4 md:p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex flex-col space-y-6">
                    <div>
                        <label className="block text-lg font-medium text-cyan-400 mb-2">1. Upload Photo</label>
                        <label htmlFor="file-upload" className="w-full text-center cursor-pointer bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white transition-colors">
                            Choose an Image
                        </label>
                        <input id="file-upload" type="file" accept="image/jpeg, image/png" onChange={handleFileChange} className="hidden" />
                    </div>
                     <div>
                        <label htmlFor="standard" className="block text-lg font-medium text-cyan-400 mb-2">2. Select Standard</label>
                        <select
                            id="standard"
                            value={selectedStandard.name}
                            onChange={(e) => setSelectedStandard(STANDARDS.find(s => s.name === e.target.value)!)}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        >
                            {STANDARDS.map(s => <option key={s.name}>{s.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="format" className="block text-lg font-medium text-cyan-400 mb-2">3. Extra Options</label>
                        <div className="flex space-x-2">
                           <select
                                id="format"
                                value={outputFormat}
                                onChange={(e) => setOutputFormat(e.target.value as 'jpeg' | 'png')}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                            >
                                <option value="jpeg">JPEG</option>
                                <option value="png">PNG</option>
                            </select>
                             <input
                                type="color"
                                id="bgcolor"
                                title="Background Color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-14 h-auto p-1 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="flex-grow"></div>
                    <button
                        onClick={handleDownload}
                        disabled={!image}
                        className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-lg text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        Crop & Download Photo
                    </button>
                </div>

                <div className="md:col-span-2 relative" ref={containerRef}>
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className={`w-full h-auto bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-600 ${image ? 'cursor-grab active:cursor-grabbing' : ''}`}
                    />
                     {!image && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-400 font-semibold text-xl">Image Preview Area</p>
                             <p className="text-gray-500">Upload an image to begin cropping</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PhotoResizerTool;