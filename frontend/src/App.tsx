import { useState } from 'react';
import UploadForm from './components/UploadForm';
import ResultPreview from './components/ResultPreview';
import MapViewer from './components/MapViewer';

function App() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-400 animate-gradient-x">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-blue-100 mt-8 mb-8 transition-all duration-300">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-lg">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l1.664 9.155A2 2 0 006.63 18h10.74a2 2 0 001.967-1.845L21 7M5 7V5a2 2 0 012-2h10a2 2 0 012 2v2M9 11h6" /></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2 text-center drop-shadow-sm tracking-tight">
            Drone-Based Road Damage Detection
          </h1>
          <p className="text-blue-700 text-lg font-medium text-center max-w-xl mb-2">AI-powered detection and mapping of road cracks from drone imagery. Upload your image to get instant results!</p>
        </div>
        <UploadForm onUploadResult={setResult} />
        {result && (
          <div className="flex flex-col md:flex-row gap-10 mt-12 w-full items-start justify-center">
            <div className="flex-1 flex flex-col items-center">
              <h2 className="text-lg font-semibold text-blue-800 mb-2 tracking-wide">Detection Result</h2>
              <ResultPreview imageUrl={result.image_url} gps={result.gps} />
            </div>
            <div className="flex-1 flex flex-col items-center">
              <h2 className="text-lg font-semibold text-blue-800 mb-2 tracking-wide">Location Map</h2>
              <MapViewer mapUrl={result.map_url} />
            </div>
          </div>
        )}
      </div>
      <footer className="mb-4 text-gray-400 text-xs tracking-wide">&copy; {new Date().getFullYear()} RoadAI Project</footer>
    </div>
  );
}

export default App;
