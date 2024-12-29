"use strict";

var express = require('express');

var dotenv = require('dotenv');

var _require = require('./config/db.js'),
    connectDB = _require.connectDB;

var productRouter = require('./routes/product.route.js');

dotenv.config({
  path: '../.env'
});

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the .env file!');
  process.exit(1);
} else {
  console.log('MONGODB_URI loaded:', process.env.MONGODB_URI);
}

var app = express();
app.use(express.json()); //allow us to accept JSON data in the request body

app.use('/api/products', productRouter);
var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
  console.log("Server started at http://localhost:".concat(PORT));
  connectDB();
});