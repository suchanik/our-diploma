var express = require('express');
var router = express.Router();

router.get('/category',  (req, res) => {
    res.render('categoryPage');
});

router.get('/top',  (req, res) => {
    res.render('topRecipesPage');
});
router.get('/randomRecipe',  (req, res) => {
    res.render('randomRecipe');
});
router.get('/favourite',  (req, res) => {
    res.render('favouriteRecipes');
});

module.exports = router