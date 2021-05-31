const connection = require("../config/db_config")
const bcrypt = require('bcrypt')

const updateUserPassword = (id, password) => {
    return new Promise((resolve, reject) =>{

        const salt = bcrypt.genSaltSync()
        const hashPswrd = bcrypt.hashSync(password, salt)
        console.log(salt)
        console.log(hashPswrd)
        connection.query(
            'UPDATE users SET password = ? ' +
            'WHERE id_user = ?;', [hashPswrd, id], function (err,res,fields){
                if(err){
                    console.log(res);
                    return reject(error);
                }
                resolve(true);
            }
        );
    })
}


module.exports = {
    updateUserPassword,
}