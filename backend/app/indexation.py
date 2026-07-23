# import os

# from rag import (
#     charger_document,
#     decouper_documents,
#     creer_vectorstore
# )



# documents = []


# for fichier in os.listdir("data"):

#     if fichier.endswith(".pdf"):

#         chemin = f"data/{fichier}"

#         print("Chargement :", fichier)

#         docs = charger_document(
#             chemin
#         )

#         documents.extend(docs)



# chunks = decouper_documents(
#     documents
# )


# creer_vectorstore(
#     chunks
# )


# print("✅ Tous les documents sont indexés")
from rag import (
    charger_document,
    decouper_documents,
    creer_vectorstore
)



print("Chargement PDF...")


docs = charger_document(
    "data/broiler_guide.pdf"
)



print("Découpage...")


chunks = decouper_documents(
    docs
)



print("Création ChromaDB...")


creer_vectorstore(
    chunks
)



print("✅ Index créé")