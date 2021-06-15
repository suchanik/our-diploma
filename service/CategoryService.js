const connection = require("../config/db_config")


const getAllCategory = () => {
    return new Promise(((resolve, reject) => {
        connection.query('SELECT * FROM categories ORDER BY name;', ((err, result, fields) => {
            if (err) {
                console.log(result);
                return reject(error);
            }

            resolve(result);
        }))
    }))
}

module.exports = {
    getAllCategory,
}