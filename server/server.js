const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var subdomain = require("express-subdomain");
const routes = require("./routes")
const app = express();
app.use(cors());
const path = require("path");
require("dotenv").config(); 
app.use(express.json());

const regestryUsers = [];
const loginUserDatabase = [];

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

//przekazywania danych na stronę sewera
app.get("/", (req, res) => {
    res.send(req.body);
  });
  // pobieranie danych z rejestracji i zapisywanie ich do tablicy regystryUsers
  app.post("/api/regestry", (req, res) => {
    regestryUsers.push(req.body);
    res.status(200).end;
  });
  
  // pobieranie danych z inputów dream teamu i dodawanie ich do pustej tablict "loginUserDatabase"
  app.post("/api/loginUserDatabase", (req, res) => {
    loginUserDatabase.push(req.body);
    res.status(200).end;
  });
  // wysłanie danych z rejestracji zapisanych na serwerze z powrotem juz na strone logowania do sprawdzenia poprawnosci logowania usera
  app.get("/api/regestry", (req, res, next) => {
    res.json({ regestryUsers });
  });
  //wysłanie danych do bazy danych zalogowanego uzytkownika
  app.get("/api/loginUserDatabase", (req, res) => {
    res.json({ loginUserDatabase });
  });
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// const RegSchema = new mongoose.Schema({ any: [mongoose.Schema.Types.Mixed] });
const UserSchema = new mongoose.Schema({ loginUserDatabase: [{}] });
const dreamTeamSchema = new mongoose.Schema({
    regestry:{
     type: Map,
    of: String
  
      },
      loginUserDatabase:{
        type: [UserSchema],
        default: undefined
      },
    // id: String,
    username: {
        type: Map,
       of: String
     },
    password: String,
    // playerName: String,
    // playerClub: String,
    // position: String,
    // highScore: Number,
});
const DreamTeam = mongoose.model('DreamTeam', dreamTeamSchema);
const dream = new DreamTeam({
    regestry:regestryUsers.map(el=> el),
    loginUserDatabase:loginUserDatabase,
    // id: regestryUsers.map(el=>el.id),
    username:regestryUsers.map(el=>el.username),
    password:"dupa",
    // playerName:loginUserDatabase.map(el=>el.playerName),
    // playerClub:loginUserDatabase.map(el=>el.playerClub),
    // position:loginUserDatabase.map(el=>el.position),
    // highScore:loginUserDatabase.map(el=>el.highScore)

});
dream.save().then(() => console.log("dodano dane"));
app.get('/', (req, res) => {
    DreamTeam.find({}, (found, err) => {
        if (!err) {
            res.send(found);
        }
        console.log(err);
        res.send("Some error occured!")
    })
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

//tworzenie zmiennej która przekaże dane do heroku, dodatkowo należy dopisać w package.jeson w scripts : "web": "index.js"
const herokuPort = process.env.PORT || 5000;
//nasłuchiwanie app na jakim porcie na działać
app.listen(herokuPort, () => {
  console.log(`Działam na porcie ${herokuPort}`);
});
