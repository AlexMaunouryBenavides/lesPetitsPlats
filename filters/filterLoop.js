import { recipes } from "../data/recipes.js";
import { createList } from "../scripts/card.js";
import { filterRecipesByTag, getfilter } from "../scripts/dropdown.js";

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
export function filterRecipesBySearchFor(recipes, userInput) {
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
	//stock du tableau dans variables global pour pouvoir filtrer dedans
	window.filteredRecipes = [];
	//Affichage recettes ,depuis la liste filté, de la recherche voulue
	window.filteredRecipes = filterRecipesByTag(recipes, ...getfilter());
	if (e.target.value.length > 2) {
		window.filteredRecipes = filterRecipesBySearchFor(window.filteredRecipes, e.target.value);
		createList(window.filteredRecipes);
	} else {
		//affichage de toute la liste de recette
		createList(window.filteredRecipes);
	}
});
