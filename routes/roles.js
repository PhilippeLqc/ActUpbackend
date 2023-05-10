var express = require("express");
var router = express.Router();

require("../models/connection");
const Role = require("../models/role");
const { checkBody } = require("../modules/checkBody");

router.post("/", (req, res) => {
  //check if the role already exists
  if (!checkBody(req.body, ["role"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  Role.findOne({ role: req.body.role }).then((data) => {
    const { role } = req.body;
    if (data === null) {
      const newRole = new Role({
        role: role,
      });

      newRole.save().then((newDoc) => {
        res.json({ result: true, role: newDoc.role });
      });
    } else {
      // Role already exists in database
      res.json({ result: false, error: "Role already exists" });
    }
  });
});

module.exports = Role;
