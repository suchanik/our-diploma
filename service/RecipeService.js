const connection = require("../config/db_config")

//wyszukiwanie składnikow po id przepisu
const getIngredientsByRecipeId = recipeId => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT ingredients.ID_ingredient as id, ing_name, id_unit\n" +
            "from ingredients\n" +
            "inner join `recipe_ingredient` on ingredients.ID_ingredient = `recipe_ingredient`.ID_ingredient\n" +
            "WHERE `recipe_ingredient`.ID_recipe = ?;",[recipeId], function (error, results, fields) {
                if (error) {
                    console.log(results);
                    return reject(error);
                }

                resolve(results);
            });
    })
}

const getRecipesByRecipe_ingredient = ingredientIDs => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT distinct recipes.id_recipe as "id", recipes.name, recipes.description FROM recipes, `recipe_ingredient` ' +
            'WHERE `recipe_ingredient`.ID_recipe = recipes.id_recipe and ID_ingredient in (?);',[ingredientIDs],
            function (error, results, fields) {

                if (error) {
                    console.log(results);
                    return reject(error);
                }

                resolve(results);
            });
    })
}

//Wyszukiwanie kategorii po id przepisu

const getCategoriesByRecipeId = recipeId => {
    return new Promise(((resolve, reject) => {
        connection.query(
            "SELECT categories.id_category as id, name from categories" +
            "left join recipe_category rt on categories.id_category = rt.id_category" +
            "WHERE rt.id_recipe = ?;",[recipeId], function (error, results, fields) {
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
            'SELECT distinct id_recipe as id, name from recipes natural join recipe_category WHERE id_category in (?);',[rec_cat], function (error, results, fields) {

                if (error) {
                    console.log(results);
                    return reject(error);
                }

                resolve(results);
            });
    })
}

const getRecipeById = idRecipe => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from recipes WHERE id_recipe = ?', [idRecipe], ((err, result, fields) => {
            if (err) {
                console.log(result);
                return reject(error);
            }

            resolve(result.shift());
        }))
    })
}

const getIngredients = id => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT distinct * from ingredients natural join recipe_ingredient WHERE id_recipe = ?',[id], ((err, result, fields) => {
            if (err) {
                console.log(result);
                return reject(error);
            }

            resolve(result);
        }))
    })
}

const getLast3Recipes = () =>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT name, id_recipe from recipes ORDER BY id_recipe DESC LIMIT 3;', ((err, result, fields) => {
            if (err) {
                console.log(result);
                return reject(err);
            }

            resolve(result);
        }))
    })
}

//dodawanie przepisu

const addNewRecipe = (title, ingredientsIds, categoryIDs, description, userId) => {
    return new Promise( (resolve, reject) => {
        connection.query("INSERT INTO recipes(name, description, id_user) " +
            "values(?, ?, ?)", [title, description, userId], (err, result) => {

            if (err) {
                reject(err);
            }
            resolve(result.insertId)
        })
    }).then( recipeId => {
        let values = ([...ingredientsIds] || []).map(ingredientId => ([recipeId, ingredientId]));

        return new Promise(((resolve, reject) => {
            connection.query("INSERT INTO recipe_ingredient (id_recipe, id_ingredient) values ?", [values], err => {
                if (err) {
                    reject(err);
                }
                resolve(recipeId)
            });
        }));
    }).then( recipeId => {
        let values = ([...categoryIDs] || []).map(categoryID => ([recipeId, categoryID]));
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO recipe_category (id_recipe, id_category) values ?", [values], err => {
                if (err) {
                    reject(err);
                }
                resolve(recipeId)
            })
        });
    })
}

const getRandomRecipeId = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id_recipe FROM recipes ORDER BY RAND() LIMIT 1;', ((err, result, fields) => {
            if (err || result.length === 0) {
                console.log(result);
                return reject(err);
            }

            resolve(result.shift().id_recipe);
        }))
    })
}
const getTopRecipes = () => {
    return new Promise(((resolve, reject) => {
        connection.query('SELECT ROUND(AVG(rate),1) as average, recipes.name, recipes.id_recipe from rating ' +
            'inner join recipes on recipes.id_recipe = rating.id_recipe ' +
            'group by name order by average desc;', (error, results, fields) => {

            if(error){
                console.log(error);
                reject(error);
            }

            resolve(results);
        });
    }))
}

const getRecipebyUserIDs = id => {
    return new Promise((resolve, reject) => {
        connection.query("select name from recipes where id_user = ?", [id], ((err, result, fields) =>  {
            resolve(result);
        }))
    })
}


module.exports = {
    getIngredientsByRecipeId,
    getRecipesByRecipe_ingredient,
    getCategoriesByRecipeId,
    getRecipesByRecipe_category,
    getRecipeById,
    getIngredients,
    getLast3Recipes,
    addNewRecipe,
    getRandomRecipeId,
    getTopRecipes,
    getRecipebyUserIDs,
}