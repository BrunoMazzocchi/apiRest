const config = require('config');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const express = require('express');
const xFrameOptions = require('x-frame-options');
var cors = require('cors')

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB conectado!")
})

const usersRouter = require('./routes/user');
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');




app.use(cors())


app.use("/user", usersRouter);
app.use("/post", postRouter);
app.use('/login', authRouter);
app.use('/uploads', express.static('./uploads'))

app.listen(port, () => {
    console.log(`El servidor esta en el puerto: ${port}`);
})

