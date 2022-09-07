require("dotenv").config();
const compression = require("compression");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const methodOverride = require("method-override");
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const connectDB = require("./src/config/db/");
const route = require("./src/routes");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "src", "views", "layouts"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(compression());
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

var store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

route(app);

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.log(error);
    console.log("Failed to connect to the database, server is not running.");
  }
};

start();
