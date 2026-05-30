// ==========================
// URL SEARCH PARAMS
// ==========================

const params =
new URLSearchParams(window.location.search);

const searchValue =
params.get("search");

const container =
document.getElementById("recipe-cards");


// ==========================
// LETTER SYSTEM
// ==========================

let currentLetter = "a";

let loading = false;


// ==========================
// FETCH RECIPES
// ==========================

async function fetchRecipes(query = "Indian", append = false){

    if(loading) return;

    loading = true;

    if(!append){

        container.innerHTML =
        "<h2>Loading Recipes...</h2>";

    }

    try{

        const response =
        await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );

        const data =
        await response.json();

        displayRecipes(data.meals, append);

    }
    catch(error){

        console.log(error);

        container.innerHTML =
        "<h2>Failed To Load Recipes</h2>";

    }

    loading = false;

}


// ==========================
// DISPLAY RECIPES
// ==========================

function displayRecipes(meals, append = false){

    if(!append){

        container.innerHTML = "";

    }

    if(!meals){

        if(!append){

            container.innerHTML =
            "<h2>No Recipes Found</h2>";

        }

        return;

    }

    meals.forEach(meal => {

        container.innerHTML += `

        <div class="card1">

            <img src="${meal.strMealThumb}">

            <div class="cd">

                <p>${meal.strMeal}</p>

                <button id="view"

onclick="window.location.href='recipedetails.html?id=${meal.idMeal}'">

View Recipe

</button>

            </div>

        </div>

        `;

    });

}


// ==========================
// CATEGORY SEARCH
// ==========================

async function searchCategory(category){

    container.innerHTML =
    "<h2>Loading Recipes...</h2>";

    try{

        const response =
        await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );

        const data =
        await response.json();

        displayRecipes(data.meals);

    }
    catch(error){

        console.log(error);

    }

}


// ==========================
// AUTO LOAD
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    if(searchValue){

        fetchRecipes(searchValue);

    }
    else{

        fetchRecipes("Indian");

    }

});


// ==========================
// INFINITE SCROLLING
// ==========================

window.addEventListener("scroll", () => {

    const bottomReached =

    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 100;

    if(bottomReached){

        fetchRecipes(currentLetter, true);

        currentLetter =

        String.fromCharCode(
        currentLetter.charCodeAt(0) + 1
        );

    }

});