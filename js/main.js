import { recipes } from "./data/recipes.js";
import { RecipesCard } from "./utils/constructor.js";
import { searchBar } from "./utils/searchBar.js";
import { init, createFiltersLists } from "./utils/filter.js";

export { lowerCaseNormalize, displayRecipes, generateFiltersLists };

//// get recipes list (original + updated) and launch init ////

function getData(recipesList) {
  recipesList = data();
  init(recipesList);
}

function data() {
  const searchInput = document.getElementById("site-search");
  let recipesList = recipes;
  if (searchInput.value >= 3) {
    recipesList = searchBar(recipesList);
  }
  return recipesList;
}

//// display recipes function ////

function displayRecipes(recipesList) {
  console.time("loop");
  const recipesSection = document.getElementById("recipes");
  recipesSection.innerHTML = "";
  recipesList.forEach((recipe) => {
    recipesSection.appendChild(new RecipesCard(recipe).buildCard());
  });
  console.timeEnd("loop");
}

// function displayRecipes(recipeList) {
//   console.time("loop");
//   const recipesSection = document.getElementById("recipes");
//   recipesSection.innerHTML = "";
//   for (let i = 0; i < recipeList.length; i++) {
//     recipesSection.appendChild(new RecipesCard(recipeList[i]).buildCard());
//   };
//   console.timeEnd("loop");
// }

//// generate and create filters lists ////

function generateFiltersLists(recipesList, ingredientsList, appliancesList, ustensilsList) {
  let recipeName = []  
  let ingredients = [];
  let appliances = [];
  let ustensils = [];

  recipesList.forEach((recipe) => {
    recipeName.push(getData)
    recipe.ingredients.map((element) => ingredients.push(element.ingredient));
    appliances.push(recipe.appliance);
    recipe.ustensils.map((element) => ustensils.push(element));
  });
  ingredientsList = [...new Set(ingredients)].sort();
  appliancesList = [...new Set(appliances)].sort();
  ustensilsList = [...new Set(ustensils)].sort();

  createFiltersLists(recipesList, ingredientsList, appliancesList, ustensilsList);

  return { ingredientsList, appliancesList, ustensilsList };
}

//// function to lower case and normalize text ////

function lowerCaseNormalize(items) {
  return items
    .toLowerCase()
}

//// launch ////

getData();