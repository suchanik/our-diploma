const express = require('express');
const router = express.Router();

const connection = require('../config/db_config')
const bcrypt = require('bcrypt');



router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/log',function (req, res, next) {
  res.render('log');
});
router.get('/reg', function (req, res, next) {
  res.render('register');
});
router.get('/profile', function (req, res, next) {

  connection.query("select email, login from users where id_user = ?", [req.session.userId], ((err, result, fields) =>  {

    const data = result.shift();

    res.render('userProfil', {
      login: data.login,
      email: data.email,
    });
  }))



});

router.get("/logOut", ((req, res) => {
  req.session.loggedin = false;
  req.session.name = null;
  req.session.userId = null
  res.redirect("/");
}))

router.post("/auth", function (req, res) {
  const {name, password} = req.body

  connection.query('SELECT * FROM users WHERE login = ?', [name], ((err, results, fields) => {
    if (results.length) {
      const storedUser = results.shift(); //pobiera pierwszy element i go usuwa z tablicy

      const isPasswordMatched = bcrypt.compareSync(password, storedUser.password);

      if (isPasswordMatched) {
        req.session.loggedin = true;
        req.session.name = name;
        req.session.userId = storedUser.id_user;
            // res.send("Zalogowano się")
        res.redirect('/')
      } else {
        res.send('Nieprawidłowe dane. Spróbuj ponownie.');
      }
    } else {
      res.send('Nieprawidłowe dane. Spróbuj ponownie.');
    }
  }));
});

router.post("/addUser",  (req, res) => {
  try {
    const { name, email, password, type } = req.body

    const salt = bcrypt.genSaltSync()
    const hashPswrd = bcrypt.hashSync(password, salt)
    console.log(salt)
    console.log(hashPswrd)

  connection.query('INSERT INTO users (login, email, password, type) VALUES (?, ?, ?, 0)', [name, email, hashPswrd, type], (error, results) => {
    if (error) {
      res.send("Nie udało sie zrejestrowac uzytkownika: " + error.message)
    } else {
      res.redirect("/")
      // res.redirect("/users/log")
    }
  })
}catch {
    res.status(500).send()
  }
})

module.exports = router;
