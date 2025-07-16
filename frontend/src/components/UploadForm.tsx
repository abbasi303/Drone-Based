import React, { useState } from 'react';
import axios from 'axios';

type UploadFormProps = {
  onUploadResult: (result: any) => void;
};

const UploadForm: React.FC<UploadFormProps> = ({ onUploadResult }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:8000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUploadResult(res.data);
    } catch (err: any) {
      setError('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-5 items-center p-8 bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-blue-100 mt-2 mb-2 transition-all duration-300">
      <label className="w-full flex flex-col items-center cursor-pointer">
        <span className="mb-3 text-base text-blue-700 font-semibold">Select a drone image</span>
        <input type="file" accept="image/*" onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-base file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition" />
      </label>
      <button type="submit" className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-bold shadow hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-lg disabled:opacity-60" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
};

export default UploadForm; 