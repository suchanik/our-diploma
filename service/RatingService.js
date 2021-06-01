const connection = require("../config/db_config")

const getRatingByRecipeId = recipeId => {
    return new Promise(((resolve, reject) => {
        connection.query(
            "SELECT ROUND(AVG(rate),1) as avg_rating from rating " +
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

const addRate = (userId, recipeId, rate) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO rating (id_user, id_recipe, rate) VALUES (?, ?, ?)',
            [userId, recipeId, rate], (err, res) => {
                if (err) {
                    console.log(res);
                    return reject(error)
                }
                resolve(true);
            })
    })
}

module.exports = {
    getRatingByRecipeId,
    addRate,
}
