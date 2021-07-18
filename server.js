const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();  


//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true,useUnifiedTopology: true })
  .then(()=> console.log('DB connected'))
  .catch((err)=> console.log(err));


//Passport middleware
app.use(passport.initialize());
//passport config file
require('./config/passport')(passport);


//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.port || 5000;

//console.log(process.env.port);

app.listen(port, () => console.log(`Server running at port ${port}`));