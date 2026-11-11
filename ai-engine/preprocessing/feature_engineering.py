import numpy as np
import pandas as pd


def compute_vapor_pressure_deficit(temperature_c: pd.Series, relative_humidity: pd.Series) -> pd.Series:
    """
    Computes Vapor Pressure Deficit (VPD) in kPa.
    Higher VPD signifies atmospheric dryness and accelerated fuel dehydration.
    """
    # Saturated Vapor Pressure (Tetens equation)
    svp = 0.61078 * np.exp((17.27 * temperature_c) / (temperature_c + 237.3))
    # Actual Vapor Pressure
    avp = svp * (relative_humidity / 100.0)
    return np.maximum(svp - avp, 0.0)


def compute_fuel_dryness_index(ndvi: pd.Series, soil_moisture: pd.Series) -> pd.Series:
    """
    Computes Fuel Dryness Index (0 to 1).
    Inverse relationship with vegetation health and volumetric water content.
    """
    # Normalize NDVI from [-1, 1] to [0, 1]
    norm_ndvi = np.clip((ndvi + 1.0) / 2.0, 0.0, 1.0)
    norm_moisture = np.clip(soil_moisture / 100.0, 0.0, 1.0)
    
    # Low NDVI + Low Soil Moisture = Maximum fuel dryness (close to 1)
    dryness = 1.0 - (0.4 * norm_ndvi + 0.6 * norm_moisture)
    return np.clip(dryness, 0.0, 1.0)


def compute_wind_slope_alignment(wind_speed: pd.Series, slope_degrees: pd.Series) -> pd.Series:
    """
    Approximates terrain-driven fire spread acceleration.
    Steep slopes act as chimney flues for wind.
    """
    slope_rad = np.radians(slope_degrees)
    slope_multiplier = 1.0 + np.sin(slope_rad)
    return wind_speed * slope_multiplier


def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """Applies all physical and meteorological feature transformations."""
    processed = df.copy()
    
    processed['vpd_kpa'] = compute_vapor_pressure_deficit(
        processed['temperature'],
        processed['relative_humidity']
    )
    
    processed['fuel_dryness_index'] = compute_fuel_dryness_index(
        processed['ndvi'],
        processed['soil_moisture']
    )
    
    processed['wind_slope_factor'] = compute_wind_slope_alignment(
        processed['wind_speed'],
        processed['slope']
    )
    
    return processed

