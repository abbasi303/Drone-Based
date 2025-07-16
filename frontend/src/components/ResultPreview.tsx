import React from 'react';

type ResultPreviewProps = {
  imageUrl: string;
  gps: { lat: number; lon: number };
};

const ResultPreview: React.FC<ResultPreviewProps> = ({ imageUrl, gps }) => {
  if (!imageUrl) return null;
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-blue-100 w-full max-w-xs transition-transform hover:scale-[1.03]">
      <div className="w-[200px] h-[200px] flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl shadow-inner border border-blue-200 mb-2 overflow-hidden">
        <img src={`http://localhost:8000${imageUrl}`} alt="Crack Overlay" className="rounded-lg object-contain w-full h-full" />
      </div>
      <div className="text-base text-blue-900 font-semibold mt-2 bg-blue-50/60 px-3 py-1 rounded-full shadow-sm">
        <span className="font-bold text-blue-700">GPS:</span> {gps.lat.toFixed(6)}, {gps.lon.toFixed(6)}
      </div>
    </div>
  );
};

export default ResultPreview; 