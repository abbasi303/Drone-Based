from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import os
import uuid
from model_loader import get_model
from utils import preprocess_image, predict_crack_mask, extract_gps_from_exif, generate_map
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/maps", StaticFiles(directory="maps"), name="maps")

model = get_model()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(file: UploadFile = File(...)):
    # Save uploaded file
    upload_id = str(uuid.uuid4())
    upload_path = os.path.join("uploads", f"{upload_id}_{file.filename}")
    with open(upload_path, "wb") as f:
        f.write(file.file.read())

    # Preprocess image
    tensor_input, original_img = preprocess_image(upload_path)

    # Predict mask
    mask = predict_crack_mask(model, tensor_input)

    # Extract GPS
    lat, lon = extract_gps_from_exif(upload_path)

    # Save overlay and generate map
    overlay_path = os.path.join("static", f"overlay_{upload_id}.png")
    map_path = os.path.join("maps", f"map_{upload_id}.html")
    generate_map(lat, lon, original_img, mask, overlay_path, map_path)

    # Build URLs
    overlay_url = f"/static/overlay_{upload_id}.png"
    map_url = f"/maps/map_{upload_id}.html"

    return JSONResponse({
        "image_url": overlay_url,
        "gps": {"lat": lat, "lon": lon},
        "map_url": map_url
    }) 