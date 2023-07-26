require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const mainRouter = require("./routes/index");

const port = process.env.PORT;
const db = process.env.DB;

// Middleware
app.use(cors());
app.use('/', mainRouter);


mongoose.connect(db).then(() => {
    console.log(`Database connected`);
    app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
  });
});

