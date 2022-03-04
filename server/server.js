const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors())
const path = require('path');

app.use(express.json());
const regestryUsers = [];
const loginUserDatabase = [];
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

//przekazywania danych na stronę sewera
app.get("/", (req, res) => {
  res.send(req.body);
});
// pobieranie danych z rejestracji i zapisywanie ich do tablicy regystryUsers
app.post(
  "/api/regestry",(req, res) => {
  regestryUsers.push(req.body);
    res.status(200).end;
  })

// pobieranie danych z inputów dream teamu i dodawanie ich do pustej tablict "loginUserDatabase"
app.post(
  "/api/loginUserDatabase",(req, res) => {
  loginUserDatabase.push(req.body);
    res.status(200).end;
  })
// wysłanie danych z rejestracji zapisanych na serwerze z powrotem juz na strone logowania do sprawdzenia poprawnosci logowania usera
app.get("/api/regestry",(req, res, next) => {
  res.json({ regestryUsers });
})
//wysłanie danych do bazy danych zalogowanego uzytkownika
app.get("/api/loginUserDatabase",(req, res) => {
res.json({ loginUserDatabase });
})

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });
//tworzenie zmiennej która przekaże dane do heroku, dodatkowo należy dopisać w package.jeson w scripts : "web": "index.js"
const herokuPort = process.env.PORT || 5000;
//nasłuchiwanie app na jakim porcie na działać
app.listen(herokuPort, () => {
  console.log(`Działam na porcie ${herokuPort}`);
});
