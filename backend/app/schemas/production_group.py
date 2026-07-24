"""Schémas Pydantic pour les lots de production (ProductionGroup)."""
from datetime import date
from typing import Optional, List

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

from app.schemas.daily_log import DailyLogOut
from app.schemas.vaccination import VaccinationOut
# from app.schemas.growth_data import GrowthDataOut


class ProductionGroupBase(BaseModel):
    model_config =  ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )
    batch_name: str
    # date_enter: date
    count: int = 0
    # mortality: float = 0.0
    status: Optional[str] = "Healthy"
    # house: Optional[str] = None
    # section: Optional[str] = None
    breed: str
    hatch_date: date
    mortality_total: Optional[int] = 0
    # feed_intake: Optional[float] = None
    # water_intake: Optional[float] = None
    # last_vaccination: Optional[str] = None
    # next_vaccination: Optional[str] = None
    active_symptoms: Optional[str] = None
    health_alert: Optional[str] = None


class ProductionGroupCreate(ProductionGroupBase):
    """Création : l'id est fourni par le client (ex: 'BR-2023-07')."""
    # id: str


class ProductionGroupUpdate(BaseModel):
    """Mise à jour partielle : tous les champs sont optionnels."""
    batch_name: Optional[str] = None
    # date_enter: Optional[date] = None
    count: Optional[int] = None
    # mortality: Optional[float] = None
    status: Optional[str] = None
    # house: Optional[str] = None
    # section: Optional[str] = None
    breed: Optional[str] = None
    # hatch_date: Optional[date] = None
    # active: Optional[int] = None
    mortality_total: Optional[int] = None
    # feed_intake: Optional[float] = None
    # water_intake: Optional[float] = None
    # last_vaccination: Optional[str] = None
    # next_vaccination: Optional[str] = None
    # active_symptoms: Optional[str] = None
    health_alert: Optional[str] = None


class ProductionGroupOut(ProductionGroupBase):
    """Réponse résumée (sans les listes détaillées) — GET /groups."""
    model_config = ConfigDict(from_attributes=True)
    id: int
    age_days: int
    mortality: float
    active: int


class ProductionGroupDetailOut(ProductionGroupOut):
    """Réponse complète avec relations — GET /groups/{id}."""
    daily_logs: List[DailyLogOut] = []
    # vaccinations: List[VaccinationOut] = []
    # growth_data: List[GrowthDataOut] = []
