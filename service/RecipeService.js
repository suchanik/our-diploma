const connection = require("../config/db_config")

const getAllByRecipeId = recipeId => {
    return new Promise(((resolve, reject) => {
        connection.query(
            "select ingredients.ID_ingredient as id, ing_name, id_unit\n" +
            "from ingredients\n" +
            "inner join `recipe-ingredient` on ingredients.ID_ingredient = `recipe-ingredient`.ID_ingredient\n" +
            "where `recipe-ingredient`.ID_recipe = ?;",[recipeId], function (error, results, fields) {
                if (error) {
                    console.log(results);
                    return reject(error);
                }

                resolve(results);
            });
    }))
}

const getAllByIngredientsIDs = ingredientIDs => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT distinct recipes.id_recipe as "id", recipes.name, recipes.opis FROM recipes, `recipe-ingredient` ' +
            'WHERE `recipe-ingredient`.ID_recipe = recipes.id_recipe and ID_ingredient in (?);',[ingredientIDs], function (error, results, fields) {
                // console.log(results);

                if (error) {
                    console.log(results);
                    return reject(error);
                }

                resolve(results);
            });
    })
}



module.exports = {
    getAllByRecipeId,
    getAllByIngredientsIDs
}