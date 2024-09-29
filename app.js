require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const bodyParser = require('body-parser');

require('./config/passport'); 

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI, {

})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

//booking
app.use(bodyParser.json());

app.use(express.static('public'));


// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

// Static Files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Override HTTP methods to support forms
app.use(methodOverride('_method'));

// Routes
app.use('/', authRoutes);

app.get("/club", (req, res) => {
  res.render("club");
});
app.get("/services",(req,res)=>{
  res.render("services")
})
app.get("/contact",(req,res)=>{
  res.render("contact")
})
// 404 Page
app.use((req, res, next) => {
  res.status(404).render('partials/404');
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
