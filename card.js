//Fonction affichage de la liste apres boucle

export const createList = (recipes) => {
	const noRecipes = document.querySelector(".no-recipies");
	const blockRecipes = document.getElementById("block-recette");

	//Affichage de la liste des recettes créer apres filtres
	blockRecipes.innerHTML = recipes.map(recipesList).join("");
	if (recipes.length === 0) {
		//Affichage suggestion de recherche
		noRecipes.style.display = "block";
	} else {
		//Suppresion de la suggestion
		noRecipes.style.display = "none";
	}
};

//creation list des items depuis le nouveau tableau qu'a parcourue la boucle (recipesList)

function recipesList(item) {
	// recup concatener des item a afficher
	const { name, time, description, ingredients } = item;

	//affichage des item dans la liste des ingredients
	const listeIngredient = ingredients
		.map((infoIngredient) => {
			return `
				<li><strong>${infoIngredient.ingredient}</strong>: &nbsp; ${
				infoIngredient.quantity ? infoIngredient.quantity : "" // supprime les undefined
			}${
				infoIngredient.unit ? infoIngredient.unit : "" // supprime les undefined
			}
    </li>`;
		})
		.join(""); // supprime la virgule

	//affichage de la carte
	return `<article class="col-xl-4 col-md-6 card">
  <img class="image"/>
  <div class="row description p-3">
  <h3 class="col-md-7 titre mb-3 d-flex align-items-center">${name}</h3>
  <div class="col-md-5 time mb-3 d-flex align-items-center justify-content-end">
  <i class="bi bi-clock"></i> &nbsp;
  ${time + " " + "min"}
  </div>

  <ul class="col-md-6 list mb-3" id="ingredients">${listeIngredient}
  </ul>

  <p class="col-md-6 txt">${description.substring(0, 160) + "..."}</p>

  </div>

  </article>
  `;
}
