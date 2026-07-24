"""Logique métier / accès aux données pour les lots de production."""
from typing import Optional

from sqlalchemy.orm import Session

from app.db import models
from app.schemas import production_group as schemas


def get_group(db: Session, group_id: int) -> Optional[models.ProductionGroup]:
    return db.query(models.ProductionGroup).filter(
        models.ProductionGroup.id == group_id
    ).first()


def get_groups(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    house: Optional[str] = None,
    section: Optional[str] = None,
    breed: Optional[str] = None,
):
    query = db.query(models.ProductionGroup)
    if status:
        query = query.filter(models.ProductionGroup.status == status)
    if house:
        query = query.filter(models.ProductionGroup.house == house)
    if section:
        query = query.filter(models.ProductionGroup.section == section)
    if breed:
        query = query.filter(models.ProductionGroup.breed == breed)
    return query.offset(skip).limit(limit).all()


def create_group(db: Session, group: schemas.ProductionGroupCreate):
    db_group = models.ProductionGroup(**group.model_dump())
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group


def update_group(db: Session, group_id: int, group: schemas.ProductionGroupUpdate):
    db_group = get_group(db, group_id)
    if not db_group:
        return None
    update_data = group.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_group, key, value)
    db.commit()
    db.refresh(db_group)
    return db_group


def delete_group(db: Session, group_id: int) -> bool:
    db_group = get_group(db, group_id)
    if not db_group:
        return False
    db.delete(db_group)
    db.commit()
    return True
