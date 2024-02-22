let recipesList = [];
let temporyRecipesArr = [];
let dropdownOpen = 0;
let arrayDataUniques = [];
const filtersList = {
  ing: [],
  app: [],
  ust: [],
  ingredients: [],
  appliance: [],
  ustensils: []
};
let tempData = {
  ing: [],
  app: [],
  ust: []
};
let dataSet = {
  ing: [],
  app: [],
  ust: []
};

let error = false;
const searchBar = document.getElementById("searchbar");
const searchIcon = document.getElementById("search-icon");
const counterRecipes = document.querySelector(".recipe-counter");

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getRecipes() {
    let response = await fetch("data/recipes.json");

    if (!response.ok) {
        alert("HTTP-Error: "+ response.statut);
    } else {
        let data = await response.json();
        let recipes = data.recipes;
        recipesList = [...recipes];
        return {
          recipes: [...recipes],
        };
    };
};


async function displayData(recipes) {
    const recipesSection = document.querySelector(".card-recipe-container");

    recipes.forEach((recipe) => {
        const recipeModel = recipesTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}

async function init() {
    const { recipes } = await getRecipes();
    displayData(recipes);
    counterRecipes.textContent = `${recipesList.length} recettes`

}
init();

// Appelez la fonction d'initialisation des filtres au chargement de la page
initializeFilters();


function searchInRecipes(arrayOfRecipes, input, tagslist) {
  const reset = document.querySelector(".fa-xmark");
  const recipesSection = document.querySelector(".card-recipe-container");
  const errorMsgHTML = document.querySelector(".error");
  if (input.length >= 1) {
      reset.style.display = "inline";
      reset.addEventListener("click", function() {
        reset.style.display = "none";
        errorMsgHTML.innerHTML = "";
        errorMsgHTML.style.display = "none";
        deleteMatchingTag(tagslist.ing, "ing");
        deleteMatchingTag(tagslist.app, "app");
        deleteMatchingTag(tagslist.ust, "ust");
      })
  } else {
      reset.style.display = "none";
  }
  if (input.length >= 3) {
    searchBar.addEventListener("input", function(){
      if (searchBar.value.length <= 2) {
        if (filteredRecipes) {
           displayData(filteredRecipes);
           filterRecipesByTags(filteredRecipes, tagsList);
        } else if (temporyRecipesArr) {
          displayData(temporyRecipesArr);
        } else {
          errorMsgHTML.style.display = "none";
          recipesSection.innerHTML = "";
          displayData(recipesList);
        }
      } else {
        if (temporyRecipesArr.length === 0) {
          console.log("test recherche principale NOK")
            recipesSection.innerHTML = "";
            errorMsgHTML.style.display = "block";
            errorMsgHTML.innerHTML = `Aucune recette ne contient "${searchBar.value}", vous pouvez chercher par exemple « tarte aux pommes », « poisson », etc. `;
        } else {
          console.log("test recherche principale OK")
          errorMsgHTML.style.display = "none";
        }
      }
    })
      const tagslistTemp = {
          ing: [],
          app: [],
          ust: []
      };
    tagslist.ing = [];
    tagslist.app = [];
    tagslist.ust = [];

      recipesSection.innerHTML = "";

        for ( i = 0; i < arrayOfRecipes.length; i++) {
            const lowerInput = input.toLowerCase();
            if (arrayOfRecipes[i].name.toLowerCase().includes(lowerInput) ||
                arrayOfRecipes[i].description.toLowerCase().includes(lowerInput) ||
                arrayOfRecipes[i].ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInput))
            ) {
                temporyRecipesArr.push(arrayOfRecipes[i]);
            }
            const isMatchIngredient = arrayOfRecipes[i].ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInput));
            const isMatchAppliance = arrayOfRecipes[i].appliance.toLowerCase().includes(lowerInput);
            const isMatchUstensil = arrayOfRecipes[i].ustensils.some(ustensil => ustensil.toLowerCase().includes(lowerInput));
            if (isMatchIngredient) {
              tagslistTemp.ing.push(capitalize(input))
            } else if (isMatchAppliance) {
              tagslistTemp.app.push(capitalize(input))
            } else if (isMatchUstensil) {
              tagslistTemp.ust.push(capitalize(input))
            }
            const flattenedDataIng = tagslistTemp.ing.flat();
            const flattenedDataApp = tagslistTemp.app.flat();
            const flattenedDataUst = tagslistTemp.ust.flat();
            tagslist.ing = [...new Set(flattenedDataIng)];
            tagslist.app = [...new Set(flattenedDataApp)];
            tagslist.ust = [...new Set(flattenedDataUst)];
          }

    displayData(temporyRecipesArr);
    updateAvailableFilters(temporyRecipesArr, filtersList)
    counterRecipes.textContent = `${temporyRecipesArr.length} recettes`

  }
}

function deleteMatchingTag(tagList, category) {
  if (searchBar.value && tagList.some(tag => tag.toLowerCase().trim() === searchBar.value.toLowerCase().trim())) {
    console.log("TEST ?");
    const index = tagList.findIndex(tag => tag.toLowerCase().trim() === searchBar.value.toLowerCase().trim());
    if (index !== -1) {
        tagList.splice(index, 1);
        counterRecipes.textContent = `${recipesList.length} recettes`;
        searchBar.value = ""; // Effacer la valeur de la searchBar une fois le tag supprimé
        recipesSection.innerHTML = "";
        filterRecipesByTags(recipesList, tagsList);
        updateAvailableFilters(recipesList, filtersList);
    }
    if (!searchBar.value && (tagsList.ing.length || tagsList.app.length || tagsList.ust.length)) {
      searchInRecipes(recipesList, "", tagsList);
      updateAvailableFilters(recipesList, filtersList);
    }
  }
}

function deleteMatchingTagBackspace(tagList, category) {
  // Vérifier si la valeur de searchBar est vide
  if (!searchBar.value && tagList.length > 0) {
    // Supprimer le dernier tag de la liste
    const lastTag = tagList.pop();
    console.log("Deleted tag:", lastTag);
    // Mettre à jour l'affichage des tags
    showTagsList(tagsList);
    // Réafficher les recettes avec les filtres actuels
    recipesSection.innerHTML = "";
    filterRecipesByTags(recipesList, tagsList);
    updateAvailableFilters(recipesList, filtersList);
  }
}


searchBar.addEventListener('input', function(event) {
  // Vérifier si la valeur de searchBar est vide
  if (searchBar.value === '') {
    // Appeler la fonction pour supprimer le dernier tag
    deleteMatchingTagBackspace(tagsList.ing, "ing");
    deleteMatchingTagBackspace(tagsList.app, "app");
    deleteMatchingTagBackspace(tagsList.ust, "ust");
  }
});


searchBar.addEventListener("click", function(){
    const errorMsgHTML = document.querySelector(".error");
    const recipesSection = document.querySelector(".card-recipe-container");
    const reset = document.querySelector(".fa-xmark");
    reset.style.display = "none";
    errorMsgHTML.innerHTML = "";
    errorMsgHTML.style.display = "none";
    updateAvailableFilters(recipesList, filtersList);

  });

  searchBar.addEventListener("input", function(){
      // console.log("Input event triggered");
      // searchBar.textContent = "";
      temporyRecipesArr = [];
      searchInRecipes(recipesList, searchBar.value, tagsList);
  });


// Fonction pour activer/désactiver le menu déroulant du filtre
function toggleDropdown(filterElement,iconElement, hiddenElement, property) {

    iconElement = filterElement.querySelector(".fa-solid");
    iconElement.classList.toggle("fa-angle-down");
    iconElement.classList.toggle("fa-angle-up");
    hiddenElement.classList.toggle(`filter-hidden-${property}`);
    hiddenElement.classList.toggle(`filter-visible-${property}`);
}

function setupFilter(filterElement, iconElement, hiddenElement, listElement, property, searchFunction, input, filteredRecipesArray, filterslist) {

  // Ajoutez un gestionnaire d'événements de clic à l'échelle du document
  document.addEventListener("click", function (event) {
    const isInsideDropdown = filterElement.contains(event.target);
    const isInputClicked = input.contains(event.target);
    // Vérifiez si le clic provient de l'intérieur ou de l'extérieur de la fenêtre
    if (!isInsideDropdown && !isInputClicked) {
      // Si le clic provient de l'extérieur, fermez la fenêtre sans activer le toggle
      hiddenElement.classList.remove(`filter-visible-${property}`);
      hiddenElement.classList.add(`filter-hidden-${property}`);
      iconElement.classList.remove("fa-angle-up");
      iconElement.classList.add("fa-angle-down");
    }
  });

  filterElement.addEventListener("click", function() {
      toggleDropdown(filterElement, iconElement, hiddenElement, property)
  if (dropdownOpen == 0) {
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
      arrayDataUniques = [...new Set(flattenedData)];

      dataSet.ing = [...new Set(tempData.ing.flat())];
      dataSet.app = [...new Set(tempData.app.flat())];
      dataSet.ust = [...new Set(tempData.ust.flat())];

      for (let i = 0; i < arrayDataUniques.length; i++) {
        listElement.innerHTML += `<span class="backgroundElement tag">${capitalize(arrayDataUniques[i])}</span>`;
      }
      dropdownOpen = 1;
  }
  const tags = document.querySelectorAll(".tag");


  if (filteredRecipesArray > 0) {
    updateAvailableFilters(filteredRecipesArray, filterslist);
  }

input.addEventListener("input", function() {
  if (input.value.length >=3)  {
    searchFunction(input); // Appeler la fonction de recherche appropriée
  } else {
    updateAvailableFilters(recipesList, filtersList);
  }
})
      tags.forEach(attachTagClickEvent); // fonctionne
  });
}

function attachTagClickEvent(tag) {
  tag.addEventListener("click", function () {
    const recipesSection = document.querySelector(".card-recipe-container");

    if (tag.parentElement.classList.contains("filter-list-ingredients")) {
      tagsList.ing.push(tag.textContent);
    } else if (tag.parentElement.classList.contains("filter-list-appliance")) {
      tagsList.app.push(tag.textContent);
    } else if (tag.parentElement.classList.contains("filter-list-ustensils")) {
      tagsList.ust.push(tag.textContent);
    }

    console.log("setupFilter Tag event FIN");
    recipesSection.innerHTML = "";
    showTagsList(tagsList);
    filterRecipesByTags(recipesList, tagsList);
    console.log("filtre actif normalement")
  });
}

function generateSuggestedTags(listElement, items) {
  listElement.innerHTML = "";
  items.forEach(item => {
    listElement.innerHTML += `<span class="backgroundElement tag">${capitalize(item)}</span>`;
  });
}

// Fonction de recherche pour les ingrédients
function searchIngredients(input) {
  const lowerInput = input.value.toLowerCase();
  const suggestedIngredients = [];
  dataSet.ing.forEach(ingredient => {
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
  dataSet.app.forEach(appareil => {
    const isMatchApplianceSuggested  = appareil.toLowerCase().includes(lowerInput);
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
  dataSet.ust.forEach(ustensil => {
    const isMatchUstensilSuggested  = ustensil.toLowerCase().includes(lowerInput);
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

  // Initialisation des gestionnaires d'événements pour les filtres
  const suggestedTagsForIng = document.getElementById("filter-ingredients-input");
  const filterIngredients = document.getElementById("filter-ingredients");
  const ingredientsIcon = document.getElementById("ingredients-icon");
  const filterListIngredients = document.querySelector(".filter-list-ingredients");
  const filterHiddenIngredients = document.querySelector(".filter-hidden-ingredients");
  const selectedTagsIngredients = document.querySelector(".selectedTags-ingredients");
  setupFilter(filterIngredients, ingredientsIcon, filterHiddenIngredients, filterListIngredients, "ingredients", searchIngredients, suggestedTagsForIng,filteredRecipesCopy, filtersList.ing);

  const suggestedTagsForUst = document.getElementById("filter-ustensils-input");
  const filterUstensils = document.getElementById("filter-ustensils");
  const ustensilsIcon = document.getElementById("ustensils-icon");
  const filterListUstensils = document.querySelector(".filter-list-ustensils");
  const filterHiddenUstensils = document.querySelector(".filter-hidden-ustensils");
  const selectedTagsUstensils = document.querySelector(".selectedTags-ustensils");
  setupFilter(filterUstensils, ustensilsIcon, filterHiddenUstensils, filterListUstensils, "ustensils", searchUstensils, suggestedTagsForUst,filteredRecipesCopy,filtersList.app);

  const suggestedTagsForApp = document.getElementById("filter-appliance-input");
  const filterAppareils = document.getElementById("filter-appliance");
  const appareilsIcon = document.getElementById("appliance-icon");
  const filterListAppareils = document.querySelector(".filter-list-appliance");
  const filterHiddenAppareils = document.querySelector(".filter-hidden-appliance");
  const selectedTagsAppareils = document.querySelector(".selectedTags-appliance");
  setupFilter(filterAppareils,appareilsIcon,filterHiddenAppareils, filterListAppareils, "appliance", searchAppareils,suggestedTagsForApp,filteredRecipesCopy,filtersList.ust);
}
