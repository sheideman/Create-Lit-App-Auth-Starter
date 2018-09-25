const express = require("express");
const router = express.Router();
const auth = require('../middlewares/passport-strategies');

const books = [
    {'author':'G.R.R. Martin', 'title':'A Game of Thrones'},
    {'author':'J.K. Rowling', 'title':'Harry Potter'},
    {'author':'Roald Dahl', 'title':'Charlie and the Chocolate Factory'}
]

router.get('/books', auth.requireAuth, function (req, res) {
    return res.send(books);
});

module.exports = router;