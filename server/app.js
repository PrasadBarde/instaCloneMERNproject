const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT =process.env.PORT || 8000;
const { MONGOURI } = require("./keys");
mongoose.set("strictQuery", true);

//connecting with database
mongoose
  .connect(MONGOURI)
  .then(() => app.listen(PORT, console.log("8000")))
  .then(() => {
    console.log("server is running on localhost 8000");
  })
  .catch((err) => console.log(err));

//after connecting to DB
const User = require("./models/user");
const Post = require("./models/post");
  app.use(express.json());

  app.use(require("./routes/auth"));
  app.use(require("./routes/post"));
