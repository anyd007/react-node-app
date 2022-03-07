import React from "react";
import "./adminstyle.css";
import axios from "axios";

const AdminPanel = () => {
  //pobieranie danych które użytkownicy podali w  swoich bazach danych
  const [adminData, setAdminData] = React.useState("");
  const adminPanelData = async () => {
    try {
      const resp = await axios
        .get("/api/loginUserDatabase")
        .then((res) => res.data)
        .then((data) => setAdminData(data));
    } catch (error) {
      console.log("error", error);
    }
  };
  React.useEffect(() => {
    adminPanelData();
  }, []);
  //pobieranie danych które użytkownicy podali przy logowaniu
  const [adminLogins, setAdminLogins] = React.useState([]);
  console.log(adminLogins.map(el=>el));
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
      <div className="viewMainDb">
        <div className="dbHeaderView">WITAJ BOSSIE....MOŻESZ DZIAŁAĆ</div>
        <div className="filterBar">
          <form>
            <label htmlFor="select">FILTRUJ UŻYTKOWNIKA..</label>
            <select name="select">
              {adminLogins.map((el) => 
                <option key={el._id} value={el.username}>{el.username}</option>
              )}
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
            <tr className="databaseTr">
              <td className="databaseTd"></td>
              <td className="databaseTd"></td>
              <td className="databaseTd"></td>
              <td className="databaseTd"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminPanel;
