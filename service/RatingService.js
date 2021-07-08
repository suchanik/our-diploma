const connection = require("../config/db_config")

const getAvgRatingByRecipeId = recipeId => {
    return new Promise(((resolve, reject) => {
        connection.query(
                "SELECT ROUND(AVG(rate),1) as avgRating from rating " +
            "inner join recipes on rating.id_recipe = recipes.id_recipe " +
            "WHERE recipes.id_recipe = ?;",[recipeId], function (error, results, fields) {
                if (error || results.length == 0) {
                    console.log(results);
                    return reject(error);
                }
                resolve(results.shift().avgRating);
            });
    }))
}

const addRate = (userId, recipeId, rate) => {
    return checkIfExists(userId, recipeId)
        .then(ifExists => {
            if (ifExists) {
                return new Promise((resolve, reject) => {
                    connection.query('update rating set rate = ? where id_recipe = ? and id_user = ?',
                        [rate, recipeId, userId], (err, res) => {
                            if (err) {
                                console.log(res);
                                return reject(error)
                            }
                            resolve(true);
                        })
                })
            } else {
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
        });

}

const checkIfExists = (userId, recipeId) => {
    return new Promise((resolve, reject) => {
        connection.query("select count(1) as ifExist from rating where id_recipe = ? and id_user = ?;", [recipeId, userId], (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result.shift().ifExist)
        })
    })
}

const getRateByUserIdAndRecipeId = (userId, recipeId) => {
    return new Promise(resolve => {
        connection.query("select rate from rating where id_recipe = ? and id_user = ?;", [recipeId, userId], (err, result) => {
            if (err) {
                console.log(err)
            }

            resolve(result.length ? result.shift().rate : 0)
        })
    })
}

module.exports = {
    getAvgRatingByRecipeId,
    getRateByUserIdAndRecipeId,
    addRate,
}
