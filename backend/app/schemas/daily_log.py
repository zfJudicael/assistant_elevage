"""Schémas Pydantic pour les journaux quotidiens (DailyLog)."""
from typing import Optional

from pydantic import BaseModel, ConfigDict
from datetime import date as date_type


class DailyLogBase(BaseModel):
    date: date_type
    avg_weight_g: Optional[float] = None
    mortality: int = 0
    symptom: Optional[str] = None
    # feed: Optional[float] = None
    # water: Optional[float] = None
    # temp_min: Optional[float] = None
    # temp_max: Optional[float] = None
    # humidity: Optional[float] = None
    # lit_quality: Optional[str] = None


class DailyLogCreate(DailyLogBase):
    pass

class DailyLogUpdate(DailyLogBase):
    """Mise à jour partielle : tous les champs sont optionnels."""
    date: Optional[date_type] = None
    avg_weight_g: Optional[float] = None
    mortality: Optional[int] = None
    symptom: Optional[str] = None


class DailyLogOut(DailyLogBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    group_id: str
