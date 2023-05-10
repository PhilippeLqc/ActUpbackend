var express = require("express");
var router = express.Router();

require("../models/connection");
const Theatre = require("../models/theatre");
const { checkBody } = require("../modules/checkBody");

router.post("/", (req, res) => {
    if (!checkBody(req.body, ["title", "author", "year", "genre"])) {
        res.json({ result: false, error: "Missing or empty fields" });
        return;
    }

    //check if the piece already exists
    pieces.findOne({ title: req.body.title }).then((data) => {
        const { title, author, year, genre } = req.body;
        if (data === null) {
            const newPiece = new Theatre({
                title: title,
                author: author,
                year: year,
                genre: genre,
            });

            newPiece.save().then((newDoc) => {
                res.json({ result: true, title: newDoc.title });
            }
            );
        } else {
            // Piece already exists in database
            res.json({ result: false, error: "Piece already exists" });
        }
    });
});

module.exports = Theatre;