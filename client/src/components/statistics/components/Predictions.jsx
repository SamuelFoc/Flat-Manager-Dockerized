import BarChart from "../charts/BarChart";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AvgExps = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState();
  const [elecAvgExps, setElecAvgExps] = useState();
  const [gasAvgExps, setGasAvgExps] = useState();
  const [watAvgExps, setWatAvgExps] = useState();
  const axiosPrivate = useAxiosPrivate();

  const createConstArray = (length, value) => {
    let array = [];
    for (let i = 0; i < length; i++) {
      array.push(value);
    }
    return array;
  };

  useEffect(() => {
    setLoading(true);
    axiosPrivate
      .get("/statistics/expenses")
      .then((res) => {
        setGasAvgExps({
          labels: res.data?.gas?.labels,
          data: res.data?.gas?.data,
        });

        setWatAvgExps({
          labels: res.data?.water?.labels,
          data: res.data?.water?.data,
        });

        setElecAvgExps({
          labels: res.data?.electricity?.labels,
          data: res.data?.electricity?.data,
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));

    axiosPrivate
      .get("/services")
      .then((res) => {
        setServices({
          electricity: res?.data?.data.filter(
            (item) => item.name.toLowerCase() === "electricity"
          ),
          water: res?.data?.data.filter(
            (item) => item.name.toLowerCase() === "water"
          ),
          gas: res?.data?.data.filter(
            (item) => item.name.toLowerCase() === "gas"
          ),
        });
      })
      .catch((err) => console.log(err));
  }, [axiosPrivate]);

  const elecConst = createConstArray(
    elecAvgExps?.data?.length,
    services?.electricity[0]?.monthly_price / 30
  );
  const watConst = createConstArray(
    watAvgExps?.data?.length,
    services?.water[0]?.monthly_price / 30
  );
  const gasConst = createConstArray(
    gasAvgExps?.data?.length,
    services?.gas[0]?.monthly_price / 30
  );

  const gasDataAvgExps = {
    labels: gasAvgExps?.labels,
    datasets: [
      {
        label: "Gas - Used vs",
        data: gasAvgExps?.data,
        backgroundColor: [
          "#003B00",
          "#006800",
          "#009800",
          "#44CB22",
          "#7FFF5A",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Paid",
        data: gasConst,
        backgroundColor: "#E53232",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const waterDataAvgExps = {
    labels: watAvgExps?.labels,
    datasets: [
      {
        label: "Water - Used vs",
        data: watAvgExps?.data,
        backgroundColor: [
          "#3B66FF",
          "#647FFF",
          "#879AFF",
          "#A8B5FF",
          "#C9D1FF",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Paid",
        data: watConst,
        backgroundColor: "#E53232",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const elecDataAvgExps = {
    labels: elecAvgExps?.labels,
    datasets: [
      {
        label: "Electricity - Used vs",
        data: elecAvgExps?.data,
        backgroundColor: [
          "#333500",
          "#556300",
          "#899400",
          "#C3C800",
          "#FFFF00",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Paid",
        data: elecConst,
        backgroundColor: "#E53232",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="my-4">
      <h3 className="chartTitle">Predictions</h3>
      {loading ? (
        <h6 className="fw-light">
          Data not available, please check if all unit prices are defined
          correctly.
        </h6>
      ) : (
        <div className="chartContainer">
          {gasAvgExps?.data?.length > 0 ? (
            <BarChart chartData={gasDataAvgExps} />
          ) : (
            ""
          )}
          {watAvgExps?.data?.length > 0 ? (
            <BarChart chartData={waterDataAvgExps} />
          ) : (
            ""
          )}
          {elecAvgExps?.data?.length > 0 ? (
            <BarChart chartData={elecDataAvgExps} />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default AvgExps;
