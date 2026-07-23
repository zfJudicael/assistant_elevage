"""Schémas Pydantic pour les vaccinations (Vaccination)."""
from typing import Optional

from pydantic import BaseModel, ConfigDict


class VaccinationBase(BaseModel):
    day: str
    date: Optional[str] = None
    treatment: str
    status: str = "SCHEDULED"


class VaccinationCreate(VaccinationBase):
    pass


class VaccinationOut(VaccinationBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    group_id: str
