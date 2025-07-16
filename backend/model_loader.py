# model_loader.py
import torch
import segmentation_models_pytorch as smp
import os

def get_model(model_path=None):
    if model_path is None:
        model_path = os.path.join(os.path.dirname(__file__), 'models', 'unet_deepcrack_best.pth')
    
    model = smp.Unet(
        encoder_name="resnet34",
        encoder_weights="imagenet",
        in_channels=3,
        classes=1,
    )
    
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
    return model
