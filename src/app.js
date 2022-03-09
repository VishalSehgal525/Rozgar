const path = require("path");
const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { env } = require("process");

const envPath = path.join(__dirname, "./config.env");
dotenv.config({ path: envPath });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please enter UserName"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
});

const User = mongoose.model("User", userSchema);

const testUser = new User({
  username: "Vishal Sehgal",
  email: "sehgalvishal16@gmail.com",
  password: "vishal@123",
});

testUser
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR 💥:" + err);
  });

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected To DataBase"));

const app = express();
const port = process.env.PORT || 3000;

//Paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setting handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Rozgaar",
    name: "The B Team",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Vishal Sehgal",
    errorMessage: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
