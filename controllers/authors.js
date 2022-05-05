const Author = require('../models/author');

module.exports.getAuthorsIndex = async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', { authors, searchOptions: req.query });
    } catch {
        res.redirect('/');
    }
};

module.exports.getAuthorsNewForm = (req, res) => {
    res.render('authors/new', { author: new Author() });
};

module.exports.createNewAuthor = async (req, res) => {
    const author = new Author({
        name: req.body.name,
    });
    try {
        const newAuthor = await author.save();
        // res.redirect(`authors/${newAuthor._id}`);
        res.redirect('/authors');
    }
    catch {
        let locals = { errorMessage: `Something went wrong!` }
        res.render('authors/new', {
            author: author,
            locals
        });
    }
};