const mongoose = require("mongoose");

const connection = () => {
  const user = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const url = `mongodb+srv://${user}:${password}@cluster0.nh2scbi.mongodb.net/?retryWrites=true&w=majority`;
  const localUrl = "mongodb://localhost:27017/todo-db";

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB.."))
    .catch((error) => console.error("Could not connect to MongoDB", error));
};

module.exports = connection;
