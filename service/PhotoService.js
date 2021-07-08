// const connection = require("../config/db_config")
//
// const addPhoto =(name, img, id) => {
//     return new Promise((resolve, reject) => {
//         connection.query('INSERT INTO img (name, img, id_recipe) VALUES (?, ?, ?)',
//             [name, img, id], (err, res) => {
//                 if (err) {
//                     console.log(res);
//                     return reject(error)
//                 }
//                 resolve(true);
//             })
//     })
// }
//
// module.exports = {
//     addPhoto,
// }