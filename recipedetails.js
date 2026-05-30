
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const details = document.getElementById("details");

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
.then(res => res.json())
.then(data => {

    const meal = data.meals[0];

    // cooking time
    let cookingTime;
    if (meal.strInstructions.length < 500) cookingTime = "20 - 30 mins";
    else if (meal.strInstructions.length < 1000) cookingTime = "35 - 50 mins";
    else cookingTime = "1 hour";

    // ingredients
    let ingredientsHTML = "";
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ing && ing.trim() !== "") {
            ingredientsHTML += `
                <li>${ing} - ${measure ? measure : ""}</li>
            `;
        }
    }

    // ONLY STEPS (RIGHT SIDE)
    const stepsHTML = meal.strInstructions
    .split(". ")
    .map((step, index) => {
        if (step.trim() !== "") {
            return `
            <div class="step-box">
                <div class="step-title">Step ${index + 1}</div>
                <div class="step-text">${step.trim()}.</div>
            </div>
            `;
        }
    }).join("");

    details.innerHTML = `
    <div class="recipe-layout">

        <!-- LEFT SIDE -->
        <div class="left-side">

            <h1 class="title">${meal.strMeal}</h1>

            <img src="${meal.strMealThumb}" class="image">

            <div class="info-boxes">
                <div class="info-card">
                    <h3>Category</h3>
                    <p>${meal.strCategory}</p>
                </div>

                <div class="info-card">
                    <h3>Cuisine</h3>
                    <p>${meal.strArea}</p>
                </div>

                <div class="info-card">
                    <h3>Time</h3>
                    <p>${cookingTime}</p>
                </div>
            </div>

            <div class="ingredients-box">
                <h2>Ingredients</h2>
                <ul>${ingredientsHTML}</ul>
            </div>

        </div>

        <!-- RIGHT SIDE (ONLY STEPS) -->
        <div class="right-side">

            <h2>Cooking Steps</h2>

            ${stepsHTML}

        </div>

    </div>
    `;
});