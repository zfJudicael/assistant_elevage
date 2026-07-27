"""Schémas Pydantic pour les données de croissance (GrowthData)."""
from typing import Optional

from pydantic import BaseModel, ConfigDict


class GrowthDataBase(BaseModel):
    day: int
    actual: Optional[float] = None
    target: float


class GrowthDataCreate(GrowthDataBase):
    pass


class GrowthDataOut(GrowthDataBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    group_id: str
