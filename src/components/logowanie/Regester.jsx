import React from "react";
import { checkValidImputsReg } from "./testreg";
import uniqid from "uniqid";
import "./style.css";

const Regester = (props) => {

  // przesyłanie na serwer express
  const sendRegestryToBackEnd = (username, password, repassword) => {
    fetch('https://react-node-app-db.herokuapp.com/api/regestry', {
      method: "POST",
      body: JSON.stringify({
        id: uniqid(),
        username: username,
        password: password,
        repassword: repassword,
      }),
      headers: { "Content-type": "application/json" },
    })
    .catch((error) => {
      console.log(error)
    });
  };
  

  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repassword, setRepassword] = React.useState("");

  // validator poprawności pól rejestracyjnych
  const checkValid = () => {
    let nameInput = document.querySelector(".userName");
    let passwordInput = document.querySelector(".passWord");
    let repasswordInput = document.querySelector(".repassWord");
    let succesPopup = document.querySelector(".regsucces");
    let succesPopupBG = document.querySelector(".backgroundblur");
    if (checkValidImputsReg(password, repassword, userName)) {
      succesPopup.style.display = "flex";
      succesPopupBG.style.display = "flex";
      sendRegestryToBackEnd(userName, password, repassword);
    }
    if (!userName) {
      nameInput.onclick = () => {
        nameInput.value = "";
        nameInput.classList.remove("bad");
      };
      nameInput.classList.add("bad");
      nameInput.value = "to pole jest obowiązkowe";
    } else {
      nameInput.classList.remove("bad");
    }
    if (!password || !repassword || password != repassword) {
      passwordInput.onclick = () => {
        passwordInput.value = "";
        passwordInput.classList.remove("bad");
      };
      passwordInput.classList.add("bad");
      passwordInput.value = "hasło musi być identyczne....jeszcze raz";
      repasswordInput.onclick = () => {
        repasswordInput.value = "";
        repasswordInput.classList.remove("bad");
      };
      repasswordInput.classList.add("bad");
      repasswordInput.value = "hasło musi być identyczne....jeszcze raz";
    } else {
      passwordInput.classList.remove("bad");
      repasswordInput.classList.remove("bad");
    }
  };
  // zamykanie okna rejestracji
  const exitReg = () => {
    props.onHideRegestry();
  };
  return (
    <div className="mainContener">
      <div className="bg"></div>
      <div className="backgroundblur"></div>
      <div className="regsucces">
        <div className="regSuccesInfo">
          <h2>
            GRATULACJE {userName.toUpperCase()}, UDAŁO SIĘ ZAREJESTROWAĆ, TERAZ
            MOŻESZ SIĘ JUŻ ZALOGOWAĆ
          </h2>
        </div>
        <div className="regsuccesBtn">
          <button onClick={() => exitReg()} className="btn" type="button">
            WRÓĆ DO LOGOWANIA
          </button>
        </div>
      </div>
      <div className="header">Rejestracja</div>
      <div className="content">
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">nazwa użytkownika</label>
            <input
              className="userName"
              type="text"
              name="username"
              value={userName}
              placeholder="podaj nazwę użytkownika..."
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">hasło</label>
            <input
              className="passWord"
              type="text"
              name="password"
              value={password}
              placeholder="hasło..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="repassword">podaj ponownie hasło</label>
            <input
              className="repassWord"
              type="text"
              name="repassword"
              value={repassword}
              placeholder="powtórz hasło..."
              onChange={(e) => setRepassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button onClick={() => checkValid()} type="button" className="btn">
          REJESTRACJA
        </button>
        <button onClick={() => exitReg()} type="button" className="btn">
          ZAMKNIJ
        </button>
      </div>
    </div>
  );
};
export default Regester;
