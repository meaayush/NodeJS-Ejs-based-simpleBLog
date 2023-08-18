const express = require('express');
const morgan = require('morgan');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
dotenv.config();
const dbURI = process.env.MONGO_URL;
console.timeLog(dbURI)
mongoose.set("strictQuery", false);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3001), () => {
        console.log("Express server listening on port 3001");
    })
    .catch((err) => console.log('<---------------mongoose connect error-------->',err));

// register view engine
app.set('view engine', 'ejs');


// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));



app.get('/', (req, res) => {
    res.redirect('/blogs');
    // res.render('index', {title: 'Home', blogs }); //blogs: blogs or only blogs is same
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// blog routes
app.use('/blogs',blogRoutes); // app.use(blogRoutes);

// 404 pages
app.use((req, res) => {
    res.status(404).render('404', {title: 'Error: 404 :('});
});
