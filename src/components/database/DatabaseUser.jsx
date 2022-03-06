import { Component } from "react";
import React from "react";
import Login from "../logowanie/Login";
import { validInputs } from "../logowanie/testreg";
import uniqid from "uniqid";
import "./dbstyle.css";

export class DatabaseUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ustawienie stanu inputów i tablicy w której będą zapisywane dane z inputów
      userForm: [],
      userInputs: {
        playerName: "",
        playerClub: "",
        position: "",
        highScore: "",
      },
      loginData: [this.props.getDataFromLogin], //przypisywanie danych logowania z app.jsx
      saveData: [],
    };
  }
  // zapisywanie danych wprowadzonych w inputach
  hanldeInputsValue = (e) => {
    this.setState((prev) => {
      return {
        userInputs: Object.assign(prev.userInputs, {
          [e.target.name]: e.target.value,
        }),
      };
    });
  };
  // przekazywanie daych z inputów do tablicy oraz zapisywanie danych z inputów oraz danych logowania
  //   i przekazywanie ich do fukcji wysyłającej na serwer
  handleSubmit = (e) => {
    this.setState(
      (prev) => ({
        userForm: [...prev.userForm, prev.userInputs],
        userInputs: {
          playerName: "",
          playerClub: "",
          position: "",
          highScore: "",
        },
      }),
      () => {
        this.state.userForm.map((el) => {
          //mapowanie po tablicy userform i przekazywanie agumentów do fukcji sendtobackend
          this.sendToBackEnd(
            el.playerName,
            el.playerClub,
            el.position,
            el.highScore
          );
          return {
            playerName: el.playerName,
            playerClub: el.playerClub,
            position: el.position,
            highScore: el.highScore,
          };
        });
      }
    );
    //  czyszczenie pól inputów
    let inputs = document.querySelectorAll("input");
    inputs.forEach((el) => {
      return (el.value = "");
    });
    e.preventDefault();
    this.state.userForm = [];
  };

  //   przesyłanie danych na beckend
  sendToBackEnd = (playerName, playerClub, position, highScore) => {
    fetch("https://react-node-app-db.herokuapp.com/api/loginUserDatabase", {
      method: "POST",
      body: JSON.stringify({
        id: this.state.loginData.map((el) => el.id).join(""), //przekazywanie id z panelu logowania bo bazy danych
        playerName: playerName,
        playerClub: playerClub,
        position: position,
        highScore: highScore,
      }),
      headers: { "Content-Type": "Application/Json" },
    });
  };

  // odbieranie danych z express
  getData = () => {
    fetch("https://react-node-app-db.herokuapp.com/api/loginUserDatabase")
      .then((res) => res.json())
      // .then((data) => data.loginUserDatabase)
      .then((data) => {
        this.setState({
          saveData: data.filter((el) => {
            return el.id == this.state.loginData.map((el) => el.id); //fitrowanie wyświtlania danych wg klucza id
          }),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // update bazy danych wyświtlanej dla urzytkownika
  componentDidUpdate(prevProps, prevstate) {
    if (prevstate.userForm !== this.state.userForm) {
      setTimeout(() => {
        this.getData();
      }, 300);
    }
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    const { userInputs } = this.state;
    //    odblokowanie buttona "dodaj" jeżeli żaden input nie jest pusty
    let checkEmtyInputs = validInputs(
      userInputs.playerName &&
        userInputs.playerClub &&
        userInputs.position &&
        userInputs.highScore
    );
    return (
      <div className="dbMainContener">
        <div className="dbBg"></div>
        <div className="dbHeader">
          DODAJ ZAWODNIKA SWOJEGO DREAM TEAM`U
          <p style={{ fontSize: "20px" }}>WSZYTKIE POLA SĄ OBOWIĄZKOWE</p>
        </div>
        <div className="dbContent">
          <div className="dbForm">
            <div className="dbFormGroup">
              <label htmlFor="playerName">imię i nazwisko zawodnika</label>
              <input
                type="text"
                name="playerName"
                value={this.state.playerName}
                onChange={(e) => this.hanldeInputsValue(e)}
                placeholder="imię i nazwisko..."
              />
            </div>
            <div className="dbFormGroup">
              <label htmlFor="playerClub">obecny/ostatni klub</label>
              <input
                type="text"
                name="playerClub"
                value={this.state.playerClub}
                onChange={this.hanldeInputsValue}
                placeholder="klub..."
              />
            </div>
            <div className="dbFormGroup">
              <label htmlFor="position">pozycja na której gra</label>
              <input
                type="text"
                name="position"
                value={this.state.position}
                onChange={this.hanldeInputsValue}
                placeholder="pozycja..."
              />
            </div>
            <div className="dbFormGroup">
              <label htmlFor="highScore">najwyższa ilośc punktów</label>
              <input
                type="number"
                name="highScore"
                value={this.state.highScore}
                onChange={this.hanldeInputsValue}
                placeholder="punkty..."
              />
            </div>
          </div>
        </div>
        <div className="dbFooter">
          <button
            disabled={checkEmtyInputs}
            type="button"
            onClick={this.handleSubmit}
            className="addPlayerBtn dbBtn"
          >
            dodaj
          </button>
          <button
            onClick={() => this.props.onExitAdminDB()}
            className="exitPlayerBtn dbBtn"
          >
            zamknij
          </button>
        </div>
        <div className="viewMainDb">
          <div className="dbHeaderView">TWÓJ OSOBISTY DREAM TEAM</div>
          <table className="tableContener">
            <tbody>
              <tr className="databaseTr">
                <th className="databaseTh">IMIĘ I NAZWISKO GRACZA</th>
                <th className="databaseTh">OBECNY/OSTATNI KLUB</th>
                <th className="databaseTh">POZYCJA NA KTÓREJ GRA</th>
                <th className="databaseTh">NAJWYŻSZA ILOŚC PUNKTÓW</th>
              </tr>
              {this.state.saveData.map((el) => (
                <tr key={uniqid()} className="databaseTr">
                  <td key={el.playerName} className="databaseTd">
                    {el.playerName}
                  </td>
                  <td key={el.playerClub} className="databaseTd">
                    {el.playerClub}
                  </td>
                  <td key={el.position} className="databaseTd">
                    {el.position}
                  </td>
                  <td key={el.highScore} className="databaseTd">
                    {el.highScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
