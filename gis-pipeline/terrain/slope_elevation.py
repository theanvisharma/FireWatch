"""
Piyusha's SRTM Digital Elevation Model (DEM) and Slope Processor.
Slope angle strongly dictates wildfire rate of spread (ROS) via convective preheating.
"""
import numpy as np


def compute_slope_aspect_horn(dem_grid: np.ndarray, cell_size_meters: float = 30.0) -> np.ndarray:
    """
    Computes slope in degrees from a DEM raster array using Horn's 3x3 kernel method.
    """
    # Gradient in X and Y directions
    dz_dx, dz_dy = np.gradient(dem_grid, cell_size_meters)
    slope_rad = np.arctan(np.sqrt(dz_dx**2 + dz_dy**2))
    slope_deg = np.degrees(slope_rad)
    return slope_deg


def estimate_slope_factor(slope_degrees: float) -> float:
    """
    Rothermel flame spread multiplier based on terrain slope.
    A 30-degree incline can increase rate of forward spread by 3x.
    """
    return 5.275 * (np.tan(np.radians(slope_degrees)) ** 2)

