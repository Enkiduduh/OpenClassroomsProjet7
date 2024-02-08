function recipesTemplate(data) {
  const {
    id,
    image,
    name,
    servings,
    time,
    ingredients,
    description,
    appliance,
    ustensils,
  } = data;

  function getRecipeCardDOM() {
    const article = document.createElement("article");
    article.classList.add("card-recipe");
    article.innerHTML = `<div class="card-recipe-cover">
          <img src="assets/images/${data.image}" alt="${data.name}">
          <div class="card-recipe-time">${data.time}min</div>
        </div>
        <div class="card-recipe-info">
          <h3 class="card-recipe-title">${data.name}</h3>
          <div class="card-recipe-description">
            <h5>RECETTE</h5>
            <p class="description">${data.description}</p>
          </div>
          <div class="card-recipe-ingredients">
            <h5>INGREDIENTS</h5>
            <div class="data-ingredients">
              ${generateIngredientsList(data.ingredients)}
            </div>
          </div>
        </div>`;

    return article;

    // Fonction pour générer la liste des ingrédients
    function generateIngredientsList(ingredients) {
      return ingredients
        .map((ingredient) => {
          // Vérifiez si l'unité est définie pour cet ingrédient
          const unit = ingredient.unit ? ` ${ingredient.unit}` : "";
          if (!ingredient.quantity) {
            return `<div class="ingredient-container"><p class="ingredient">${ingredient.ingredient}</p><p class="quantity">-</p></div>`;
          } else {
            return `<div class="ingredient-container"><p class="ingredient">${ingredient.ingredient}</p><p class="quantity">${ingredient.quantity}${unit}</p></div>`;
          }
        })
        .join("");
    }
  }
  return {
    id,
    image,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
    getRecipeCardDOM,
  };
}
