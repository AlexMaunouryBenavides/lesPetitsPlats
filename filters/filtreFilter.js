import { recipes } from "../data/recipes.js";
import { createList } from "../scripts/card.js";
import { filterRecipesByTag, getfilter } from "../scripts/dropdown.js";

const searchInput = document.getElementById("txtSearch");

//FILTRE INPUT PRINCIPALE
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
// Creation des cartes depuis la liste des recettes
createList(recipes);

// Evenement recherche sur input
searchInput.addEventListener("input", (e) => {
	//stock du tableau dans variables global pour pouvoir filtrer dedans
	window.filteredRecipes = [];
	//Affichage recettes ,depuis la liste filté, de la recherche voulue
	window.filteredRecipes = filterRecipesByTag(recipes, ...getfilter());
	if (e.target.value.length > 2) {
		window.filteredRecipes = filterRecipesBySearch(window.filteredRecipes, e.target.value);
		createList(window.filteredRecipes);
	} else {
		//affichage de toute la liste de recette (filtrer sur les tags)
		createList(window.filteredRecipes);
	}
});
