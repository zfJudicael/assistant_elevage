"""
Modèles SQLAlchemy représentant les tables de la base de données.

Structure relationnelle :
- ProductionGroup (1) --- (N) DailyLog
- ProductionGroup (1) --- (N) Vaccination
- ProductionGroup (1) --- (N) GrowthData
"""
from sqlalchemy import Column, Integer, Float, String, ForeignKey, Date, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.database import Base


class ProductionGroup(Base):
    """Table principale : un lot de production (batch) de poulets."""
    __tablename__ = "production_groups"

    id = Column(Integer, primary_key=True, autoincrement=True)  # ex: "BR-2023-04"
    batch_name = Column(String, nullable=False)
    date_enter = Column(Date, nullable=False)
    count = Column(Integer, nullable=False, default=0)
    # mortality = Column(Float, nullable=False, default=0.0)  # taux en %
    status = Column(String, nullable=False, default="Healthy")
    # house = Column(String, nullable=True)
    # section = Column(String, nullable=True)
    breed = Column(String, nullable=True)
    # hatch_date = Column(Date, nullable=True)
    active = Column(Integer, nullable=False, default=0)
    mortality_total = Column(Integer, nullable=False, default=0)
    # feed_intake = Column(Float, nullable=True)
    # water_intake = Column(Float, nullable=True)
    # last_vaccination = Column(String, nullable=True)
    # next_vaccination = Column(String, nullable=True)
    active_symptoms = Column(String, nullable=True)
    health_alert = Column(String, nullable=True)

    daily_logs = relationship(
        "DailyLog", back_populates="group",
        cascade="all, delete-orphan", order_by="DailyLog.id"
    )
    vaccinations = relationship(
        "Vaccination", back_populates="group",
        cascade="all, delete-orphan", order_by="Vaccination.id"
    )
    # growth_data = relationship(
    #     "GrowthData", back_populates="group",
    #     cascade="all, delete-orphan", order_by="GrowthData.day"
    # )


class DailyLog(Base):
    """Journal quotidien de suivi d'un lot (poids, mortalité, environnement)."""
    __tablename__ = "daily_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    group_id = Column(Integer, ForeignKey("production_groups.id"), nullable=False)

    # day = Column(String, nullable=False)          # ex: "D23"
    avg_weight_g = Column(Float, nullable=True)    # poids moyen en grammes
    mortality = Column(Integer, nullable=False, default=0)
    # feed = Column(Float, nullable=True)
    # water = Column(Float, nullable=True)
    # temp_min = Column(Float, nullable=True)
    # temp_max = Column(Float, nullable=True)
    # humidity = Column(Float, nullable=True)
    # lit_quality = Column(String, nullable=True)

    group = relationship("ProductionGroup", back_populates="daily_logs")


class Vaccination(Base):
    """Historique / planning des vaccinations d'un lot."""
    __tablename__ = "vaccinations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    group_id = Column(Integer, ForeignKey("production_groups.id"), nullable=False)

    day = Column(String, nullable=False)       # ex: "D21"
    date = Column(String, nullable=True)       # ex: "22/10"
    treatment = Column(String, nullable=False)
    status = Column(String, nullable=False, default="SCHEDULED")

    group = relationship("ProductionGroup", back_populates="vaccinations")


class GrowthData(Base):
    """Courbe de croissance : poids réel vs poids cible par jour."""
    __tablename__ = "growth_data"

    id = Column(Integer, primary_key=True, autoincrement=True)
    group_id = Column(Integer, ForeignKey("production_groups.id"), nullable=False)

    day = Column(Integer, nullable=False)
    actual = Column(Float, nullable=True)
    target = Column(Float, nullable=False)

    group = relationship("ProductionGroup", back_populates="growth_data")


class ChatMessage(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, autoincrement=True)
    group_id = Column(Integer, ForeignKey("production_groups.id"), nullable=False)

    message = Column(String, nullable=False)
    role = Column(String, nullable=False, default="user")
    date = Column(DateTime, nullable=False, default=datetime.now)
