"""Routes API pour les lots de production (ProductionGroup)."""
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas import production_group as schemas
from app.services import group_service

router = APIRouter(prefix="/groups", tags=["Groups"])


@router.get("", response_model=List[schemas.ProductionGroupOut])
def list_groups(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = Query(None, description="Filtrer par statut (Healthy, Alert, Warning)"),
    house: Optional[str] = Query(None, description="Filtrer par bâtiment"),
    section: Optional[str] = Query(None, description="Filtrer par section"),
    breed: Optional[str] = Query(None, description="Filtrer par race"),
    db: Session = Depends(get_db),
):
    """Liste tous les lots de production, avec filtres optionnels."""
    return group_service.get_groups(db, skip, limit, status, house, section, breed)


@router.get("/{group_id}", response_model=schemas.ProductionGroupDetailOut)
def get_group_detail(group_id: str, db: Session = Depends(get_db)):
    """Détail complet d'un lot : infos + journaux + vaccinations + croissance."""
    db_group = group_service.get_group(db, group_id)
    if not db_group:
        raise HTTPException(status_code=404, detail=f"Lot '{group_id}' introuvable")
    return db_group


@router.post("", response_model=schemas.ProductionGroupOut, status_code=201)
def create_group(group: schemas.ProductionGroupCreate, db: Session = Depends(get_db)):
    """Crée un nouveau lot de production."""
    if group_service.get_group(db, group.id):
        raise HTTPException(status_code=409, detail=f"Le lot '{group.id}' existe déjà")
    return group_service.create_group(db, group)


@router.put("/{group_id}", response_model=schemas.ProductionGroupOut)
def update_group(group_id: str, group: schemas.ProductionGroupUpdate, db: Session = Depends(get_db)):
    """Met à jour partiellement un lot existant."""
    db_group = group_service.update_group(db, group_id, group)
    if not db_group:
        raise HTTPException(status_code=404, detail=f"Lot '{group_id}' introuvable")
    return db_group


@router.delete("/{group_id}", status_code=204)
def delete_group(group_id: str, db: Session = Depends(get_db)):
    """Supprime un lot ainsi que toutes ses données liées (cascade)."""
    if not group_service.delete_group(db, group_id):
        raise HTTPException(status_code=404, detail=f"Lot '{group_id}' introuvable")
    return None
