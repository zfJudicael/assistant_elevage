"""
Initialise la base de données : crée les tables et insère les données de
départ (productionGroups). Idempotent : ne duplique pas les lots existants.

Exécuter avec :
    python -m app.db.init_db
"""
from datetime import datetime

from app.db.database import SessionLocal, engine, Base
from app.db import models


def parse_weight(weight_str: str) -> float:
    """Convertit '985g' -> 985.0"""
    return float(weight_str.replace("g", "").strip())


RAW_DATA = [
    {
        "id": "BR-2023-04",
        "batchName": "Main House Alpha",
        "age": 28,
        "count": 4500,
        "mortality": 0.2,
        "status": "Healthy",
        "house": "House 4",
        "section": "Section A",
        "breed": "Broiler Ross 308",
        "hatchDate": "2023-10-01",
        "active": 4491,
        "mortalityTotal": 9,
        "feedIntake": 96.2,
        "waterIntake": 285,
        "lastVaccination": "ND+IB (D21)",
        "nextVaccination": "Gumboro (Day 28)",
        "activeSymptoms": "None Observed",
        "healthAlert": "Optimal",
        "dailyLogs": [
            {"day": "D23", "avgWeight": "985g", "mortality": 0, "feed": 140.2, "water": 282, "tempMin": 26, "tempMax": 28.5, "humidity": 62, "litQuality": "Good"},
            {"day": "D22", "avgWeight": "942g", "mortality": 1, "feed": 138.5, "water": 278, "tempMin": 25, "tempMax": 29.1, "humidity": 65, "litQuality": "Good"},
            {"day": "D21", "avgWeight": "898g", "mortality": 0, "feed": 135.0, "water": 270, "tempMin": 26, "tempMax": 28.0, "humidity": 60, "litQuality": "Damp"},
            {"day": "D20", "avgWeight": "855g", "mortality": 2, "feed": 132.8, "water": 265, "tempMin": 24, "tempMax": 27.5, "humidity": 58, "litQuality": "Good"},
            {"day": "D19", "avgWeight": "812g", "mortality": 1, "feed": 130.1, "water": 260, "tempMin": 25, "tempMax": 28.2, "humidity": 61, "litQuality": "Good"},
        ],
        "vaccinations": [
            {"day": "D21", "date": "22/10", "treatment": "ND+IB Spray", "status": "DONE"},
            {"day": "D18", "date": "19/10", "treatment": "Vitamin B Complex", "status": "DONE"},
            {"day": "D14", "date": "15/10", "treatment": "IBD Booster", "status": "DONE"},
            {"day": "D07", "date": "08/10", "treatment": "Newcastle D7", "status": "DONE"},
            {"day": "D28", "date": "29/10", "treatment": "Gumboro", "status": "SCHEDULED"},
        ],
        # "growthData": [
        #     {"day": 0, "actual": 42, "target": 42},
        #     {"day": 7, "actual": 185, "target": 190},
        #     {"day": 14, "actual": 420, "target": 430},
        #     {"day": 21, "actual": 780, "target": 800},
        #     {"day": 24, "actual": 985, "target": 1020},
        #     {"day": 35, "actual": None, "target": 1800},
        #     {"day": 42, "actual": None, "target": 2500},
        # ],
    },
    {
        "id": "BR-2023-05",
        "batchName": "Nursery Barn B",
        "age": 12,
        "count": 2800,
        "mortality": 1.5,
        "status": "Alert",
        "house": "House 2",
        "section": "Section B",
        "breed": "Broiler Cobb 500",
        "hatchDate": "2023-10-15",
        "active": 2758,
        "mortalityTotal": 42,
        "feedIntake": 45.2,
        "waterIntake": 120,
        "lastVaccination": "Newcastle D7",
        "nextVaccination": "IBD Booster (Day 14)",
        "activeSymptoms": "Lethargy observed",
        "healthAlert": "Alert",
        "dailyLogs": [],
        "vaccinations": [],
        "growthData": [],
    },
    {
        "id": "BR-2023-01",
        "batchName": "Isolation Unit 4",
        "age": 45,
        "count": 1200,
        "mortality": 4.2,
        "status": "Warning",
        "house": "House 1",
        "section": "Section D",
        "breed": "Broiler Ross 308",
        "hatchDate": "2023-09-13",
        "active": 1149,
        "mortalityTotal": 51,
        "feedIntake": 160.5,
        "waterIntake": 380,
        "lastVaccination": "Gumboro D28",
        "nextVaccination": "Market Ready Check",
        "activeSymptoms": "Respiratory signs",
        "healthAlert": "Warning",
        "dailyLogs": [],
        "vaccinations": [],
        "growthData": [],
    },
    {
        "id": "BR-2023-06",
        "batchName": "Growth Suite Delta",
        "age": 35,
        "count": 3950,
        "mortality": 0.5,
        "status": "Healthy",
        "house": "House 6",
        "section": "Section C",
        "breed": "Broiler Cobb 500",
        "hatchDate": "2023-09-23",
        "active": 3930,
        "mortalityTotal": 20,
        "feedIntake": 130.8,
        "waterIntake": 320,
        "lastVaccination": "Gumboro D28",
        "nextVaccination": "Final Inspection",
        "activeSymptoms": "None Observed",
        "healthAlert": "Optimal",
        "dailyLogs": [],
        "vaccinations": [],
        "growthData": [],
    },
]


def init_db():
    """Crée les tables (si absentes) et insère les données de départ."""
    Base.metadata.create_all(bind=engine)

    # db = SessionLocal()
    # try:
    #     for item in RAW_DATA:
    #         existing = db.query(models.ProductionGroup).filter(
    #             models.ProductionGroup.id == item["id"]
    #         ).first()
    #         if existing:
    #             print(f"[SKIP] {item['id']} existe déjà")
    #             continue

    #         db_group = models.ProductionGroup(
    #             id=item["id"],
    #             batch_name=item["batchName"],
    #             date_enter=item["date_enter"],
    #             count=item["count"],
    #             # mortality=item["mortality"],
    #             status=item["status"],
    #             # house=item["house"],
    #             # section=item["section"],
    #             # breed=item["breed"],
    #             # hatch_date=datetime.strptime(item["hatchDate"], "%Y-%m-%d").date(),
    #             active=item["active"],
    #             mortality_total=item["mortalityTotal"],
    #             # feed_intake=item["feedIntake"],
    #             # water_intake=item["waterIntake"],
    #             # last_vaccination=item["lastVaccination"],
    #             # next_vaccination=item["nextVaccination"],
    #             active_symptoms=item["activeSymptoms"],
    #             health_alert=item["healthAlert"],
    #         )
    #         db.add(db_group)
    #         db.flush()

    #         for log in item["dailyLogs"]:
    #             db.add(models.DailyLog(
    #                 group_id=db_group.id,
    #                 # day=log["day"],
    #                 avg_weight_g=parse_weight(log["avgWeight"]),
    #                 mortality=log["mortality"],
    #                 # feed=log["feed"],
    #                 # water=log["water"],
    #                 # temp_min=log["tempMin"],
    #                 # temp_max=log["tempMax"],
    #                 # humidity=log["humidity"],
    #                 # lit_quality=log["litQuality"],
    #             ))

    #         for vacc in item["vaccinations"]:
    #             db.add(models.Vaccination(
    #                 group_id=db_group.id,
    #                 day=vacc["day"],
    #                 date=vacc["date"],
    #                 treatment=vacc["treatment"],
    #                 status=vacc["status"],
    #             ))

    #         # for growth in item["growthData"]:
    #         #     db.add(models.GrowthData(
    #         #         group_id=db_group.id,
    #         #         day=growth["day"],
    #         #         actual=growth["actual"],
    #         #         target=growth["target"],
    #         #     ))

    #         print(f"[OK] {item['id']} inséré")

    #     db.commit()
    #     print("Initialisation de la base terminée.")
    # finally:
    #     db.close()


if __name__ == "__main__":
    init_db()
