"""Routes API pour les vaccinations."""
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas import vaccination as schemas
from app.services import group_service, vaccination_service

router = APIRouter(tags=["Vaccinations"])


@router.get("/groups/{group_id}/vaccinations", response_model=List[schemas.VaccinationOut])
def list_vaccinations(group_id: str, db: Session = Depends(get_db)):
    if not group_service.get_group(db, group_id):
        raise HTTPException(status_code=404, detail=f"Lot '{group_id}' introuvable")
    return vaccination_service.get_vaccinations(db, group_id)


@router.post("/groups/{group_id}/vaccinations", response_model=schemas.VaccinationOut, status_code=201)
def create_vaccination(group_id: str, vacc: schemas.VaccinationCreate, db: Session = Depends(get_db)):
    if not group_service.get_group(db, group_id):
        raise HTTPException(status_code=404, detail=f"Lot '{group_id}' introuvable")
    return vaccination_service.create_vaccination(db, group_id, vacc)


@router.patch("/vaccinations/{vacc_id}/status", response_model=schemas.VaccinationOut)
def update_vaccination_status(
    vacc_id: int,
    status: str = Query(..., description="Nouveau statut : DONE ou SCHEDULED"),
    db: Session = Depends(get_db),
):
    db_vacc = vaccination_service.update_vaccination_status(db, vacc_id, status)
    if not db_vacc:
        raise HTTPException(status_code=404, detail="Vaccination introuvable")
    return db_vacc


@router.delete("/vaccinations/{vacc_id}", status_code=204)
def delete_vaccination(vacc_id: int, db: Session = Depends(get_db)):
    if not vaccination_service.delete_vaccination(db, vacc_id):
        raise HTTPException(status_code=404, detail="Vaccination introuvable")
    return None
