// function resetFilters() {
//     console.log("Reset A");
//     if (tagsList.ing.length === 0 && tagsList.app.length === 0 && tagsList.ust.length === 0 ) {
//         filtersList.ing = [];
//         filtersList.app = [];
//         filtersList.ust = [];
//         recipesSection.innerHTML = "";
//         listTagsHtml.innerHTML = "";
//         displayData(recipesList);
//         temporyRecipesArr = [];
//         filteredRecipes = [];
//         temporyFilteredRecipes = [];
//         console.log("Reset B");
//     }
//     console.log("Reset C");
// }

// function filterRecipesByTags() {
//     // if (tagsListWithInput.ing.length > 0 || tagsListWithInput.app.length > 0 || tagsListWithInput.ust.length > 0 ) {
//     //     tagsListWithInput.ing = [...tagsList.ing];
//     //     tagsListWithInput.app = [...tagsList.app];
//     //     tagsListWithInput.ust = [...tagsList.ust];
//     // }
//     if (previousTemporyFilteredRecipes.length > 0) {
//     } else {
//         previousTemporyFilteredRecipes = [...temporyFilteredRecipes];
//     }
//     let isFiltered = false;
//     if (temporyRecipesArr.length > 0) {
//         filteredRecipes =  [...temporyRecipesArr];
//         console.log("hey j'suis pas vide")
//         isFiltered = true;
//     } else {
//         filteredRecipes = [...recipesList];
//     }

//     Object.keys(tagsList).forEach(category => {

//       temporyFilteredRecipes = [];

//         tagsList[category].forEach(tag => {
//             filteredRecipes = filteredRecipes.filter(recipe => {
//                 if (category === 'ing') {
//                     return recipe.ingredients.some(ingredient => ingredient.ingredient.includes(tag));
//                 } else if (category === 'app') {
//                     return recipe.appliance.includes(tag);
//                 } else if (category === 'ust') {
//                     return recipe.ustensils.some(ustensil => ustensil.includes(tag));
//                 }
//             });
//             if (filteredRecipes.length > 0) {
//               isFiltered = true;
//             }
//         });
//       });

//       recipesSection.innerHTML = "";

//       if (isFiltered) {
//         if (tagsList.ust.length > 0) {
//           console.log("Filter A");
//             updateAvailableFilters(temporyRecipesArr);
//             displayData(temporyRecipesArr);
//         } else {
//             console.log("Filter B");
//             updateAvailableFilters(filteredRecipes);
//             displayData(filteredRecipes);
//         }
//       } else {
//           if (searchBar.value) {
//             console.log("Filter C");
//               updateAvailableFilters(previousTemporyFilteredRecipes);
//               displayData(previousTemporyFilteredRecipes);
//           } else {
//             console.log("Filter D");
//               updateAvailableFilters(recipesList);
//               displayData(recipesList);
//           }
//       }
//       temporyFilteredRecipes = [...filteredRecipes];

// }



//index.js

// function searchInRecipes(arrayOfRecipes, input, tagslist) {
//     const reset = document.querySelector(".fa-xmark");
//     const recipesSection = document.querySelector(".card-recipe-container");
//     const errorMsgHTML = document.querySelector(".error");
//     if (input.length >= 1) {
//         reset.style.display = "inline";
//         reset.addEventListener("click", function() {
//           console.log(searchBar.textContent)
//             searchBar.value = "";
//             reset.style.display = "none";
//             recipesSection.innerHTML = "";
//             temporyRecipesArr = [];
//             displayData(arrayOfRecipes);
//         })
//     } else {
//         reset.style.display = "none";
//     }
//     if (input.length >= 3) {
//         const tagslistTemp = {
//             ing: [],
//             app: [],
//             ust: []
//         };
//         tagslist.ing = [];
//         tagslist.app = [];
//         tagslist.ust = [];
//         // searchIcon.addEventListener("click", function() {
//         const errorMsg = `Aucune recette ne contient "${input}", vous pouvez chercher par exemple « tarte aux pommes », « poisson », etc. `;
//         recipesSection.innerHTML = "";
//         arrayOfRecipes.forEach(recipe => {
//             const lowerInput = input.toLowerCase();
//             if (recipe.name.toLowerCase().includes(lowerInput) ||
//                 recipe.description.toLowerCase().includes(lowerInput) ||
//                 recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInput))
//             ) {
//                 temporyRecipesArr.push(recipe);
//             }

//             const isMatchIngredient = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInput));
//             const isMatchAppliance = recipe.appliance.toLowerCase().includes(lowerInput);
//             const isMatchUstensil = recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(lowerInput));
//             if (isMatchIngredient) {
//                 tagslistTemp.ing.push(capitalize(input))
//             } else if (isMatchAppliance) {
//                 tagslistTemp.app.push(capitalize(input))
//             } else if (isMatchUstensil) {
//                 tagslistTemp.ust.push(capitalize(input))
//             }
//             const flattenedDataIng = tagslistTemp.ing.flat();
//             const flattenedDataApp = tagslistTemp.app.flat();
//             const flattenedDataUst = tagslistTemp.ust.flat();
//             tagslist.ing = [...new Set(flattenedDataIng)];
//             tagslist.app = [...new Set(flattenedDataApp)];
//             tagslist.ust = [...new Set(flattenedDataUst)];
//         });

//         // });
//         displayData(temporyRecipesArr);
//         filterRecipesByTags();

//         if (temporyRecipesArr.length === 0) {
//           recipesSection.innerHTML = "";
//           errorMsgHTML.style.display = "block";
//           errorMsgHTML.innerHTML = errorMsg;
//       }
//     }
// }


// Initialisation des données de recettes, des filtres, etc.
const recipesList = [/* ... */]; // Remplacez par votre liste de recettes
const filtersList = {
  ing: [],
  app: [],
  ust: [],
};

const tempData = {
  ing: [],
  app: [],
  ust: [],
};

const dataSet = {
  ing: [],
  app: [],
  ust: [],
};

const tagsList = {
  ing: [],
  app: [],
  ust: [],
};

let filteredRecipesCopy = [...recipesList];

// Fonction pour capitaliser la première lettre d'une chaîne de caractères
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Fonction pour afficher les recettes
function displayData(recipes) {
  // Code pour afficher les recettes dans votre interface utilisateur
}

// Fonction pour mettre à jour les filtres disponibles
function updateAvailableFilters(filteredRecipesArray, filtersList) {
  const allIngredients = filteredRecipesArray.flatMap((recipe) =>
    recipe.ingredients.map((ing) => ing.ingredient)
  );
  filterListIngredients.innerHTML = "";
  filtersList.ing = [...new Set(allIngredients)];

  const allAppliance = filteredRecipesArray.map((recipe) => recipe.appliance);
  filterListAppareils.innerHTML = "";
  filtersList.app = [...new Set(allAppliance)];

  const allUstensils = filteredRecipesArray.flatMap((recipe) => recipe.ustensils);
  filterListUstensils.innerHTML = "";
  filtersList.ust = [...new Set(allUstensils)];

  for (let i = 0; i < filtersList.ing.length; i++) {
    filterListIngredients.innerHTML += `<span class="backgroundElement tag">${capitalize(
      filtersList.ing[i]
    )}</span>`;
  }

  for (let i = 0; i < filtersList.app.length; i++) {
    filterListAppareils.innerHTML += `<span class="backgroundElement tag">${capitalize(
      filtersList.app[i]
    )}</span>`;
  }

  for (let i = 0; i < filtersList.ust.length; i++) {
    filterListUstensils.innerHTML += `<span class="backgroundElement tag">${capitalize(
      filtersList.ust[i]
    )}</span>`;
  }
}

// Fonction pour filtrer les recettes en fonction des tags
function filterRecipesByTags(arrayOfRecipes, tagslist) {
  if (tagslist.ing.length > 0 || tagslist.app.length > 0 || tagslist.ust.length > 0) {
    // Filtrer les recettes en fonction des tagslist
    const filteredRecipes = arrayOfRecipes.filter((recipe) => {
      const matchesIng = tagslist.ing.every((tag) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
        )
      );
      const matchesApp = tagslist.app.every((tag) =>
        recipe.appliance.toLowerCase().includes(tag.toLowerCase())
      );
      const matchesUst = tagslist.ust.every((tag) =>
        recipe.ustensils.some((ustensil) =>
          ustensil.toLowerCase().includes(tag.toLowerCase())
        )
      );

      return matchesIng && matchesApp && matchesUst;
    });

    displayData(filteredRecipes);
    filteredRecipesCopy = [...filteredRecipes];
    updateAvailableFilters(filteredRecipes, filtersList);
  } else {
    // Si tagslist est vide, afficher arrayOfRecipes par défaut
    displayData(arrayOfRecipes);
  }
}

// Fonction pour activer/désactiver le menu déroulant du filtre
function toggleDropdown(filterElement, iconElement, hiddenElement, property) {
  iconElement = filterElement.querySelector(".fa-solid");
  iconElement.classList.toggle("fa-angle-down");
  iconElement.classList.toggle("fa-angle-up");
  hiddenElement.classList.toggle(`filter-hidden-${property}`);
  hiddenElement.classList.toggle(`filter-visible-${property}`);
  console.log("test test");
  dropdownOpen = true;
}

// Fonction pour configurer le filtre
function setupFilter(filterElement, iconElement, hiddenElement, listElement, property, searchFunction, input) {
  filterElement.addEventListener("click", function () {
    toggleDropdown(filterElement, iconElement, hiddenElement, property);
  });

  if (dropdownOpen) {
    listElement.innerHTML = "";
    recipesList.forEach((recipe) => {
      if (property === "ingredients") {
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
          recipe.ingredients.forEach((ingredient) => {
            if (ingredient && ingredient.ingredient) {
              filtersList[property].push(ingredient.ingredient);
              tempData.ing.push(ingredient.ingredient);
            }
          });
        }
      } else {
        if (property === "appliance") {
          filtersList[property].push(recipe[property]);
          tempData.app.push(recipe[property]);
        } else if (property === "ustensils") {
          filtersList[property].push(recipe[property]);
          tempData.ust.push(recipe[property]);
        }
      }
    });

    const flattenedData = filtersList[property].flat();
    const arrayDataUniques = [...new Set(flattenedData)];

    dataSet.ing = [...new Set(tempData.ing.flat())];
    dataSet.app = [...new Set(tempData.app.flat())];
    dataSet.ust = [...new Set(tempData.ust.flat())];

    for (let i = 0; i < arrayDataUniques.length; i++) {
      listElement.innerHTML += `<span class="backgroundElement tag">${capitalize(
        arrayDataUniques[i]
      )}</span>`;
    }

    if (input.value.length >= 3) {
      searchFunction(input); // Appeler la fonction de recherche appropriée
    }

    const tags = document.querySelectorAll(".tag");
    tags.forEach(attachTagClickEvent); // fonctionne
  }
}

// Fonction pour gérer les clics sur les tags
function attachTagClickEvent(tag) {
  tag.addEventListener("click", function () {
    console.log("setupFilter Tag event debut");
    const recipesSection = document.querySelector(".card-recipe-container");

    if (tag.parentElement.classList.contains("filter-list-ingredients")) {
      tagsList.ing.push(tag.textContent);
    } else if (tag.parentElement.classList.contains("filter-list-appliance")) {
      tagsList.app.push(tag.textContent);
    } else if (tag.parentElement.classList.contains("filter-list-ustensils")) {
      tagsList.ust.push(tag.textContent);
    }

    console.log("test 4");
    console.log("setupFilter Tag event FIN");
    recipesSection.innerHTML = "";
    showTagsList(tagsList);
    filterRecipesByTags(recipesList, tagsList);
    console.log("filtre actif normalement");
  });
}

// Fonction pour générer des tags suggérés
function generateSuggestedTags(listElement, items) {
  listElement.innerHTML = "";
  items.forEach((item) => {
    listElement.innerHTML += `<span class="backgroundElement tag">${capitalize(item)}</span>`;
  });
}

// Fonction de recherche pour les ingrédients
function searchIngredients(input) {
  const lowerInput = input.value.toLowerCase();
  const suggestedIngredients = [];
  dataSet.ing.forEach((ingredient) => {
    const isMatchIngredientSuggested = ingredient.toLowerCase().includes(lowerInput);
    if (isMatchIngredientSuggested) {
      suggestedIngredients.push(ingredient);
    }
  });
  generateSuggestedTags(filterListIngredients, suggestedIngredients);
}

// Fonction de recherche pour les appareils
function searchAppareils(input) {
  const lowerInput = input.value.toLowerCase();
  const suggestedAppareils = [];
  dataSet.app.forEach((appareil) => {
    const isMatchApplianceSuggested = appareil.toLowerCase().includes(lowerInput);
    if (isMatchApplianceSuggested) {
      suggestedAppareils.push(appareil);
    }
  });
  generateSuggestedTags(filterListAppareils, suggestedAppareils);
}

// Fonction de recherche pour les ustensiles
function searchUstensils(input) {
  const lowerInput = input.value.toLowerCase();
  const suggestedUstensils = [];
  dataSet.ust.forEach((ustensil) => {
    const isMatchUstensilSuggested = ustensil.toLowerCase().includes(lowerInput);
    if (isMatchUstensilSuggested) {
      suggestedUstensils.push(ustensil);
    }
  });
  generateSuggestedTags(filterListUstensils, suggestedUstensils);
}

// Fonction pour initialiser les filtres au chargement de la page
function initializeFilters() {
  // Initialisez vos filtres ici en utilisant updateAvailableFilters
  updateAvailableFilters(recipesList, filtersList);

  // Initialisez les gestionnaires d'événements pour les filtres
  const suggestedTagsForIng = document.getElementById("filter-ingredients-input");
  const filterIngredients = document.getElementById("filter-ingredients");
  const ingredientsIcon = document.getElementById("ingredients-icon");
  const filterListIngredients = document.querySelector(".filter-list-ingredients");
  const filterHiddenIngredients = document.querySelector(".filter-hidden-ingredients");
  const selectedTagsIngredients = document.querySelector(".selectedTags-ingredients");
  setupFilter(filterIngredients, ingredientsIcon, filterHiddenIngredients, filterListIngredients, "ingredients", searchIngredients, suggestedTagsForIng);

  // Répétez ce processus pour les autres filtres (appareils, ustensiles)
}

// Appelez la fonction d'initialisation des filtres au chargement de la page
initializeFilters();
