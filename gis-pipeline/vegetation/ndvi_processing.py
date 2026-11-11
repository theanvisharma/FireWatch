"""
Piyusha's Sentinel-2 NDVI (Normalized Difference Vegetation Index) calculation pipeline.
Formula: NDVI = (NIR - Red) / (NIR + Red)
NDVI values < 0.2 indicate bare dry soil or rock; values > 0.6 indicate dense healthy vegetation.
"""
import numpy as np


def calculate_ndvi(nir_band: np.ndarray, red_band: np.ndarray) -> np.ndarray:
    """
    Computes NDVI array from Sentinel-2 Band 8 (NIR) and Band 4 (Red).
    Handles zero-division and invalid pixel values gracefully.
    """
    numerator = nir_band.astype(float) - red_band.astype(float)
    denominator = nir_band.astype(float) + red_band.astype(float)
    
    with np.errstate(divide='ignore', invalid='ignore'):
        ndvi = np.where(denominator != 0, numerator / denominator, -1.0)
        
    return np.clip(ndvi, -1.0, 1.0)


def classify_fuel_status(ndvi_value: float) -> str:
    """Classifies vegetation into fuel flammability categories based on NDVI."""
    if ndvi_value < 0.15:
        return "Barren / Mineral Earth (Non-combustible)"
    elif ndvi_value < 0.30:
        return "Severe Senescence / Dry Scrub (High Flammability)"
    elif ndvi_value < 0.50:
        return "Moderate Moisture / Mixed Canopy (Moderate Flammability)"
    else:
        return "Hydrated Canopy / Dense Forest (Low Ignition Vulnerability)"

