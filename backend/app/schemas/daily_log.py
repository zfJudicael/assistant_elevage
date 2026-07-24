"""Schémas Pydantic pour les journaux quotidiens (DailyLog)."""
from typing import Optional

from pydantic import BaseModel, ConfigDict


class DailyLogBase(BaseModel):
    # day: str
    avg_weight_g: Optional[float] = None
    mortality: int = 0
    # feed: Optional[float] = None
    # water: Optional[float] = None
    # temp_min: Optional[float] = None
    # temp_max: Optional[float] = None
    # humidity: Optional[float] = None
    # lit_quality: Optional[str] = None


class DailyLogCreate(DailyLogBase):
    pass


class DailyLogOut(DailyLogBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    group_id: str
