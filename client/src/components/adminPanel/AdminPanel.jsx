import React from "react";
import "./adminstyle.css";
import axios from "axios";

const AdminPanel = (props) => {
  //porównanie warości wprowadzonych przez usera do inputów z daymi logowania admina
  const adminbackgroundblur = document.querySelector(".adminbackgroundblur");
  const adminLoginWarrinig = document.querySelector(".adminLoginWarrinig");
  const badloginwarr = document.querySelector(".badloginwarr");
  const loginInputs = document.querySelectorAll("input");

  const [loginEntry, setloginEntry] = React.useState({
    adminLogin: "",
    adminPassword: "",
  });
  const inputValues = (e) => {
    const { name, value } = e.target;
    return setloginEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const adminLoginBtn = () => {
    setloginEntry((prev) => ({
      ...prev,
      adminLogin: "",
      adminPassword: "",
    }));
    if (
      loginEntry.adminLogin == process.env.REACT_APP_ADMIN_NAME &&
      loginEntry.adminPassword == process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      adminLoginWarrinig.style.display = "none";
      adminbackgroundblur.style.display = "none";
    } else {
      badloginwarr.style.display = "flex";
      loginInputs.forEach((el) => {
        el.classList.add("bad");
        el.onclick = () => {
          el.classList.remove("bad");
          badloginwarr.style.display = "none";
        };
      });
    }
  };

  //pobieranie value.id przy wyborze uzytkownika onchange aby ywświetliłą się konkretna bazadanych
  const [viewData, setViewData] = React.useState([]);
  const onDataView = (e) => {
    setViewData(e.target.value);
  };
  //pobieranie danych które użytkownicy podali w  swoich bazach danych
  const [adminData, setAdminData] = React.useState([]);
  const adminPanelData = async () => {
    try {
      const resp = await axios
        .get("/api/loginUserDatabase")
        .then((res) => res.data)
        .then((data) =>
          data.filter((item) => {
            return item.id == viewData;
          })
        ) //filtrowanie wg id, do wyswitlenia w tabeli
        .then((data) => setAdminData(data));
    } catch (error) {
      console.log("error", error);
    }
  };
  React.useEffect(() => {
    adminPanelData();
  }, [viewData]); // funkcjia adminPanelData wywola sie za kazdym razem kiedy zmieni sie stan viewData

  //pobieranie danych które użytkownicy podali przy logowaniu
  const [adminLogins, setAdminLogins] = React.useState([]);
  const adminPanelLoginData = async () => {
    try {
      const resp = await axios
        .get("/api/regestry")
        .then((res) => res.data)
        .then((data) => setAdminLogins(data));
    } catch (error) {
      console.log("błąd", error);
    }
  };
  React.useEffect(() => {
    adminPanelLoginData();
  }, []);
  return (
    <section className="dbMainContener">
      <div className="dbBg"></div>
      <div className="adminbackgroundblur"></div>
      <div className="adminLoginWarrinig">
        <div className="adminLoginPanel">
          <label htmlFor="adminLogin">NAZWA ADMINISTRATORA</label>
          <input
            type="text"
            name="adminLogin"
            value={loginEntry.adminLogin}
            onChange={inputValues}
            placeholder="nazwa użytkownika..."
          />
          <label htmlFor="adminPassword">HASŁO ADMINISTRATORA</label>
          <input
            type="text"
            name="adminPassword"
            value={loginEntry.adminPassword}
            onChange={inputValues}
            placeholder="hasło..."
          />
          <button onClick={() => adminLoginBtn()} type="button" className="btn">
            ZALOGUJ
          </button>
          <button
            onClick={() => props.onExitMasterAdminPanel()}
            type="button"
            className="btn"
          >
            ZAMKNIJ
          </button>
        </div>
        <div style={{ display: "none" }} className="badloginwarr">
          <h3>
            PODANE DANE SĄ BŁĘDNE JEŻELI NIE, JESTEŚ OSOBĄ UPRAWNIONĄ ZAMKNIJ TĄ
            STRONĘ
          </h3>
        </div>
      </div>
      <div className="viewMainDb">
        <button 
        onClick={() => props.onExitMasterAdminPanel()}
        type="button" 
        className="btn" 
        id="closeAdminPanelBtn">ZAMKNIJ</button>
        <div className="dbHeaderView">WITAJ BOSSIE....MOŻESZ DZIAŁAĆ</div>
        <div className="filterBar">
          <form>
            <label htmlFor="select">FILTRUJ UŻYTKOWNIKA..</label>
            <br />
            <select className="selectUser" onChange={onDataView} name="select">
              {adminLogins.map((el) => (
                <option key={el._id} value={el.id}>
                  {el.username.toUpperCase()}
                </option>
              ))}
            </select>
          </form>
        </div>
        <table className="tableContener">
          <tbody>
            <tr className="databaseTr">
              <th className="databaseTh">IMIĘ I NAZWISKO GRACZA</th>
              <th className="databaseTh">OBECNY/OSTATNI KLUB</th>
              <th className="databaseTh">POZYCJA NA KTÓREJ GRA</th>
              <th className="databaseTh">NAJWYŻSZA ILOŚC PUNKTÓW</th>
            </tr>
            {adminData.map((el) => (
              <tr key={el._id} value="el.id" className="databaseTr">
                <td className="databaseTd">{el.playerName}</td>
                <td className="databaseTd">{el.playerClub}</td>
                <td className="databaseTd">{el.position}</td>
                <td className="databaseTd">{el.highScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminPanel;
