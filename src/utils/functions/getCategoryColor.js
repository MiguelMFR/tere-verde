export function getCategoryColor(page, categories) {
  switch (page) {
    case "trilha-cachoeira":
      return handleTrilha(categories);
    case "bio":
      return handleBio(categories);
    case "eventos":
      return handleEventos(categories);
    default:
      return null;
  }

};

function handleTrilha(categories) {
  const type = categories?.type?.toLowerCase?.();

  switch (type) {
    case "easy":
      return "#27ae60";
    case "medium":
      return "#f1c40f";
    case "hard":
      return "#e74c3c";
    default:
      return "#bbb"
  }
};

function handleBio(categories) {
  const type = categories?.type?.toLowerCase?.();

  switch (type) {
    case "ave":
      return "#1878E7";
    case "flora":
      return "#27ae60";
    case "mamífero":
      return "#e74c4c";
    default:
      return "#bbb";
  }
};

function handleEventos(categories) {
  const type = categories?.type?.toLowerCase?.();

  switch (type) {
    case "cultural":
      return "#e74c4c";
    case "ecologico":
      return "#27ae60";
    case "esportivo":
      return "#1878E7";
    default:
      return "#bbb";
  }
}
