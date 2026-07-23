"""Routes API pour les données de croissance (GrowthData)."""
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas import growth_data as schemas
from app.services import group_service, growth_service

router = APIRouter(tags=["Growth Data"])


@router.get("/groups/{group_id}/growth-data", response_model=List[schemas.GrowthDataOut])
def list_growth_data(group_id: str, db: Session = Depends(get_db)):
    if not group_service.get_group(db, group_id):
        raise HTTPException(status_code=404, detail=f"Lot '{group_id}' introuvable")
    return growth_service.get_growth_data(db, group_id)


@router.post("/groups/{group_id}/growth-data", response_model=schemas.GrowthDataOut, status_code=201)
def create_growth_data(group_id: str, growth: schemas.GrowthDataCreate, db: Session = Depends(get_db)):
    if not group_service.get_group(db, group_id):
        raise HTTPException(status_code=404, detail=f"Lot '{group_id}' introuvable")
    return growth_service.create_growth_data(db, group_id, growth)


@router.delete("/growth-data/{growth_id}", status_code=204)
def delete_growth_data(growth_id: int, db: Session = Depends(get_db)):
    if not growth_service.delete_growth_data(db, growth_id):
        raise HTTPException(status_code=404, detail="Entrée introuvable")
    return None
