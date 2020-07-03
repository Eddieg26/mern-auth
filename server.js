const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./routes/index.route');
const cors = require('cors');

require('dotenv').config();

const app = express();

mongoose
    .connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .then((client) => {
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(bodyParser.json());

        app.use(cors());

        app.use(passport.initialize());

        require('./config/passport')(passport);

        app.use('/api/', routes);

        app.listen(process.env.PORT || 8008, () => {
            console.log(`listening on port ${process.env.PORT}`);
        });
    })
    .catch(console.error);
