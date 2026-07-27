from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from database import Base



class Question(Base):

    __tablename__ = "questions"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    question = Column(
        String
    )


    answer = Column(
        String
    )


    date = Column(
        DateTime,
        default=datetime.now
    )



class Elevage(Base):

    __tablename__ = "elevages"


    id = Column(
        Integer,
        primary_key=True
    )


    nombre_poulet = Column(
        Integer
    )


    poids_total = Column(
        Float
    )


    aliment_total = Column(
        Float
    )