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
        console.log(searchBar.textContent)
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
      })
  } else {
      reset.style.display = "none";
  }
  if (input.length >= 3) {
    searchBar.addEventListener("input", function(){
      if (temporyRecipesArr.length === 0) {
        console.log("test recherche principale NOK")
          recipesSection.innerHTML = "";
          errorMsgHTML.style.display = "block";
          errorMsgHTML.innerHTML = `Aucune recette ne contient "${searchBar.value}", vous pouvez chercher par exemple « tarte aux pommes », « poisson », etc. `;
      } else {
        console.log("test recherche principale OK")
        errorMsgHTML.style.display = "none";
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
      arrayOfRecipes.forEach(recipe =>  {
          const lowerInput = input.toLowerCase();
          if (recipe.name.toLowerCase().includes(lowerInput) ||
              recipe.description.toLowerCase().includes(lowerInput) ||
              recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInput))
          ) {
              temporyRecipesArr.push(recipe);
          }

          const isMatchIngredient = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInput));
          const isMatchAppliance = recipe.appliance.toLowerCase().includes(lowerInput);
          const isMatchUstensil = recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(lowerInput));
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
      });
      displayData(temporyRecipesArr);
      updateAvailableFilters(temporyRecipesArr, filtersList)
  }
}

searchBar.addEventListener("click", function(){
    const errorMsgHTML = document.querySelector(".error");
    const recipesSection = document.querySelector(".card-recipe-container");
    const reset = document.querySelector(".fa-xmark");
    reset.style.display = "none";
    searchBar.value = "";
    recipesSection.innerHTML = "";
    errorMsgHTML.innerHTML = "";
    errorMsgHTML.style.display = "none";
    filtersList.ing = [];
    filtersList.app = [];
    filtersList.ust = [];
    tagsList.ing = [];
    tagsList.app = [];
    tagsList.ust = [];
    listTagsHtml.innerHTML = "";
    init();
    searchBar.addEventListener("input", function(){
        console.log("Input event triggered");
        searchBar.textContent = "";
        temporyRecipesArr = [];
        searchInRecipes(recipesList, searchBar.value, tagsList);
    });
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
