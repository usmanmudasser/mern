const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();  

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongodb

mongoose
  .connect(db, { useNewUrlParser: true,useUnifiedTopology: true })
  .then(()=> console.log('DB connected'))
  .catch((err)=> console.log(err));


app.get('/', (request,response) => response.send('Hello!') );

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.port || 5000;

//console.log(process.env.port);

app.listen(port, () => console.log(`Server running at port ${port}`));