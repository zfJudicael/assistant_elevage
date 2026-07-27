from rag import rechercher_information


question = "Quelle est la température recommandée pour les poussins de chair ?"


print("\nQUESTION :")
print(question)


resultat = rechercher_information(question)


print("\nCONTEXTE RETOURNE :")
print(resultat)