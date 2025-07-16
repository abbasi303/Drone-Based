import React from 'react';

type MapViewerProps = {
  mapUrl: string;
};

const MapViewer: React.FC<MapViewerProps> = ({ mapUrl }) => {
  if (!mapUrl) return null;
  return (
    <div className="w-full flex flex-col items-center p-6 bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-blue-100 max-w-xs transition-transform hover:scale-[1.03]">
      <div className="w-[200px] h-[200px] flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl shadow-inner border border-blue-200 mb-2 overflow-hidden">
        <iframe
          src={`http://localhost:8000${mapUrl}`}
          title="Crack Map"
          className="w-full h-full rounded-lg border-none"
          style={{ border: 0 }}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default MapViewer; 