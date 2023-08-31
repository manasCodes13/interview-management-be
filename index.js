require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const mainRouter = require("./routes/index");
const swaggerDocument = YAML.load('./swagger.yaml');


const port = process.env.PORT;
const db = process.env.DB;

// Middleware
app.use(cors());
app.use(express.json())
app.use('/', mainRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



mongoose.connect(db).then(() => {
    console.log(`Database connected`);
    app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
  });
});

