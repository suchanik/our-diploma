const connection = require("../config/db_config")


const getAllIngredients = () => {
    return new Promise(((resolve, reject) => {
        connection.query('SELECT distinct * from ingredients', ((err, result, fields) => {
            if (err) {
                console.log(result);
                return reject(error);
            }

            resolve(result);
        }))
    }))
}

module.exports = {
    getAllIngredients,
}