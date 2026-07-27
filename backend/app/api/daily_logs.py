"""Routes API pour les journaux quotidiens (DailyLog)."""
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas import daily_log as schemas
from app.services import group_service, daily_log_service

router = APIRouter(tags=["Daily Logs"])


@router.get("/groups/{group_id}/daily-logs", response_model=List[schemas.DailyLogOut])
def list_daily_logs(group_id: str, db: Session = Depends(get_db)):
    if not group_service.get_group(db, group_id):
        raise HTTPException(status_code=404, detail=f"Lot '{group_id}' introuvable")
    return daily_log_service.get_daily_logs(db, group_id)


@router.post("/groups/{group_id}/daily-logs", response_model=schemas.DailyLogOut, status_code=201)
def create_daily_log(group_id: str, log: schemas.DailyLogCreate, db: Session = Depends(get_db)):
    """Crée un daily_log. Si un log existe déjà pour ce lot à cette date, il est mis à jour."""
    if not group_service.get_group(db, group_id):
        raise HTTPException(status_code=404, detail=f"Lot '{group_id}' introuvable")
    return daily_log_service.create_daily_log(db, group_id, log)


@router.put("/daily-logs/{log_id}", response_model=schemas.DailyLogOut)
def update_daily_log(log_id: int, log: schemas.DailyLogUpdate, db: Session = Depends(get_db)):
    try:
        db_log = daily_log_service.update_daily_log(db, log_id, log)
    except ValueError as exc:
        raise HTTPException(status_code=409, detail=str(exc))
    if not db_log:
        raise HTTPException(status_code=404, detail="Entrée introuvable")
    return db_log


@router.delete("/daily-logs/{log_id}", status_code=204)
def delete_daily_log(log_id: int, db: Session = Depends(get_db)):
    if not daily_log_service.delete_daily_log(db, log_id):
        raise HTTPException(status_code=404, detail="Entrée introuvable")
    return None