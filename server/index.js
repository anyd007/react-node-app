const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const favicon = require('serve-favicon');
const cors = require("cors");
const path = require("path");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    //łącznie z bazą danych mongoDB po zarejestrowaniu się na stronie i uzyciu klucza zawatego w pliku process.env.MONGODB_URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //po pozytytywnym logowaniu
    const app = express(); //twożymy app
    app.use(function (req, res, next) {
      //walczymy z cors
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );
      res.setHeader("Access-Control-Allow-Credentials", true);

      next(); // przechodzimy dalej
    });
    app.use(cors()); //dalsza walka z cors
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/api", routes); //app bedzie uzywać /api oraz odniesienie do pliku routers
    app.use(favicon(__dirname + '/build/favicon.ico'))
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/index.html'));
    });

    //tworzenie zmiennej która przekaże dane do heroku, dodatkowo należy dopisać w package.jeson w scripts : "web": "index.js"
    const herokuPort = process.env.PORT || 3001;
    //nasłuchiwanie app na jakim porcie na działać
    app.listen(herokuPort, () => {
      console.log(`Działam na porcie ${herokuPort}`);
    });
  });
