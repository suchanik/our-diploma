const express = require('express');
const router = express.Router();

const ingredientsService = require("../service/IngredientsService");

router.get('/', async (req, res) => {
    const ingredients = await ingredientsService.getAllIngredients();

    res.render("ingredientsPage", {
        title: "Epapu",
        ingredients
    })
});

module.exports = router