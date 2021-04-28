var express = require('express');
var router = express.Router();
const connection = require("../config/db_config")

/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM ingredients ORDER BY ing_name;',function (error, results, fields) {
    if(error){
      console.log("error");
    }else{
      console.log(results)
      res.render("main", {
        title: "Epapu",
        ingredients: results
      })
    }
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

router.all("/", ((req, res) => {
    getAllIngredients();
}))

router.all("ingredients", ((req, res) => {
    getAllIngredients();
}))

router.get('/ingredients',  (req, res) => {
  res.render('ingredientsPage');
});


router.get('/category', function(req, res, next) {

  connection.query('SELECT * FROM category ORDER BY name;',function (error, results, fields) {
    if(error){
      console.log("error");
    }else{
      console.log(results)
      res.render("categoryPage", {
        title: "Epapu",
        ingredients: results
      })
    }
  });
});

module.exports = router;
