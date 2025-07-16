# Drone-Based Road Damage Detection & Mapping

An AI-powered full-stack web application for automatic road crack detection and mapping using drone-captured images.

## Features
- Upload drone images via a modern web dashboard
- Automatic crack segmentation using a pretrained U-Net (ResNet34) model
- GPS extraction from image EXIF metadata
- Overlay of detected cracks on the original image
- Interactive map with GPS marker and overlay preview
- Responsive, modern UI (React + TailwindCSS)

## Tech Stack
- **Frontend:** React, Vite, TypeScript, TailwindCSS, Axios
- **Backend:** FastAPI, Python, segmentation-models-pytorch, OpenCV, Pillow, Folium, ExifRead
- **Model:** U-Net (ResNet34 encoder), trained on DeepCrack dataset

## Project Structure
```
Drone Based/
├── backend/
│   ├── main.py
│   ├── utils.py
│   ├── model_loader.py
│   ├── models/
│   │   └── unet_deepcrack_best.pth
│   ├── static/
│   ├── maps/
│   ├── uploads/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadForm.tsx
│   │   │   ├── ResultPreview.tsx
│   │   │   └── MapViewer.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Setup Instructions

### 1. Backend (FastAPI)
1. **Install Python 3.8+** and [pip](https://pip.pypa.io/en/stable/).
2. Create and activate a virtual environment:
   ```sh
   cd backend
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # or
   source venv/bin/activate  # On Mac/Linux
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Place your trained model at `backend/models/unet_deepcrack_best.pth`.
5. Start the backend server:
   ```sh
   uvicorn main:app --reload
   ```
   The API will be available at [http://localhost:8000](http://localhost:8000).

### 2. Frontend (React + Vite)
1. **Install Node.js (v18+) and npm**
2. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
3. Start the frontend dev server:
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

## Usage
1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Upload a drone image (with GPS EXIF data).
3. View the detected cracks, GPS coordinates, and interactive map.

## Notes
- The backend must be running for the frontend to work.
- Only images with GPS EXIF metadata will show a map location.
- For best results, use high-quality drone images.

## Kaggle Reference
- [Original U-Net Crack Detection Pipeline on Kaggle](https://www.kaggle.com/code/artipixel/notebook6077eef179)
- [SUT-CRACK DATASET](https://data.mendeley.com/datasets/gsbmknrhkv/6)
- [DEEPCRACK DATASET](https://github.com/yhlleo/DeepCrack/blob/master/dataset/DeepCrack.zip)

## License
This project is for academic/research use. Contact the author for other uses. 
