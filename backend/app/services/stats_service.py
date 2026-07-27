"""Calcul des statistiques agrégées sur l'ensemble des lots."""
from sqlalchemy.orm import Session

from app.db import models


def get_summary_stats(db: Session) -> dict:
    groups = db.query(models.ProductionGroup).all()
    total_groups = len(groups)
    total_active = sum(g.active for g in groups)
    total_initial = sum(g.count for g in groups)
    total_mortality = sum(g.mortality_total for g in groups)
    avg_mortality_rate = (
        sum(g.mortality for g in groups) / total_groups if total_groups else 0.0
    )

    status_counts = {}
    for g in groups:
        status_counts[g.status] = status_counts.get(g.status, 0) + 1

    return {
        "total_groups": total_groups,
        "total_birds_active": total_active,
        "total_birds_initial": total_initial,
        "total_mortality": total_mortality,
        "average_mortality_rate": round(avg_mortality_rate, 2),
        "groups_by_status": status_counts,
    }
