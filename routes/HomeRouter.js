const express = require('express');
const router = express.Router();
const connection = require("../config/db_config")

const ingredientsService = require("../service/IngredientsService");
const recipeService = require("../service/RecipeService");

/* GET home page. */
router.get('/', async (req, res) => {
    const ingredients = await ingredientsService.getAllIngredients();
    const lastRecipes = await recipeService.getLast3Recipes();

    res.render("main", {
        title: "Epapu",
        ingredients,
        lastRecipes,
    })
});




module.exports = router;
