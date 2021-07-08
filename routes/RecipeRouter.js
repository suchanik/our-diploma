const express = require('express');
const router = express.Router();
const connection = require("../config/db_config")
const fileUpload = require('express-fileupload')

const recipeService = require("../service/RecipeService");
const commentService = require("../service/CommentService")
const ratingService = require("../service/RatingService");
const ingredientsService = require("../service/IngredientsService");
const categoryService = require("../service/CategoryService");


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

router.get('/addRecipe',  async (req, res, next) => {

    const {loggedIn} = req.session;

    if (!loggedIn) {
        res.render("error")
    }
    else {
        let ingredients = await ingredientsService.getAllIngredients();
        let categories = await categoryService.getAllCategories();
        let recipeName = await recipeService.getRecipebyUserIDs();
            res.render('addRecipe', {
                ingredients,
                categories,
                recipeName,
            });
    }
});

router.post('/addRecipe',  async (req, res, next) => {
    try{
        const {recipeName, ingredientsIds, categoryIDs, description} = req.body;
        const {userId} = req.session;
        const {photoName, data} = req.files.pic;
        console.log(req.files.pic);
        if(photoName && data){
            let recipeId = await recipeService.addNewRecipe(recipeName, ingredientsIds, categoryIDs, description, userId, photoName, data);
            res.redirect(`/recipes/${recipeId}`)
        }else {
            res.sendStatus(400)
        }
    }catch (err){
        next(err);
    }


});



/////////////////////
router.get('/randomRecipe', (req, res, next) => {
    recipeService
        .getRandomRecipeId()
        .then(recipeId => {
            res.redirect(`/recipes/${recipeId}`);
        })
});
////////////////////////



router.post('/addComment', async (req, res, next) => {
    try{
        const {userId, recipeId, description} = req.body;
        await commentService.addComment(userId,recipeId,description)
        res.json("Udało sie dodać komentarz");
    }catch (err){
        res.status(500).send()
        next(err)
    }
});

router.post('/addRate', async (req, res, next) => {
    try{
        const {userId, recipeId, rate} = req.body;
        await ratingService.addRate(userId,recipeId,rate)
        res.json("Udało sie dodać ocenę");
    }catch (err){
        res.status(500).send()
        next(err)
    }
});

router.get('/top', async (req,res) => {
    const recipes = await recipeService.getTopRecipes();

    res.render("topRecipesPage", {
        title: "Epapu",
        top: recipes,
    })
});


router.get('/:id', async (req, res) => {
    const recipeId = req.params.id;

    const recipe = await recipeService.getRecipeById(recipeId);
    const ingredient = await recipeService.getIngredients(recipeId);
    const showComment = await commentService.getCommentsByRecipeId(recipeId);
    const avgRating = await ratingService.getRatingByRecipeId(recipeId);

    res.render('randomRecipe', {
        recipe: recipe,
        ingredient: ingredient,
        comment: showComment,
        rating: avgRating,
    });
})

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




module.exports = router;