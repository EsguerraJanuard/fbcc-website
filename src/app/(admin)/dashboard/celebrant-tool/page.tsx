"use client";

import { useState, useRef, useEffect } from "react";

export default function CelebrantToolPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [frameImg, setFrameImg] = useState<HTMLImageElement | null>(null);
  const [portraitImg, setPortraitImg] = useState<HTMLImageElement | null>(null);
  
  // Portrait transform state
  const [scale, setScale] = useState(1);
  const [baseScale, setBaseScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // Canvas fixed dimensions (e.g., 1080x1080 for Instagram)
  const CANVAS_SIZE = 1080;

  // Handle file uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "frame" | "portrait") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const img = new window.Image();
    
    img.onload = () => {
      if (type === "frame") setFrameImg(img);
      if (type === "portrait") {
        setPortraitImg(img);
        
        // Calculate initial scale to fit exactly within canvas dimensions
        const initialScale = Math.max(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height);
        
        // Reset transforms
        setScale(initialScale);
        setBaseScale(initialScale);
        setOffsetX(0);
        setOffsetY(0);
      }
      
      URL.revokeObjectURL(objectUrl);
    };
    
    img.src = objectUrl;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (portraitImg) {
      const pWidth = portraitImg.width * scale;
      const pHeight = portraitImg.height * scale;
      const startX = (canvas.width - pWidth) / 2 + offsetX;
      const startY = (canvas.height - pHeight) / 2 + offsetY;
      ctx.drawImage(portraitImg, startX, startY, pWidth, pHeight);
    }

    if (frameImg) {
      ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
    }
  }, [frameImg, portraitImg, scale, offsetX, offsetY]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "fbcc-celebrant-export.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">Celebrant Canvas</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
          Merge transparent PNG overlays with portrait photos to quickly generate perfect 1080x1080 social media graphics for birthdays and anniversaries.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Controls Panel */}
        <div className="w-full lg:w-5/12 space-y-6 order-2 lg:order-1">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
            
            {/* Uploads */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-fbcc-navy mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">1. Upload Assets</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Overlay Frame (Transparent PNG)</label>
                  <input type="file" accept="image/png" onChange={(e) => handleImageUpload(e, "frame")} className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Person's Portrait (JPG/PNG)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "portrait")} className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>

            {/* Adjustments */}
            <div className={!portraitImg ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-fbcc-navy mb-4 border-b border-gray-100 dark:border-gray-800 pb-2 flex justify-between items-center">
                2. Adjust Portrait
                <button onClick={() => { setScale(baseScale); setOffsetX(0); setOffsetY(0); }} className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 dark:text-gray-400 hover:bg-gray-200 transition-colors">Reset</button>
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="flex justify-between text-sm font-bold text-gray-600 dark:text-gray-300 mb-2">
                    <span>Zoom (Scale)</span>
                    <span className="text-fbcc-ocean dark:text-blue-300">{scale.toFixed(2)}x</span>
                  </label>
                  <input type="range" min="0.1" max="3" step="0.01" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fbcc-ocean" />
                </div>
                <div>
                  <label className="flex justify-between text-sm font-bold text-gray-600 dark:text-gray-300 mb-2">
                    <span>Move Horizontal (X)</span>
                    <span className="text-fbcc-ocean dark:text-blue-300">{offsetX}px</span>
                  </label>
                  <input type="range" min="-1000" max="1000" step="10" value={offsetX} onChange={(e) => setOffsetX(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fbcc-ocean" />
                </div>
                <div>
                  <label className="flex justify-between text-sm font-bold text-gray-600 dark:text-gray-300 mb-2">
                    <span>Move Vertical (Y)</span>
                    <span className="text-fbcc-ocean dark:text-blue-300">{offsetY}px</span>
                  </label>
                  <input type="range" min="-1000" max="1000" step="10" value={offsetY} onChange={(e) => setOffsetY(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fbcc-ocean" />
                </div>
              </div>
            </div>

            {/* Export */}
            <div className="pt-2">
              <button onClick={handleDownload} disabled={!frameImg || !portraitImg} className="w-full bg-fbcc-navy hover:bg-fbcc-ocean text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Graphic
              </button>
            </div>

          </div>
        </div>

        {/* Canvas Preview Panel */}
        <div className="w-full lg:w-7/12 order-1 lg:order-2 lg:sticky lg:top-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-fbcc-navy mb-6 self-start border-b border-gray-100 dark:border-gray-800 pb-2 w-full">Live Preview</h3>
            
            <div className="w-full aspect-square bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden relative shadow-inner">
              {(!frameImg && !portraitImg) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                  <svg className="w-16 h-16 mb-4 opacity-30 text-fbcc-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p className="font-medium text-gray-500 dark:text-gray-400">Upload a frame and portrait to see preview</p>
                </div>
              )}
              
              {/* Actual hidden high-res canvas used for drawing/export */}
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="w-full h-full object-contain"
                style={{ display: (frameImg || portraitImg) ? 'block' : 'none' }}
              />
            </div>
            
            <p className="text-xs font-bold text-gray-400 mt-6 uppercase tracking-widest bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg">
              Output format: 1080x1080 (Square)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
