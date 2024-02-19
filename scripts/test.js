function searchInRecipes(arrayOfRecipes, input, tagslist) {
  const reset = document.querySelector(".fa-xmark");
  const recipesSection = document.querySelector(".card-recipe-container");
  const errorMsgHTML = document.querySelector(".error");
  let temporyRecipesArr = [];
  if (input.length >= 1) {
    reset.style.display = "inline";
    reset.addEventListener("click", function () {
      searchBar.value = "";
      reset.style.display = "none";
      recipesSection.innerHTML = "";
      temporyRecipesArr = [];
      tagslist.ing = [];
      tagslist.app = [];
      tagslist.ust = [];
      filtersList.ing = [];
      filtersList.app = [];
      filtersList.ust = [];
      displayData(arrayOfRecipes);
    });
  } else {
    reset.style.display = "none";
  }

  if (input.length >= 3) {
    searchBar.addEventListener("input", function () {
      if (temporyRecipesArr.length === 0) {
        recipesSection.innerHTML = "";
        errorMsgHTML.style.display = "block";
        errorMsgHTML.innerHTML = `Aucune recette ne contient "${searchBar.value}", vous pouvez chercher par exemple « tarte aux pommes », « poisson », etc. `;
      } else {
        errorMsgHTML.style.display = "none";
      }
    });

    tagslist.ing = [];
    tagslist.app = [];
    tagslist.ust = [];
    recipesSection.innerHTML = "";
    const lowerInput = input.toLowerCase();
    temporyRecipesArr = arrayOfRecipes.filter((recipe) => {
      const isMatchName = recipe.name.toLowerCase().includes(lowerInput);
      const isMatchDescription = recipe.description.toLowerCase().includes(lowerInput);
      const isMatchIngredient = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(lowerInput)
      );

      const isMatchAppliance = recipe.appliance.toLowerCase().includes(lowerInput);
      const isMatchUstensil = recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(lowerInput)
      );

      if (isMatchIngredient) {
        tagslist.ing.push(capitalize(input));
      } else if (isMatchAppliance) {
        tagslist.app.push(capitalize(input));
      } else if (isMatchUstensil) {
        tagslist.ust.push(capitalize(input));
      }


      return (
        isMatchName ||
        isMatchDescription ||
        isMatchIngredient ||
        isMatchAppliance ||
        isMatchUstensil
      );
    });

    displayData(temporyRecipesArr);
    updateAvailableFilters(temporyRecipesArr, filtersList);
  }
}
