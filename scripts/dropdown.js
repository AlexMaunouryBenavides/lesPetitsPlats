import { recipes } from "../data/recipes.js";
import { createList } from "./card.js";
import { filterRecipesBySearchFor } from "../filters/filterLoop.js";

// Fonction filtre sur les tags
export function filterRecipesByTag(recipes, filterIngredients, filterUstancils, filterAppareils) {
	let recipesFilter = recipes;
	if (filterIngredients.length > 0) {
		recipesFilter = recipes.filter((recipe) =>
			filterIngredients
				.map((ingredientToFilter) => ingredientToFilter.toLowerCase())
				.every((ingredientToFilter) =>
					recipe.ingredients
						.map((infoIngredient) => infoIngredient.ingredient.toLowerCase())
						.includes(ingredientToFilter)
				)
		);
	}
	if (filterUstancils.length > 0) {
		recipesFilter = recipesFilter.filter((recipe) =>
			filterUstancils
				.map((ustancilToFilter) => ustancilToFilter.toLowerCase())
				.every((ustancilToFilter) =>
					recipe.ustensils.map((ustensils) => ustensils.toLowerCase()).includes(ustancilToFilter)
				)
		);
	}
	if (filterAppareils.length > 0) {
		recipesFilter = recipesFilter.filter(
			(recipe) =>
				filterAppareils.filter((appareilsToFilter) =>
					appareilsToFilter.toLowerCase().includes(recipe.appliance.toLowerCase())
				).length > 0
		);
	}

	return recipesFilter;
}

// Recup des INGREDIENTS dans nouveau tableau
function recupeIngredients(recipes) {
	if(!window.filterRecipes ) {
		window.filteredRecipes = recipes;
	}
	let tableau = [];
	window.filteredRecipes.forEach((recipe) => {
		tableau = [
			...tableau,
			...recipe.ingredients.map(
				(infoIngredient) =>
					infoIngredient.ingredient.toLowerCase()[0].toUpperCase() + infoIngredient.ingredient.slice(1).toLowerCase()
			),
		];
	});
	tableau = [...new Set(tableau)];
	return tableau;
}

// Recup des USTENSILS dans nouveau tableau
function recupeUstensils2(recipes) {
	let tableau = [];
	recipes.forEach((recipe) => {
		tableau = [
			...tableau,
			...recipe.ustensils.map(
				(infoUstensils) => infoUstensils.toLowerCase()[0].toUpperCase() + infoUstensils.slice(1).toLowerCase()
			),
		];
	});
	tableau = [...new Set(tableau)];
	return tableau;
}

// //Recup des APPAREILS dans nouveau tableau

function recupeAppareils2(recipes) {
	let tableau = [];
	recipes.forEach((recipe) => {
		tableau = [...tableau, recipe.appliance.toLowerCase()[0].toUpperCase() + recipe.appliance.slice(1).toLowerCase()];
	});
	tableau = [...new Set(tableau)];
	return tableau;
}

/// / Creation des TAGS ////

function createTags(label, id, tableau) {
	const div = document.createElement("div");
	div.classList.add("tags", `${id}-tag`);
	const span = document.createElement("span");
	span.innerHTML = label;
	const closeBtn = document.createElement("i");
	closeBtn.setAttribute("class", "bi bi-x-circle");

	div.appendChild(span);
	div.appendChild(closeBtn);
	// Supression tags et renvoie dans la liste apres supression
	closeBtn.addEventListener("click", () => {
		updateGenerateList(id, tableau);
		div.remove();
		const searchInput = document.getElementById("txtSearch");
		const filterRecipes = filterRecipesByTag(recipes, ...getfilter());
		createList(filterRecipesBySearchFor(filterRecipes, searchInput.value));
	});
	return div;
}

// Fonction open/close(creer/detruit) liste des boutons
function generateList(id, tableau) {
	const input = document.getElementById(`input${id}`);
	//const btnDropdowns = document.querySelectorAll(".dropdowns"); // essaie changer la bordure des dropdowns
	input.classList.add("close");
	input.addEventListener("click", () => {
		input.classList.toggle("close");
		if (input.classList.contains("close")) {
			const dropDown = document.getElementById(`${id}`);

			dropDown.innerHTML = "";
			dropDown.style.display = "none";
		} else {
			// btnDropdowns[0].style.background = "red";
			// btnDropdowns[0].style.borderRadius = "";
			// obj.style.removeProperty("border");

			updateGenerateList(id, filterList(tableau, input.value));
		}
	});
	// fermer les listes au click sur le body
	document.body.addEventListener("click", (e) => {
		if (!e.target.closest(`#${id}, #input${id}, .tags `)) {
			if (!input.classList.contains("close")) {
				const dropDown = document.getElementById(`${id}`);
				input.classList.toggle("close");
				dropDown.style.display = "none";
			}
		}
	});
}

// Nouvelle liste avec ajout des evenement
function updateGenerateList(id, tableau) {
	console.log(tableau);
	const dropDown = document.getElementById(`${id}`);
	dropDown.innerHTML = tableau.map((element) => `<li>${element}</li>`).join("");
	dropDown.style.display = "flex";
	const input = document.getElementById(`input${id}`);

	const dropDownLi = document.querySelectorAll(`#${id} li`);
	const filtres = document.querySelector(".filtres-actifs");
	dropDownLi.forEach((element) => {
		element.addEventListener("click", (e) => {
			e.stopPropagation(); // block l 'event  du parent pour pallier à la fermture de la liste
			const tag = createTags(element.innerHTML, id, tableau, filtres);
			filtres.prepend(tag);

			if(!window.filteredRecipes ) {
				window.filteredRecipes = recipes;
			}
			window.filteredRecipes = filterRecipesByTag(window.filteredRecipes, ...getfilter());
			createList(window.filteredRecipes);

			input.value = "";
			const newTab = tableau.filter((elem) => elem !== element.innerHTML);
			updateGenerateList(id, newTab);
		});
	});
}
export function getfilter() {
	const listeIdFilter = ["Ingredients", "Ustensils", "Appareils"];
	const filtres = document.querySelector(".filtres-actifs");
	return listeIdFilter.map((id) =>
		[...filtres.querySelectorAll(`.${id}-tag span`)].map((tag) => tag.innerHTML.toLowerCase())
	);
}

const listeFilter = [
	{
		id: "Ingredients",
		tableau: ()=> recupeIngredients(recipes),
	},
	{
		id: "Ustensils",
		tableau: ()=> recupeUstensils2(recipes),
	},
	{
		id: "Appareils",
		tableau: ()=> recupeAppareils2(recipes),
	},
];

listeFilter.forEach((liste) => {
	generateList(liste.id, liste.tableau());
	const input = document.getElementById(`input${liste.id}`);
	input.addEventListener("input", (e) =>
		updateGenerateList(liste.id, filterList(liste.tableau(), e.target.value.toLowerCase()))
	);
});

// Fonction filtre des boutons avec method filter()
function filterList(tableau, value) {
	if (value) {
		// si filtre
		const tableauFilter = tableau.filter(
			(item) => item.toLowerCase().includes(value) // on filtre et on return
		);
		return [...new Set(tableauFilter)];
	}
	return tableau; // sinon retourne le tableau de base
}
