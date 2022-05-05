const express = require('express');
const router = express.Router();
const authorsControllers = require('../controllers/authors');

router.route('/')
    .get(authorsControllers.getAuthorsIndex)
    .post(authorsControllers.createNewAuthor);


router.route('/new')
    .get(authorsControllers.getAuthorsNewForm);


module.exports = router;