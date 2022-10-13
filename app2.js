import { recipes } from "./recipes.js";
import { createList } from "./card.js";
import { filterRecipesByTag, getfilter } from "./dropdown.js";

const searchInput = document.getElementById("txtSearch");

//FILTRE PRINCIPALE  (filter)
export function filterRecipesBySearch(recipes, userInput) {
	return recipes.filter((item) => {
		return (
			item.name.toLowerCase().includes(userInput) ||
			item.description.toLowerCase().includes(userInput) ||
			item.ingredients.filter((ingredientInfo) => ingredientInfo.ingredient.toLowerCase().includes(userInput)).length >
				0
		);
	});
}

//FILTRE PRINCIPALE  (for)
function getFilterForRecipes(recipes, userInput) {
	const recipiesFormat = [];
	for (let i = 0; i < recipes.length; i++) {
		let recipe = recipes[i];
		if (recipe.name.toLowerCase().includes(userInput) || recipe.description.toLowerCase().includes(userInput)) {
			recipiesFormat.push(recipe);
			continue;
		}
		for (let a = 0; a < recipe.ingredients.length; a++) {
			if (recipe.ingredients[a].ingredient.toLowerCase().includes(userInput)) {
				recipiesFormat.push(recipe);
			}
		}
	}
	return recipiesFormat;
}

// Creation des cartes depuis la liste des recettes
createList(recipes);

// Evenement recherche sur input
searchInput.addEventListener("input", (e) => {
	//Affichage recettes ,depuis la liste filté, de la recherche voulue
	const filterRecipes = filterRecipesByTag(recipes, ...getfilter());
	if (e.target.value.length > 2) {
		createList(filterRecipesBySearch(filterRecipes, e.target.value));
	} else {
		//affichage de toute la liste de recette
		createList(filterRecipes);
	}
});
