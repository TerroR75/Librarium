if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Routers import
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');

// Setting EJS view engine
app.set('view engine', 'ejs');

// Setting EJS views path
app.set('views', __dirname + '/views');

// Setting up layout folders
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

// Where are js files, stylesheets etc.
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));


// Database connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("MONGO - Database connected!");
    })
    .catch(err => {
        console.log("MONGO - Database ERROR!");
        console.log(err);
    })


// Use routers
app.use('/', indexRouter);
app.use('/authors', authorsRouter);

app.listen(process.env.PORT || 3000);