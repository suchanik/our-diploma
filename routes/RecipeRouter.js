const express = require('express');
const router = express.Router();
const connection = require("../config/db_config")
const recipeService = require("../service/RecipeService");
const commentService = require("../service/CommentService")
const ratingService = require("../service/RatingService")


//wyszukiwanie po składnikach
router.post('/all_recipes_by_ingredients', async (req, res, next) => {
    const ingrediendsIDs = req.body.ingrediendsIDs;

    const allRecipes = await recipeService.getRecipesByRecipe_ingredient(ingrediendsIDs)
    const filteredRecipes = await filterRecipes(allRecipes, ingrediendsIDs);
    res.json(filteredRecipes);
});

//wyszukiwanie po kategoriach
router.post('/all_recipes_by_category', async (req, res, next)=>{
    try{
        const categoryIDs = req.body.categoryIDs;

        const allRecipes = await recipeService.getRecipesByRecipe_category(categoryIDs)
        res.json(allRecipes);
    }catch (err){
        next(err);
    }
});



const filterRecipes =  async (recipes, ingredientsIDs) => {

    const recipeIngredients = [];


    for (const recipe of recipes) {
        const ingredients = await recipeService.getIngredientsByRecipeId(recipe.id);

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
router.get('/randomRecipe', (req, res, next) => {

    connection.query("select name from recipes where id_user = ?", [req.session.userId], ((err, result, fields) =>  {
        const data = result.shift();
        res.render('randomRecipe', {
            name: data.name,
        });
    }))
});
////////////////////////

router.get('/:id', async (req, res) => {
    const recipeId = req.params.id;

    const recipe = await recipeService.getRecipeById(recipeId);
    const ingredient = await recipeService.getIngredients(recipeId);
    const showComment = await commentService.getCommentsByRecipeId(recipeId);
    const showAvgRating = await ratingService.getRatingByRecipeId(recipeId);

    res.render('randomRecipe', {
        recipe: recipe,
        ingredient: ingredient,
        comment: showComment,
        rating: showAvgRating,
    });
})

router.post('/:id', async (req, res, next) => {
    const recipeId = req.params.id;
    const description = req.body.description;
    const addComment = await commentService.addComment(recipeId)

    res.json(addComment);
});




module.exports = router;