"""Logique métier / accès aux données pour les journaux quotidiens."""
from sqlalchemy.orm import Session

from app.db import models
from app.schemas import daily_log as schemas


def get_daily_logs(db: Session, group_id: str):
    return db.query(models.DailyLog).filter(
        models.DailyLog.group_id == group_id
    ).all()


def create_daily_log(db: Session, group_id: str, log: schemas.DailyLogCreate):
    db_log = models.DailyLog(**log.model_dump(), group_id=group_id)
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log


def delete_daily_log(db: Session, log_id: int) -> bool:
    db_log = db.query(models.DailyLog).filter(models.DailyLog.id == log_id).first()
    if not db_log:
        return False
    db.delete(db_log)
    db.commit()
    return True
