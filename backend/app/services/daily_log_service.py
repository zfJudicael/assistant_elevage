"""Logique métier / accès aux données pour les journaux quotidiens."""
from sqlalchemy.orm import Session

from app.db import models
from app.schemas import daily_log as schemas


def get_daily_logs(db: Session, group_id: str):
    return db.query(models.DailyLog).filter(
        models.DailyLog.group_id == group_id
    ).all()


def get_daily_log_by_date(db: Session, group_id: str, log_date):
    return db.query(models.DailyLog).filter(
        models.DailyLog.group_id == group_id,
        models.DailyLog.date == log_date,
    ).first()


def _refresh_group_mortality_total(db: Session, group_id: str):
    """Recalcule mortality_total du lot = somme des mortalités de tous ses daily_logs."""
    group = db.query(models.ProductionGroup).filter(
        models.ProductionGroup.id == group_id
    ).first()
    if not group:
        return None

    total = db.query(models.DailyLog).filter(
        models.DailyLog.group_id == group_id
    ).with_entities(models.DailyLog.mortality).all()
    group.mortality_total = sum(m for (m,) in total)
    return group


def create_daily_log(db: Session, group_id: str, log: schemas.DailyLogCreate):
    """Crée un daily_log. Si un log existe déjà à la même date pour ce lot,
    il est mis à jour à la place (au plus un daily_log par jour et par lot)."""
    existing = get_daily_log_by_date(db, group_id, log.date)

    if existing:
        payload = log.model_dump(exclude_unset=True)
        for key, value in payload.items():
            setattr(existing, key, value)
        db_log = existing
    else:
        db_log = models.DailyLog(**log.model_dump(), group_id=group_id)
        db.add(db_log)

    db.flush()
    _refresh_group_mortality_total(db, group_id)

    db.commit()
    db.refresh(db_log)
    return db_log


def update_daily_log(db: Session, log_id: int, log: schemas.DailyLogUpdate):
    """Met à jour un daily_log existant (par id) et recalcule mortality_total."""
    db_log = db.query(models.DailyLog).filter(models.DailyLog.id == log_id).first()
    if not db_log:
        return None

    payload = log.model_dump(exclude_unset=True)

    # Si la date change, s'assurer qu'elle n'entre pas en conflit avec un autre log
    new_date = payload.get("date", db_log.date)
    if new_date != db_log.date:
        conflict = get_daily_log_by_date(db, db_log.group_id, new_date)
        if conflict and conflict.id != db_log.id:
            raise ValueError("Un daily_log existe déjà à cette date pour ce lot.")

    for key, value in payload.items():
        setattr(db_log, key, value)

    db.flush()
    _refresh_group_mortality_total(db, db_log.group_id)

    db.commit()
    db.refresh(db_log)
    return db_log


def delete_daily_log(db: Session, log_id: int) -> bool:
    db_log = db.query(models.DailyLog).filter(models.DailyLog.id == log_id).first()
    if not db_log:
        return False
    group_id = db_log.group_id
    db.delete(db_log)
    db.flush()
    _refresh_group_mortality_total(db, group_id)
    db.commit()
    return True