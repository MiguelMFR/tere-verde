export function getCategoryLabel(page, categorie) {
  switch (page) {
    case "trilha":
      return trilhaLabel(categorie);
    case "cachoeira":
      return cachoeiraLabel(categorie);
    case "bio":
      return bioLabel(categorie);
    case "eventos":
      return eventoLabel(categorie);
    default:
      return null;
  }

};

function trilhaLabel(categorie) {
  switch (categorie) {
    case "easy":
      return "Iniciante";
    case "medium":
      return "Intermediária"
    case "hard":
      return "Avançada";
    default:
      return null;
  }
};

function cachoeiraLabel(categorie) {
  switch (categorie) {
    case "easy":
      return "Fácil acesso";
    case "medium":
      return "Caminhada média"
    case "hard":
      return "Aventureira";
    default:
      return null;
  }
}

function bioLabel(categorie) {
  switch (categorie) {
    case "ave":
      return "Ave"
    case "flora":
      return "FLora"
    case "mamifero":
      return "Mamífero"
    default:
      return null;
  }
}

function eventoLabel(categorie) {
  switch (categorie) {
    case "cultural":
      return "Cultural"
    case "ecologico":
      return "Ecológico"
    case "esportivo":
      return "Esportivo"
    default:
      return null;

  }
}
