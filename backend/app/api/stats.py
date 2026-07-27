"""Routes API pour les statistiques agrégées."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.stats import SummaryStats
from app.services import stats_service

router = APIRouter(prefix="/stats", tags=["Stats"])


@router.get("/summary", response_model=SummaryStats)
def summary_stats(db: Session = Depends(get_db)):
    """Statistiques agrégées sur l'ensemble des lots."""
    return stats_service.get_summary_stats(db)
