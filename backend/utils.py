import cv2
import torch
import numpy as np
import exifread
import folium
import base64
from PIL import Image as PILImage
from io import BytesIO
import torchvision.transforms as transforms
import os

def preprocess_image(image_path, target_size=(512, 512)):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    resized = cv2.resize(image, target_size)
    tensor = transforms.ToTensor()(resized)
    return tensor.unsqueeze(0), image

def predict_crack_mask(model, image_tensor, threshold=0.5):
    with torch.no_grad():
        output = model(image_tensor)
        mask = torch.sigmoid(output).squeeze().cpu().numpy()
        return (mask > threshold).astype(np.uint8)

def extract_gps_from_exif(image_path):
    with open(image_path, 'rb') as f:
        tags = exifread.process_file(f)
    def get_decimal_from_dms(dms, ref):
        degrees = dms.values[0].num / dms.values[0].den
        minutes = dms.values[1].num / dms.values[1].den
        seconds = dms.values[2].num / dms.values[2].den
        decimal = degrees + minutes/60 + seconds/3600
        if ref in ['S', 'W']:
            decimal *= -1
        return decimal
    try:
        lat = get_decimal_from_dms(tags['GPS GPSLatitude'], tags['GPS GPSLatitudeRef'])
        lon = get_decimal_from_dms(tags['GPS GPSLongitude'], tags['GPS GPSLongitudeRef'])
        return lat, lon
    except KeyError:
        return 0.0, 0.0

def generate_map(lat, lon, original_img, mask, overlay_path, map_path):
    mask_resized = cv2.resize(mask, (original_img.shape[1], original_img.shape[0]))
    overlay = original_img.copy()
    overlay[mask_resized == 1] = [255, 0, 0]
    img = PILImage.fromarray(overlay)
    img.save(overlay_path)
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode()
    m = folium.Map(location=[lat, lon], zoom_start=20)
    html = f'<img src="data:image/png;base64,{encoded}" width="300">'
    popup = folium.Popup(html, max_width=300)
    folium.Marker([lat, lon], popup=popup, icon=folium.Icon(color="red")).add_to(m)
    m.save(map_path)
    return map_path 