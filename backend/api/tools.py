from sqlalchemy.orm import Session
from rag import rechercher_information

from models import Question



# ==================================
# Calcul quantité aliment
# ==================================

def calcul_aliment(
        nombre_poulet:int,
        consommation_par_poulet:float
):

    """
    Calcule la quantité totale d'aliment.
    
    Exemple:
    1000 poulets * 4 kg = 4000 kg
    """

    total = nombre_poulet * consommation_par_poulet


    return {
        "nombre_poulet": nombre_poulet,
        "aliment_necessaire_kg": total
    }





# ==================================
# Calcul poids moyen
# ==================================

def poids_moyen(
        poids_total:float,
        nombre_poulet:int
):

    """
    Calcule le poids moyen d'un poulet.
    """

    if nombre_poulet == 0:
        return 0


    moyenne = poids_total / nombre_poulet


    return {
        "poids_moyen_kg": round(moyenne,2)
    }





# ==================================
# Recherche document
# ==================================

# def rechercher_document(
#         question:str
# ):

#     """
#     Cette fonction sera connectée plus tard
#     à ChromaDB + RAG.
#     """

#     documents = {

#         "vaccination":
#         "Le programme vaccinal dépend de l'âge et de la région.",


#         "alimentation":
#         "Un poulet de chair nécessite une alimentation adaptée aux phases démarrage, croissance et finition.",


#         "temperature":
#         "La température doit être contrôlée selon l'âge des poussins."
#     }


#     for key,value in documents.items():

#         if key in question.lower():

#             return value


#     return "Aucun document trouvé."
def rechercher_document(question:str):

    return rechercher_information(question)




# ==================================
# Enregistrer question
# ==================================

def enregistrer_question(
        db:Session,
        question:str,
        answer:str
):


    nouvelle_question = Question(

        question=question,

        answer=answer
    )


    db.add(nouvelle_question)

    db.commit()

    db.refresh(nouvelle_question)


    return nouvelle_question





# ==================================
# Historique conversation
# ==================================

def historique_conversation(
        db:Session
):


    conversations = db.query(
        Question
    ).all()


    return conversations