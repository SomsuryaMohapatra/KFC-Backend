const mongoose = require("mongoose");

const mongoDbUsername = "som_KFC";
const mongoDbPassword = "Date1907";
const mongoDbDatabase = "KFC-MERN";

const mongoURI = `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}@cluster0.fyyunbq.mongodb.net/${mongoDbDatabase}?retryWrites=true&w=majority`;

//connecting to mongodb atlas
const connectToMongoDB = () => {
  mongoose
    .connect(mongoURI)
    .then(async () => {
      console.log("Connected To MongoDB Cloud");
      const food_data = await mongoose.connection.db.collection("food_items");
      food_data
        .find()
        .toArray()
        .then(async (data) => {
          const food_category = await mongoose.connection.db.collection(
            "food_categories"
          );
          food_category
            .find()
            .toArray()
            .then((categoryData) => {
              global.foodCategory = categoryData;
              global.foodItems = data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log("Error", error.message);
    });
};
module.exports = connectToMongoDB;
