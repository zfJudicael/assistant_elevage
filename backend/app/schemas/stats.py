"""Schéma Pydantic pour les statistiques agrégées."""
from pydantic import BaseModel


class SummaryStats(BaseModel):
    total_groups: int
    total_birds_active: int
    total_birds_initial: int
    total_mortality: int
    average_mortality_rate: float
    groups_by_status: dict
