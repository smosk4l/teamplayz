const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const multer = require('multer');

connectDB();
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use
app.use('/api/meetings', require('./routes/meetingsRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port:${port}`));
