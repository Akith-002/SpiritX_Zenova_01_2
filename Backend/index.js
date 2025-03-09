require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes configuration
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Connected to Database');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    });
})
.catch((err) => {
    console.log('Unable to connect : ',err);
});