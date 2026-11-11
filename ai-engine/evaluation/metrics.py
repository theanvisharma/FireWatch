"""
Model Evaluation and Calibration Utilities for FireWatch AI.
"""
from typing import Dict, Any
import numpy as np
from sklearn.metrics import (
    roc_auc_score,
    brier_score_loss,
    precision_recall_curve,
    f1_score,
    confusion_matrix
)


def evaluate_predictions(y_true: np.ndarray, y_proba: np.ndarray, threshold: float = 0.5) -> Dict[str, Any]:
    """
    Computes rigorous metrics for wildfire ignition forecasting.
    Includes Brier score (critical for probability calibration).
    """
    y_pred = (y_proba >= threshold).astype(int)
    
    auc = roc_auc_score(y_true, y_proba)
    brier = brier_score_loss(y_true, y_proba)
    f1 = f1_score(y_true, y_pred)
    tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
    
    return {
        "roc_auc": round(float(auc), 4),
        "brier_score": round(float(brier), 4),
        "f1_score": round(float(f1), 4),
        "true_positives": int(tp),
        "false_positives": int(fp),
        "true_negatives": int(tn),
        "false_negatives": int(fn),
        "detection_rate_recall": round(float(tp / (tp + fn + 1e-6)), 4),
        "false_alarm_rate": round(float(fp / (fp + tn + 1e-6)), 4)
    }

