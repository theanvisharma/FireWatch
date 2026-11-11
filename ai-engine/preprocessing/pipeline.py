import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from ai-engine.preprocessing.feature_engineering import engineer_features


FEATURE_COLUMNS = [
    'temperature',
    'wind_speed',
    'rainfall_72h',
    'soil_moisture',
    'relative_humidity',
    'ndvi',
    'slope',
    'elevation',
    'vpd_kpa',
    'fuel_dryness_index',
    'wind_slope_factor'
]


class WildfireFeatureTransformer(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self

    def transform(self, X):
        df = X if isinstance(X, pd.DataFrame) else pd.DataFrame(X)
        transformed = engineer_features(df)
        return transformed[FEATURE_COLUMNS]


def create_preprocessing_pipeline() -> Pipeline:
    """Builds a scikit-learn standard pipeline for feature transformation and scaling."""
    return Pipeline([
        ('feature_engineering', WildfireFeatureTransformer()),
        ('scaler', StandardScaler())
    ])

