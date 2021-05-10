const connection = require("../config/db_config")

const getRatingByRecipeId = recipeId => {
    return new Promise(((resolve, reject) => {
        connection.query(
            "SELECT ROUND(AVG(value_recipe),1) as avg_rating from rating " +
            "inner join recipes on rating.id_recipe = recipes.id_recipe " +
            "WHERE recipes.id_recipe = ?;",[recipeId], function (error, results, fields) {
                if (error) {
                    console.log(results);
                    return reject(error);
                }
                resolve(results);
            });
    }))
}

module.exports = {
    getRatingByRecipeId,
}
