const express = require('express');
const router = express.Router();
const connection = require("../config/db_config")
const recipeService = require("../service/RecipeService");

router.post('/all_recipes_by_ingredients', async function(req, res, next) {
    const ingrediendsIDs = req.body.ingrediendsIDs;

    const allRecipes = await recipeService.getAllByIngredientsIDs(ingrediendsIDs)
    const filteredRecipes = await filterRecipes(allRecipes, ingrediendsIDs);
    res.json(filteredRecipes);
});



const filterRecipes =  async (recipes, ingredientsIDs) => {

    const recipeIngredients = [];


    for (const recipe of recipes) {
        const ingredients = await recipeService.getAllByRecipeId(recipe.id);

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



// router.post('/all_recipes_by_ingredients', function(req, res, next) {
//  const ingrediendsIDs = req.body.ingrediendsIDs;

//     connection.query(
//         'select name, opis, ing_name from recipes ' +
//         'left join `recipe-ingredient` on recipes.id_recipe = `recipe-ingredient`.ID_recipe ' +
//         'left join ingredients i on `recipe-ingredient`.ID_ingredient = i.ID_ingredient' +
//         'where ing_name = (?)',[ingrediendsIDs], function (error, results, fields) {
//             console.log(results);
//             res.json(results)
//         });
// });

module.exports = router;