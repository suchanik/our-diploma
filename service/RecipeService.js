const connection = require("../config/db_config")

//wyszukiwanie po składnikach
const getIngredientsByRecipeId = recipeId => {
    return new Promise(((resolve, reject) => {
        connection.query(
            "select ingredients.ID_ingredient as id, ing_name, id_unit\n" +
            "from ingredients\n" +
            "inner join `recipe_ingredient` on ingredients.ID_ingredient = `recipe_ingredient`.ID_ingredient\n" +
            "where `recipe_ingredient`.ID_recipe = ?;",[recipeId], function (error, results, fields) {
                if (error) {
                    console.log(results);
                    return reject(error);
                }

                resolve(results);
            });
    }))
}

const getRecipesByRecipe_ingredient = ingredientIDs => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT distinct recipes.id_recipe as "id", recipes.name, recipes.opis FROM recipes, `recipe_ingredient` ' +
            'WHERE `recipe_ingredient`.ID_recipe = recipes.id_recipe and ID_ingredient in (?);',[ingredientIDs], function (error, results, fields) {
                // console.log(results);

                if (error) {
                    console.log(results);
                    return reject(error);
                }

                resolve(results);
            });
    })
}

//Wyszukiwanie po kategoriach

const getCategoriesByRecipeId = categoryId => {
    return new Promise(((resolve, reject) => {
        connection.query(
            "select category.id_category as id, name from category" +
            "left join recipe_category rt on category.id_category = rt.id_category" +
            "where rt.id_recipe = ?;",[categoryId], function (error, results, fields) {
                if (error) {
                    console.log(results);
                    return reject(error);
                }

                resolve(results);
            });
    }))
}

const getRecipesByRecipe_category = rec_cat => {
    return new Promise((resolve, reject) => {
        connection.query(
            'select distinct id_recipe as id, name from recipes natural join recipe_category where id_category in (?);',[rec_cat], function (error, results, fields) {

                if (error) {
                    console.log(results);
                    return reject(error);
                }

                resolve(results);
            });
    })
}



module.exports = {
    getRecipeByIngredientsID: getIngredientsByRecipeId,
    getRecipesByRecipe_ingredient,
    getRecipesByCategory: getCategoriesByRecipeId,
    getRecipesByRecipe_category,
}