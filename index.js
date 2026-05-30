document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // SEARCH FUNCTIONALITY
    // =========================

    const searchBtn =
    document.getElementById("search-btn");

    const searchInput =
    document.getElementById("search");


    // SEARCH BUTTON WORKING

    if(searchBtn && searchInput){

        searchBtn.addEventListener("click", () => {

            const searchValue =
            searchInput.value.trim();

            if(searchValue === ""){

                alert("Please enter recipe name");

            }

            else{

                window.location.href =
                `recipes.html?search=${encodeURIComponent(searchValue)}`;

            }

        });


        // ENTER KEY SEARCH

        searchInput.addEventListener("keypress", (e) => {

            if(e.key === "Enter"){

                searchBtn.click();

            }

        });

    }



    // =========================
    // NAVBAR BUTTONS
    // =========================

    const homeBtn =
    document.getElementById("home-btn");

    if(homeBtn){

        homeBtn.addEventListener("click", () => {

            window.location.href = "index.html";

        });

    }



    const recipesBtn =
    document.getElementById("recipes-btn");

    if(recipesBtn){

        recipesBtn.addEventListener("click", () => {

            window.location.href = "recipes.html";

        });

    }



    const aiBtn =
    document.getElementById("ai-btn");

    if(aiBtn){

        aiBtn.addEventListener("click", () => {

            window.location.href = "ai.html";

        });

    }



    const contactBtn =
    document.getElementById("contact-btn");

    if(contactBtn){

        contactBtn.addEventListener("click", () => {

            window.location.href = "contact.html";

        });

    }



    // =========================
    // HERO SECTION BUTTONS
    // =========================

    const exploreBtn =
    document.getElementById("exp");

    if(exploreBtn){

        exploreBtn.addEventListener("click", () => {

            window.location.href = "recipes.html";

        });

    }



    const aiGeneratorBtn =
    document.getElementById("gen");

    if(aiGeneratorBtn){

        aiGeneratorBtn.addEventListener("click", () => {

            window.location.href = "ai.html";

        });

    }



    // =========================
    // IMAGE SLIDER
    // =========================

    let index = 0;

    const slides =
    document.querySelectorAll(".slide");

    const dots =
    document.querySelectorAll(".dot");


    function showSlide(i){

        slides.forEach(slide => {

            slide.classList.remove("active");

        });


        dots.forEach(dot => {

            dot.classList.remove("active");

        });


        if(slides[i]){

            slides[i].classList.add("active");

        }


        if(dots[i]){

            dots[i].classList.add("active");

        }

    }



    function nextSlide(){

        index++;

        if(index >= slides.length){

            index = 0;

        }

        showSlide(index);

    }



    if(slides.length > 0){

        setInterval(nextSlide, 3000);

    }



    // =========================
    // CATEGORY CARDS CLICK
    // =========================

    const cards =
    document.querySelectorAll("#card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const category =
            card.querySelector("p").innerText;

            window.location.href =
            `recipes.html?search=${encodeURIComponent(category)}`;

        });

    });



    // =========================
    // AI GENERATOR
    // =========================

    const generateBtn =
    document.getElementById("generate-btn");

    const aiInput =
    document.querySelector(".ai-input");

    const aiResult =
    document.getElementById("ai-result");



    if(generateBtn && aiInput && aiResult){

        generateBtn.addEventListener("click", generateRecipe);

    }



    function generateRecipe(){

        const ingredients =
        aiInput.value.trim();



        // EMPTY INPUT

        if(ingredients === ""){

            aiResult.innerHTML = `

            <div class="error-card">

                <h2>⚠ Please Enter Ingredients</h2>

            </div>

            `;

            return;

        }



        // LOADING EFFECT

        generateBtn.innerHTML =
        "Generating...";

        generateBtn.disabled = true;



        aiResult.innerHTML = `

        <div class="loading-card">

            <div class="loader"></div>

            <h2>🤖 AI Chef is Cooking...</h2>

        </div>

        `;



        // RANDOM DATA

        const recipeNames = [

            "Royal Indian Curry",
            "Spicy Masala Delight",
            "Healthy Protein Bowl",
            "Street Style Fusion",
            "Traditional Family Special",
            "Creamy Butter Magic",
            "Restaurant Style Feast",
            "Chef Signature Dish"

        ];



        const cookingStyles = [

            "Cook ingredients slowly with Indian spices and herbs.",

            "Mix ingredients with creamy masala and simmer well.",

            "Roast ingredients with butter and garlic flavour.",

            "Cook using traditional Indian street style technique.",

            "Bake ingredients until golden and crispy.",

            "Fry with onion, tomato and special seasonings."

        ];



        const emojis = [

            "🍲",
            "🔥",
            "😋",
            "🍛",
            "🍜",
            "🌮",
            "🍗"

        ];



        const difficulties = [

            "Easy",
            "Medium",
            "Hard"

        ];



        const calories =
        Math.floor(Math.random() * 500) + 200;



        const cookTime =
        Math.floor(Math.random() * 50) + 10;



        const servings =
        Math.floor(Math.random() * 5) + 1;



        const randomRecipe =
        recipeNames[
            Math.floor(
                Math.random() * recipeNames.length
            )
        ];



        const randomStyle =
        cookingStyles[
            Math.floor(
                Math.random() * cookingStyles.length
            )
        ];



        const randomEmoji =
        emojis[
            Math.floor(
                Math.random() * emojis.length
            )
        ];



        const randomDifficulty =
        difficulties[
            Math.floor(
                Math.random() * difficulties.length
            )
        ];



        // RESULT DELAY

        setTimeout(() => {

            aiResult.innerHTML = `

            <div class="ai-card">

                <h1>

                ${randomRecipe}
                ${randomEmoji}

                </h1>

                <br>

                <p>

                <strong>Ingredients:</strong>

                ${ingredients}

                </p>

                <br>

                <p>

                <strong>Cooking Process:</strong>

                ${randomStyle}

                </p>

                <br>

                <p>

                ⏱ Cooking Time:
                ${cookTime} mins

                </p>

                <br>

                <p>

                🔥 Calories:
                ${calories} kcal

                </p>

                <br>

                <p>

                👨‍🍳 Difficulty:
                ${randomDifficulty}

                </p>

                <br>

                <p>

                🍽 Servings:
                ${servings} People

                </p>

                <br>

                <button class="save-btn">

                    ❤️ Save Recipe

                </button>

            </div>

            `;



            // SAVE RECIPE

            const saveBtn =
            document.querySelector(".save-btn");



            if(saveBtn){

                saveBtn.addEventListener("click", () => {

                    localStorage.setItem(

                        "favoriteRecipe",

                        randomRecipe

                    );

                    alert(
                        "Recipe Saved Successfully ❤️"
                    );

                });

            }



            generateBtn.innerHTML =
            "Generate Recipe";

            generateBtn.disabled = false;

        }, 2500);

    }

});

const form = document.querySelector(".contact-form");
const popup = document.getElementById("popup");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    popup.style.display = "flex";

    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);

    form.reset();
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. Target all the inner card elements inside your #cards container
    const categoryCards = document.querySelectorAll("#cards > div");
    const resultsContainer = document.getElementById("results");

    // Replace this URL with your actual live backend endpoint
    const CATEGORY_API_URL = "http://localhost:5000/api/recipes/category";

    categoryCards.forEach(card => {
        // Change cursor style via JS to show they are clickable
        card.style.cursor = "pointer";

        card.addEventListener("click", async () => {
            // Get the text inside the <p> tag of the clicked card (e.g., "Indian", "Chinese")
            const categoryName = card.querySelector("p").innerText.trim();
            
            // Clear any active voice synthesis if it's currently speaking
            if (window.speechSynthesis && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }

            // 2. Put a clean placeholder loader in your #results div
            resultsContainer.innerHTML = `
                <div style="text-align: center; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05); margin-top: 20px;">
                    <p>🔍 Finding the best <strong>${categoryName}</strong> recipes for you...</p>
                </div>
            `;

            // 3. Smooth scroll down to display results to the user
            resultsContainer.scrollIntoView({ behavior: "smooth" });

            try {
                // 4. Fetch the recipes from your backend API
                const response = await fetch(`${CATEGORY_API_URL}?name=${encodeURIComponent(categoryName)}`);
                
                if (!response.ok) {
                    throw new Error("Server error fetching recipes");
                }

                const recipesList = await response.json();

                // 5. Handle empty state if no recipes match
                if (!recipesList || recipesList.length === 0) {
                    resultsContainer.innerHTML = `
                        <div style="padding: 20px; background: white; border-radius: 10px; text-align: center; margin-top: 20px;">
                            <p>🍽️ No recipes found in the <strong>${categoryName}</strong> category right now.</p>
                        </div>
                    `;
                    return;
                }

                // 6. Build the grid structure and render it cleanly into your #results container
                resultsContainer.innerHTML = `
                    <div style="margin-top: 30px; text-align: left;">
                        <h3 style="color: orange; margin-bottom: 20px; font-size: 22px;">✨ Popular ${categoryName} Collection</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
                            ${recipesList.map(recipe => `
                                <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); display: flex; flex-direction: column; justify-content: space-between;">
                                    <div>
                                        <h4 style="margin: 0 0 10px 0; color: #333; font-size: 18px;">${recipe.title}</h4>
                                        <p style="font-size: 14px; color: #666; line-height: 1.5; margin-bottom: 15px;">${recipe.description || 'A delicious, traditional culinary classic.'}</p>
                                    </div>
                                    <div style="border-top: 1px solid #eee; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
                                        <span style="color: #888; font-weight: bold;"><i class="fa-regular fa-clock"></i> ${recipe.readyIn || '30 mins'}</span>
                                        <button class="view-recipe-btn" data-id="${recipe.id}" style="padding: 6px 14px; background: orange; border: none; color: white; border-radius: 6px; cursor: pointer; font-weight: bold; transition: background 0.2s;">View</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

                // Add active behavior hook to click single buttons inside your generated results cards
                setupRecipeViewButtons();

            } catch (error) {
                console.error("Error loading category:", error);
                resultsContainer.innerHTML = `
                    <div style="padding: 20px; background: white; border-radius: 10px; text-align: center; color: red; margin-top: 20px;">
                        <p>❌ Failed to load recipes. Please verify your backend server connection.</p>
                    </div>
                `;
            }
        });
    });

    // Sub-logic to handle click actions on newly rendered "View" buttons
    function setupRecipeViewButtons() {
        const viewButtons = document.querySelectorAll(".view-recipe-btn");
        viewButtons.forEach(btn => {
            btn.addEventListener("mouseover", () => btn.style.background = "darkorange");
            btn.addEventListener("mouseout", () => btn.style.background = "orange");
            
            btn.addEventListener("click", (e) => {
                const id = e.target.getAttribute("data-id");
                alert(`Opening full details for recipe ID: ${id}`);
                // You can add logic here to pull full instructions or switch routes
            });
        });
    }
});
