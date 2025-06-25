export function getCategoryLabel(page, categorie) {
  switch (page) {
    case "trilha":
      return trilhaLabel(categorie);
    case "cachoeira":
      return cachoeiraLabel(categorie);
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
