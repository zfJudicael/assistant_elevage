"""Logique métier / accès aux données pour les courbes de croissance."""
from sqlalchemy.orm import Session

from app.db import models
from app.schemas import growth_data as schemas


def get_growth_data(db: Session, group_id: str):
    return db.query(models.GrowthData).filter(
        models.GrowthData.group_id == group_id
    ).order_by(models.GrowthData.day).all()


def create_growth_data(db: Session, group_id: str, growth: schemas.GrowthDataCreate):
    db_growth = models.GrowthData(**growth.model_dump(), group_id=group_id)
    db.add(db_growth)
    db.commit()
    db.refresh(db_growth)
    return db_growth


def delete_growth_data(db: Session, growth_id: int) -> bool:
    db_growth = db.query(models.GrowthData).filter(
        models.GrowthData.id == growth_id
    ).first()
    if not db_growth:
        return False
    db.delete(db_growth)
    db.commit()
    return True
