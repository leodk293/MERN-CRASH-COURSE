const express = require('express');
const dotenv = require('dotenv');

const { connectDB } = require('./config/db.js');

const productRouter = require('./routes/product.route.js');

dotenv.config({ path: '../.env' });

if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in the .env file!');
    process.exit(1);
} else {
    console.log('MONGODB_URI loaded:', process.env.MONGODB_URI);
}

const app = express();
app.use(express.json()); //allow us to accept JSON data in the request body

app.use('/api/products', productRouter);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    connectDB();
});
