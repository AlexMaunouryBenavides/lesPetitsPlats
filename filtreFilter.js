import { recipes } from "./recipes.js";
import { createList } from "./card.js";
import { filterRecipesByTag, getfilter } from "./dropdown.js";

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
	//Affichage recettes ,depuis la liste filté, de la recherche voulue
	const filterRecipes = filterRecipesByTag(recipes, ...getfilter());
	if (e.target.value.length > 2) {
		createList(filterRecipesBySearch(filterRecipes, e.target.value));
	} else {
		//affichage de toute la liste de recette (filtrer sur les tags)
		createList(filterRecipes);
	}
});
