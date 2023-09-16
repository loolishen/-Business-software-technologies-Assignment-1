const mongoose = require("mongoose");
const express = require("express");

const restaurantRouter = require("./routes/restaurant-routes");
const mealRouter = require("./routes/meal-routes");

const app = express();
const port = 8080;

app.use(express.json());

const url = "mongodb://localhost:27017/restaurant-app";

async function connect(url) {
    await mongoose.connect(url);
    return "Connected Successfully";
}

app.use("/", (req, res) => {
    res.send("Welcome to Fast Food Restaurants!");
});
app.post("/")
app.use("/meal", mealRouter);
app.use("/rest", restaurantRouter);

connect(url)
    .then(console.log)
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
