const connection = require("../config/db_config")
const res = require("express");

getCommentsByRecipeId = id =>{
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT login,comments.description from comments ' +
            'inner join recipes r on r.id_recipe = comments.id_recipe ' +
            'inner join users u on comments.id_user = u.id_user ' +
            'WHERE r.id_recipe = (?);',[id], function (error, results, fields) {
                if (error) {
                    console.log(results);
                    return reject(error);
                }
                resolve(results);
            });
    })
}

addComment = description =>{
    connection.query("select name from recipes where id_user = ?", [req.session.userId], ((err, result, fields) =>  {
        const data = result.shift();
        res.render('randomRecipe', {
            name: data.name,
        });
    }))
    try {
        const { id_user, id_recipe, description } = req.body

        connection.query('INSERT INTO comments (id_user, id_recipe, description) VALUES (?, ?, ?)', [id_user, id_recipe, description], (error, results) => {
            if(!description){
                return res.status(400).render('randomRecipe', {
                    message: 'Aby dodać komentarz trzeba wypełnić pole.'
                });
            }if(!id_user){
                return res.status(400).render('randomRecipe', {
                    message: 'Sekcja komentarzy dostępna tylko dla zalogowanych użytkowników.'
                });
            }else{
                res.redirect("/recipes/:id")
            }
        })
    }catch {
        res.status(500).send()
    }
}

// addCommenta = (id, description) =>{
//     return new Promise((resolve, reject) => {
//         connection.query('INSERT INTO comments (id_recipe, description) VALUES (?, ?, ?)', [id, description], (error, results) => {
//
//                 if (error) {
//                     console.log(results);
//                     return reject(error);
//                 }
//
//                 resolve(results);
//             });
//     })
// }

// router.post('/:id', (req,res) => {
//     connection.query("select name from recipes where id_user = ?", [req.session.userId], ((err, result, fields) =>  {
//         const data = result.shift();
//         res.render('randomRecipe', {
//             name: data.name,
//         });
//     }))
//
// })


module.exports = {
    getCommentsByRecipeId,
    addComment,
}