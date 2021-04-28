const express = require('express')
const router = express.Router()

const connection = require('../config/db_config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')



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
    if (!data) {
      res.render("/")
    }

    res.render('userProfil', {
      login: data.login,
      email: data.email,
    });
  }))
});

router.get("/logOut", ((req, res) => {
  res.status(200).clearCookie('connect.sid', {
    path: '/'
  });
  req.session.destroy((err) => {
    if(err) throw err;
    res.redirect("/");
  })
  // req.session.loggedin = false;
  // req.session.name = null;
  // req.session.userId = null /////

}))

router.post("/auth", function (req, res) {
  const {name, password} = req.body

  connection.query('SELECT * FROM users WHERE login = ?', [name], ((err, results, fields) => {
    if (results.length) {
      const storedUser = results.shift(); //pobiera pierwszy element i go usuwa z tablicy
      const isPasswordMatched = bcrypt.compareSync(password, storedUser.password);
      if( !name || !password){
        return res.status(400).render('log', {
          message: 'Proszę wypełnić oba pola'
        })
      }
      if (isPasswordMatched) {
        req.session.loggedin = true;
        req.session.name = name;
        req.session.userId = storedUser.id_user;
        // const cookies = {
        //   expires: new Date(
        //       Date.now() + 90 * 24 * 60 * 60 * 1000
        //   ),
        //   httpOnly: true
        // }
        // res.cookie('cookie', token, cookies);
        res.status(200).redirect('/')
      } else {
        return res.status(400).render('log', {
          message: 'Błędne hasło. Spróbuj ponownie'
        })
      }
    } else {
      return res.status(400).render('log', {
        message: 'Proszę wypełnić oba pola'
      })
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
    if( !name || !email || !password){
      return res.status(400).render('register', {
        message: 'Proszę wypełnić wszystkie pola'
      })
    }
    if (error) {
      return res.render('register',{
        message: 'Już istnieje użytkownik o takim loginie lub mailu.'
      });
    } else {
      // res.redirect("/")
      res.redirect("/users/log")
    }
  })
}catch {
    res.status(500).send()
  }
})

module.exports = router;
