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

router.get('/top', function (req,res) {
    connection.query('SELECT ROUND(AVG(rate),1) as average, recipes.name, recipes.id_recipe from rating ' +
        'inner join recipes on recipes.id_recipe = rating.id_recipe ' +
        'group by name order by average desc;',function (error, results, fields) {
        if(error){
            console.log("error");
        }else{
            console.log(results)
            res.render("topRecipesPage", {
                title: "Epapu",
                top: results,
            })
        }
    });
});



module.exports = router;
