const mongoose = require("mongoose");

const mongoDbUsername = "som_KFC";
const mongoDbPassword = "Date1907";
const mongoDbDatabase = "KFC-MERN";

const mongoURI = `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}@cluster0.fyyunbq.mongodb.net/${mongoDbDatabase}?retryWrites=true&w=majority`;

//connecting to mongodb atlas
const connectToMongoDB = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected To MongoDB Cloud");
    })
    .catch((error) => {
      console.log("Error", error.message);
    });
};
module.exports = connectToMongoDB;
