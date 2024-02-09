const listTagsHtml = document.querySelector(".listTags");
const recipesSection = document.querySelector(".card-recipe-container");
searchBar = document.getElementById("searchbar");

let filteredRecipes;
let temporyFilteredRecipes = [];
let previousTemporyFilteredRecipes = [];
let filteredRecipesCopy = [];

const tagsList = {
  ing: [],
  app: [],
  ust: []
};


function showTagsList (arrayOfTagList) {
    let tagListModelHtml = "";
    const searchValue = searchBar.value.toLowerCase();
    if (arrayOfTagList.ing.length > 0) {
      arrayOfTagList.ing.forEach((tag, index)  => {
        if (tag.toLowerCase() !== searchValue) {
          tagListModelHtml += `<div class="show-tag">
          <span>${tag}</span>
          <span onclick="deleteTagsList(${index},'ing')" class="delete-tag ing"><i class="fa-solid fa-xmark "></i></span>
          </div>`;
        }
      });
    }
    if (arrayOfTagList.app.length > 0) {
      arrayOfTagList.app.forEach((tag, index) => {
        if (tag.toLowerCase() !== searchValue) {
          tagListModelHtml += `<div class="show-tag">
          <span>${tag}</span>
          <span onclick="deleteTagsList(${index},'app')" class=" delete-tag app"><i class="fa-solid fa-xmark "></i></span>
          </div>`;
        }
      });
    }
    if (arrayOfTagList.ust.length > 0) {
      arrayOfTagList.ust.forEach((tag, index) => {
        if (tag.toLowerCase() !== searchValue) {
          tagListModelHtml += `<div class="show-tag">
          <span>${tag}</span>
          <span onclick="deleteTagsList(${index},'ust')" class="delete-tag ust"><i class="fa-solid fa-xmark "></i></span>
          </div>`;
        }
      });
    }
    listTagsHtml.innerHTML = tagListModelHtml;

    const deleteIcons = document.querySelectorAll(".delete-tag");
    deleteIcons.forEach((icon) => {
        icon.style.visibility = "hidden";

        icon.parentElement.addEventListener("mouseenter", function () {
            icon.style.visibility = "visible";
        });

        icon.parentElement.addEventListener("mouseleave", function () {
            icon.style.visibility = "hidden";
        });
    });
}

showTagsList(tagsList);

function filterRecipesByTags(arrayOfRecipes, tagslist) {
  if (tagslist.ing.length > 0 || tagslist.app.length > 0 || tagslist.ust.length > 0) {
    // Filtrer les recettes en fonction des tagslist
    const filteredRecipes = arrayOfRecipes.filter(recipe => {
      const matchesIng = tagslist.ing.every(tag => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())));
      const matchesApp = tagslist.app.every(tag => recipe.appliance.toLowerCase().includes(tag.toLowerCase()));
      const matchesUst = tagslist.ust.every(tag => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.toLowerCase())));

      return matchesIng && matchesApp && matchesUst;
    });

    displayData(filteredRecipes);
    filteredRecipesCopy = [...filteredRecipes];
    updateAvailableFilters(filteredRecipes, filtersList);
  } else {
    console.log("hey hey hey")
    // Si tagslist est vide, afficher arrayOfRecipes par défaut
    displayData(arrayOfRecipes);
  }
}


function deleteTagsList(index, category) {
    recipesSection.innerHTML = "";
    tagsList[category].splice(index, 1);
    showTagsList(tagsList)
    console.log("deleteTagsList A");

    if (tagsList.ing.length > 0 || tagsList.app.length > 0 || tagsList.ust.length > 0 ) {
      recipesSection.innerHTML = "";
      filterRecipesByTags(recipesList,tagsList)
      console.log("deleteTagsList B");

    } else if (tagsList.ing.length == 0 && tagsList.app.length == 0 && tagsList.ust.length == 0 && searchBar.value) {
        if (searchBar.value == "Rechercher une recette, un ingrédient, ...") {
          console.log("deleteTagsList C1");
          filtersList.ing = [];
          filtersList.app = [];
          filtersList.ust = [];
          displayData(recipesList);
          dropdownOpen = 0;
          location.reload();
        } else {
          recipesSection.innerHTML = "";
          displayData(temporyRecipesArr)
          console.log("deleteTagsList C2");
        }
    } else if (tagsList.ing.length == 0 && tagsList.app.length == 0 && tagsList.ust.length == 0 && !searchBar.value){
      displayData(recipesList);
      filtersList.ing = [];
      filtersList.app = [];
      filtersList.ust = [];
      temporyRecipesArr = [];
      temporyFilteredRecipes = [];
      filteredRecipes = [];
      dropdownOpen = 0;
    }
}

filterListUstensils = document.querySelector(".filter-list-ustensils");
filterListAppareils = document.querySelector(".filter-list-appliance");
filterListIngredients = document.querySelector(".filter-list-ingredients");


function updateAvailableFilters(filteredRecipesArray, filtersList) {
  const allIngredients = filteredRecipesArray.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));
  filterListIngredients.innerHTML = "";
  filtersList.ing = [...new Set(allIngredients)];
  const allAppliance = filteredRecipesArray.map(recipe => recipe.appliance);
  filterListAppareils.innerHTML = "";
  filtersList.app = [...new Set(allAppliance)];
  const allUstensils = filteredRecipesArray.flatMap(recipe => recipe.ustensils);
  filterListUstensils.innerHTML = "";
  filtersList.ust = [...new Set(allUstensils)];
  for (let i = 0; i < filtersList.ing.length; i++) {
    filterListIngredients.innerHTML += `<span class="backgroundElement tag">${capitalize(filtersList.ing[i])}</span>`;
  }
  for (let i = 0; i < filtersList.app.length; i++) {
    filterListAppareils.innerHTML += `<span class="backgroundElement tag">${capitalize(filtersList.app[i])}</span>`;
  }
  for (let i = 0; i < filtersList.ust.length; i++) {
    filterListUstensils.innerHTML += `<span class="backgroundElement tag">${capitalize(filtersList.ust[i])}</span>`;
  }
}
