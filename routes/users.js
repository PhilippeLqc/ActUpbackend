var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/user");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

//create user
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["lastname", "firstname", "email", "password"])) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // check if the user not already registered in database
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        return res.status(400).json({ error: "User already exists" });
      } else {
        // hash the password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          } else {
            // create the user
            const newUser = new User({
              lastname: req.body.lastname,
              firstname: req.body.firstname,
              email: req.body.email,
              password: hash,
              token: uid2(32),
            });
            // save the user
            newUser
              .save()
              .then((data) => {
                return res.status(200).json({
                  _id: data._id,
                  lastname: data.lastname,
                  firstname: data.firstname,
                  email: data.email,
                  token: data.token,
                });
              })
              .catch((err) => {
                return res.status(500).json({ error: err.message });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

// login user
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ email: req.body.email }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

module.exports = router;
