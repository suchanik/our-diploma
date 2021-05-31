const connection = require("../config/db_config")
const res = require("express");

getCommentsByRecipeId = id => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT login,comments.description from comments ' +
            'inner join recipes r on r.id_recipe = comments.id_recipe ' +
            'inner join users u on comments.id_user = u.id_user ' +
            'WHERE r.id_recipe = (?);', [id], function (error, results, fields) {
                if (error) {
                    console.log(results);
                    return reject(error);
                }
                resolve(results);
            });
    })
}

const addComment = (userId, recipeId, description) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO comments (id_user, id_recipe, description) VALUES (?, ?, ?)',
            [userId, recipeId, description], (err, res) => {
            if (err) {
                console.log(res);
                return reject(error)
            }
            resolve(true);
        })
    })
}

module.exports = {
    getCommentsByRecipeId,
    addComment,
}