const express = require('express');
const router = express.Router();
const connection = require("../config/db_config")

/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM ingredients ORDER BY ing_name;',function (error, results, fields) {
    connection.query('SELECT name, id_recipe from recipes ORDER BY id_recipe DESC LIMIT 3;', function (error, result, fields)
    {
      if (error) {
        console.log("error");
      } else {
        console.log(results)
        res.render("main", {
          title: "Epapu",
          ingredients: results,
          lastRecipes: result,
        })
      }
    })
  });
});

router.get('/ingredients', function(req, res, next) {

  connection.query('SELECT * FROM ingredients ORDER BY ing_name;',function (error, results, fields) {
    if(error){
      console.log("error");
    }else{
      console.log(results)
      res.render("ingredientsPage", {
        title: "Epapu",
        ingredients: results
      })
    }
  });
});


router.all("ingredients", ((req, res) => {
    getAllIngredients();
}))

router.get('/ingredients',  (req, res) => {
  res.render('ingredientsPage');
});


router.get('/category', function(req, res, next) {

  connection.query('SELECT * FROM categories ORDER BY name;',function (error, results, fields) {
    if(error){
      console.log("error");
    }else{
      console.log(results)
      res.render("categoryPage", {
        title: "Epapu",
        category: results
      })
    }
  });
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
