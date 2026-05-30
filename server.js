
const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.SPOONACULAR_API_KEY;

// Serve frontend files
app.use(express.static('public'));

// Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Search Recipes API
app.get('/api/recipes', async (req, res) => {

    try {

        const query = req.query.query;

        const response = await axios.get(
            'https://api.spoonacular.com/recipes/complexSearch',
            {
                params: {
                    apiKey: API_KEY,
                    query: query,
                    number: 12,
                    addRecipeInformation: true
                }
            }
        );

        res.json(response.data.results);

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            error: 'Failed to fetch recipes'
        });

    }

});

// Recipe Details API
app.get('/api/recipe/:id', async (req, res) => {

    try {

        const recipeId = req.params.id;

        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeId}/information`,
            {
                params: {
                    apiKey: API_KEY
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            error: 'Failed to fetch recipe details'
        });

    }

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/api/recipes/category', (req, res) => {
    const categoryRequested = req.query.name; // This catches "Indian", "Chinese", etc.
    
    // Mock database payload matching your setup
    const database = {
        "Indian": [
            { id: 101, title: "Butter Chicken", readyIn: "35 mins", description: "Tender chicken pieces cooked in a rich, velvety spiced tomato butter sauce." },
            { id: 102, title: "Paneer Tikka", readyIn: "25 mins", description: "Marinated cottage cheese cubes grilled with crunchy bell peppers and onions." }
        ],
        "Italian": [
            { id: 201, title: "Margherita Pizza", readyIn: "20 mins", description: "Crisp crust topped with aromatic tomato sauce, fresh mozzarella cheese, and basil leaves." }
        ],
        "Chinese": [
            { id: 301, title: "Vegetable Fried Rice", readyIn: "15 mins", description: "Wok-tossed rice mixed with vibrant fresh vegetables, soy sauce, and scallions." }
        ],
        "Desserts": [
            { id: 401, title: "Chocolate Brownie", readyIn: "30 mins", description: "Fudgy, rich chocolate squares served warm with a crisp crinkle top." }
        ],
        "Healthy": [
            { id: 501, title: "Mediterranean Salad", readyIn: "10 mins", description: "Crisp cucumbers, olives, cherry tomatoes, and feta tossed in olive oil." }
        ]
    };

    const results = database[categoryRequested] || [];
    res.json(results);
});


const cors = require("cors");
const fs = require("fs");


app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const userData = {
        name,
        email,
        message,
        date: new Date()
    };

    fs.appendFileSync(
        "data.txt",
        JSON.stringify(userData) + "\n"
    );

    res.json({
        message: "Form submitted successfully!"
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
