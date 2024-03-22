require("dotenv").config();
const express = require("express");
const app = express();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const users = require("./Routes/users");
const tasks = require("./Routes/tasks");
const auth = require("./Routes/auth");
const connection = require("./database");
const cors = require("cors");

// Connecting to MongoDB
connection();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/api/auth", auth);

// Conncting to the port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}..`));
