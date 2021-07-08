const connection = require("../config/db_config")
const bcrypt = require('bcrypt')

const updateUserPassword = (id, password) => {
    return new Promise((resolve, reject) => {

        const salt = bcrypt.genSaltSync()
        const hashPswrd = bcrypt.hashSync(password, salt)
        console.log(salt)
        console.log(hashPswrd)
        connection.query(
            'UPDATE users SET password = ? ' +
            'WHERE id_user = ?;', [hashPswrd, id], function (err, res, fields) {
                if (err) {
                    console.log(res);
                    return reject(error);
                }
                resolve(true);
            }
        );
    })
}

// const addUser = (name, email, password, type) => {
//
//     const salt = bcrypt.genSaltSync()
//     const hashPswrd = bcrypt.hashSync(password, salt)
//     console.log(salt)
//     console.log(hashPswrd)
//
//     return new Promise((resolve, reject) => {
//         connection.query('INSERT INTO users (login, email, password, type) VALUES (?, ?, ?, 0)', [name, email, hashPswrd, type], (error, results) => {
//             resolve(true);
//         })
//     })
// }

module.exports = {
    updateUserPassword,
    // addUser,
}