"""Logique métier / accès aux données pour les vaccinations."""
from sqlalchemy.orm import Session

from app.db import models
from app.schemas import vaccination as schemas


def get_vaccinations(db: Session, group_id: str):
    return db.query(models.Vaccination).filter(
        models.Vaccination.group_id == group_id
    ).all()


def create_vaccination(db: Session, group_id: str, vacc: schemas.VaccinationCreate):
    db_vacc = models.Vaccination(**vacc.model_dump(), group_id=group_id)
    db.add(db_vacc)
    db.commit()
    db.refresh(db_vacc)
    return db_vacc


def update_vaccination_status(db: Session, vacc_id: int, status: str):
    db_vacc = db.query(models.Vaccination).filter(
        models.Vaccination.id == vacc_id
    ).first()
    if not db_vacc:
        return None
    db_vacc.status = status
    db.commit()
    db.refresh(db_vacc)
    return db_vacc


def delete_vaccination(db: Session, vacc_id: int) -> bool:
    db_vacc = db.query(models.Vaccination).filter(
        models.Vaccination.id == vacc_id
    ).first()
    if not db_vacc:
        return False
    db.delete(db_vacc)
    db.commit()
    return True
