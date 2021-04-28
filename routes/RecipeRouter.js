const express = require('express');
const router = express.Router();
const connection = require("../config/db_config")
const recipeService = require("../service/RecipeService");

//wyszukiwanie po składnikach
router.post('/all_recipes_by_ingredients', async function(req, res, next) {
    const ingrediendsIDs = req.body.ingrediendsIDs;

    const allRecipes = await recipeService.getRecipesByRecipe_ingredient(ingrediendsIDs)
    const filteredRecipes = await filterRecipes(allRecipes, ingrediendsIDs);
    res.json(filteredRecipes);
});



const filterRecipes =  async (recipes, ingredientsIDs) => {

    const recipeIngredients = [];


    for (const recipe of recipes) {
        const ingredients = await recipeService.getRecipeByIngredientsID(recipe.id);

        recipeIngredients.push({...recipe, ingredients})
    }

    const filteredRecipes = recipeIngredients.filter(elem => {
        return elem.ingredients.every(i => ingredientsIDs.includes(i.id.toString()));
    });

    console.log(filteredRecipes)

    return recipes.filter(recipe => filteredRecipes
                                        .map(recipeWithIngredient => recipeWithIngredient.id)
                                        .includes(recipe.id)
    );
}

/////////////////////
router.get('/randomRecipe', function (req, res, next) {

    connection.query("select name from recipes where id_user = ?", [req.session.userId], ((err, result, fields) =>  {
        const data = result.shift();
        res.render('randomRecipe', {
            name: data.name,
        });
    }))
});
////////////////////////

//wyszukiwanie po kategoriach
router.post('/all_recipes_by_category', async function(req, res, next) {
    const rec_cat = req.body.rec_cat;

    const allRecipes = await recipeService.getRecipesByRecipe_category(rec_cat)
    const filteredRecipes = await filterRecipesByCategory(allRecipes, rec_cat);
    res.json(filteredRecipes);
});



const filterRecipesByCategory =  async (recipes, categoryIDs) => {

    const recipeCategory = [];


    for (const recipe of recipes) {
        const category = await recipeService.getRecipesByCategory(recipe.id);

        recipeCategory.push({...recipe, category})
    }

    const filteredRecipes = recipeCategory.filter(elem => {
        return elem.category.every(i => categoryIDs.includes(i.id.toString()));
    });

    console.log(filteredRecipes)

    return recipes.filter(recipe => filteredRecipes
        .map(recipeWithCategory => recipeWithCategory.id)
        .includes(recipe.id)
    );
}

module.exports = router;