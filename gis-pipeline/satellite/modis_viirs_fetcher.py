"""
Piyusha's NASA FIRMS MODIS & VIIRS Ingestion Utility.
Retrieves active thermal anomalies and hotspot observations via NASA FIRMS REST API or CSV feeds.
"""
import os
import requests
import pandas as pd
from datetime import datetime, timedelta
from typing import Optional


class FirmsHotspotFetcher:
    BASE_URL = "https://firms.modaps.eosdis.nasa.gov/api/country/csv"

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("NASA_FIRMS_MAP_KEY", "DEMO_KEY")

    def fetch_recent_hotspots(self, country_code: str = "IND", days: int = 1, source: str = "VIIRS_SNPP_NRT") -> pd.DataFrame:
        """
        Fetches active fire observations for a specified country and sensor.
        Sources: 'VIIRS_SNPP_NRT', 'VIIRS_NOAA20_NRT', 'MODIS_NRT'
        """
        print(f"[PIYUSHA - GIS] Requesting NASA FIRMS {source} hotspots for {country_code} (Past {days} days)...")
        
        # In mock or prototype mode, generate fallback DataFrame if API key is unset
        if self.api_key in ["DEMO_KEY", "", None]:
            print("[PIYUSHA - GIS] Running in DEMO mode: generating simulated FIRMS hotspot records.")
            return pd.DataFrame([
                {
                    "latitude": 18.7557,
                    "longitude": 73.4091,
                    "brightness": 338.4,
                    "scan": 0.38,
                    "track": 0.58,
                    "acq_date": datetime.utcnow().strftime("%Y-%m-%d"),
                    "acq_time": "0830",
                    "satellite": "Suomi-NPP",
                    "confidence": "nominal",
                    "frp": 14.8,
                    "daynight": "D"
                },
                {
                    "latitude": 22.4633,
                    "longitude": 78.4344,
                    "brightness": 352.1,
                    "scan": 0.42,
                    "track": 0.61,
                    "acq_date": datetime.utcnow().strftime("%Y-%m-%d"),
                    "acq_time": "0835",
                    "satellite": "NOAA-20",
                    "confidence": "high",
                    "frp": 28.5,
                    "daynight": "D"
                }
            ])
            
        url = f"{self.BASE_URL}/{self.api_key}/{source}/{country_code}/{days}"
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        from io import StringIO
        return pd.read_csv(StringIO(response.text))


if __name__ == "__main__":
    fetcher = FirmsHotspotFetcher()
    df = fetcher.fetch_recent_hotspots()
    print(df.head())

