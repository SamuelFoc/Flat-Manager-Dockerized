import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import FileDownload from "js-file-download";
import AverageExpenses from "../components/statistics/components/AverageExpenses";
import AverageConsumption from "../components/statistics/components/AverageConsumption";
import Predictions from "../components/statistics/components/Predictions";
import Summary from "../components/statistics/components/Summary";

// TODO: CSS
import "./styles/Statistics.css";

const Statistics = () => {
  const [summaryHidden, setSummaryHidden] = useState(true);
  const [report, setReport] = useState();
  const [newError, setNewError] = useState(false);
  const [newMsg, setNewMsg] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const showSummary = () => {
    setSummaryHidden((prevState) => !prevState);
  };

  const handleChange = (event) => {
    setNewMsg(false);
    setReport((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  var data = JSON.stringify(report);

  const generateReport = (e) => {
    e.preventDefault();
    var config = {
      url: "/statistics/generateReport",
      method: "post",
      data: data,
    };
    setNewMsg(false);
    setNewError(false);
    axiosPrivate(config)
      .then(() => {
        setNewMsg("Download Report");
        setNewError(false);
      })
      .catch((err) => {
        setNewError(err.message);
        setNewMsg(false);
      });
  };

  const downloadReport = (e) => {
    e.preventDefault();
    setNewMsg("Downloading..");
    setNewError(false);

    var config = {
      url: `/statistics/downloadReport/${report.type}`,
      method: "get",
      responseType: "blob",
    };
    axiosPrivate(config)
      .then((res) => {
        FileDownload(res.data, `${report.type}_report.pdf`);
        setNewMsg("Download Again?");
        setNewError(false);
      })
      .catch((err) => {
        setNewError(err.message);
        setNewMsg(false);
      });
  };

  return (
    <div className="statisticsMainSection">
      <div className="statisticsPageBox">
        <div className="avgCons">
          <AverageConsumption />
        </div>
        <div className="avgExps">
          <AverageExpenses />
        </div>
        <div className="predictions mb-4">
          <Predictions />
        </div>
      </div>

      <div className="summaryMainContainer mt-5">
        <h3 className="chartTitle mt-3 ps-0">Summary</h3>
        <div className="summary">
          <button
            className={
              summaryHidden
                ? "btn btn-outline-success summaryMainButton"
                : "hidden"
            }
            onClick={showSummary}
          >
            Generate Summary
          </button>
          <div
            className={summaryHidden ? "hidden" : "summaryCloseButton"}
            onClick={showSummary}
          >
            x
          </div>
          {summaryHidden ? "" : <Summary />}
        </div>
      </div>

      <div className="reportsMainContainer mt-5">
        <button className="btn btn-outline-warning" onClick={generateReport}>
          Generate report
        </button>
        <select
          className="form-select my-2"
          name="type"
          onChange={handleChange}
        >
          <option defaultValue>Select report type</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Gas">Gas</option>
        </select>
        <label htmlFor="from" className="text-white">
          From
        </label>
        <input
          type="date"
          className="form-control"
          name="from"
          onChange={handleChange}
          id="from"
        />
        <label htmlFor="to" className="text-white">
          To
        </label>
        <input
          type="date"
          className="form-control"
          name="to"
          onChange={handleChange}
          id="to"
        />
        <div className="mt-3">
          <h4 className="text-light">{newMsg || newError ? "" : ""}</h4>
          <div
            className={
              newError ? "alert alert-danger" : "alert alert-danger collapse"
            }
            role="alert"
          >
            {newError}
          </div>
          <button
            className={newMsg ? "btn btn-success" : "collapse"}
            onClick={downloadReport}
          >
            {newMsg}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
