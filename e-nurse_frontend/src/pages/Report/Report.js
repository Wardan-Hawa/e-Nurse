import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

function Report() {
  const { token } = useContext(AuthContext);
  const [reportData, setReportData] = useState({});
  const { id } = useParams();

  const report = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/report/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      console.log(json);

      setReportData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    report(id);
  }, []);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="m-0">Report ID: #{reportData.id}</h1>
        <div className="d-flex align-items-center">
          <div className="me-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M17 3v-2c0-.552.447-1 1-1s1 .448 1 1v2c0 .552-.447 1-1 1s-1-.448-1-1zm-12 1c.553 0 1-.448 1-1v-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1v2c0 .552.447 1 1 1zm13 13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 0c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-14.237 3.5h-7.763v-13h19v1.763c.727.33 1.399.757 2 1.268v-9.031h-3v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-9v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-3v21h11.031c-.511-.601-.938-1.273-1.268-2z" /></svg></div>
          <strong>Date: {dayjs(reportData.createdAt).format('YYYY-MM-DD')}</strong>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name/Id</th>
            <th>Description</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {reportData?.Interactions?.map((interaction) => (
            <tr key={interaction.id}>
              <td>{interaction.name}</td>
              <td>{interaction.description}</td>
              <td>{interaction.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Report;
