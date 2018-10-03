const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');
//Connect Mongo DB
const mongoose = require('mongoose');
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
};

mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(morgan('combined'));

app.use(bodyParser.json({type:'*/*'}));
app.use(express.static('dist'));
app.use('/api', require('./routes/api'));
app.use('/api/users', require('./routes/user'));
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});
const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log(`Express server is running on port: ${port}`);
