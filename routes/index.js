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

  //
  // const ingredients = getAllIngredients();
  // res.render('main', {
  //   title: 'Epapu',
  //   ingredients: ingredients
  // });
});
router.all("/", ((req, res) => {
    getAllIngredients();
}))

router.get('/ingredients',  (req, res) => {
  res.render('ingredientsPage');
});



module.exports = router;
