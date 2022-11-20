import LineChart from "../charts/LineChart";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AvgExps = () => {
  const [loading, setLoading] = useState(false);
  const [elecAvgExps, setElecAvgExps] = useState();
  const [gasAvgExps, setGasAvgExps] = useState();
  const [watAvgExps, setWatAvgExps] = useState();
  const axiosPrivate = useAxiosPrivate();

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
  }, [axiosPrivate]);

  const gasDataAvgExps = {
    labels: gasAvgExps?.labels,
    datasets: [
      {
        label: "Gas - CZK/Day",
        data: gasAvgExps?.data,
        backgroundColor: "#44CB22",
        borderColor: "#44CB22",
        borderWidth: 4,
      },
    ],
  };
  const waterDataAvgExps = {
    labels: watAvgExps?.labels,
    datasets: [
      {
        label: "Water - CZK/Day",
        data: watAvgExps?.data,
        backgroundColor: "#3B66FF",
        borderColor: "#3B66FF",
        borderWidth: 4,
      },
    ],
  };
  const elecDataAvgExps = {
    labels: elecAvgExps?.labels,
    datasets: [
      {
        label: "Electricity - CZK/Day",
        data: elecAvgExps?.data,
        backgroundColor: "#C5D226",
        borderColor: "#C5D226",
        borderWidth: 4,
      },
    ],
  };

  return (
    <div className="my-4">
      <h3 className="chartTitle">Average expenses</h3>
      {loading ? (
        <h6 className="fw-light">
          Data not available, please check if all unit prices are defined
          correctly.
        </h6>
      ) : (
        <div className="chartContainer">
          {gasAvgExps?.data?.length > 0 ? (
            <LineChart chartData={gasDataAvgExps} />
          ) : (
            ""
          )}
          {watAvgExps?.data?.length > 0 ? (
            <LineChart chartData={waterDataAvgExps} />
          ) : (
            ""
          )}
          {elecAvgExps?.data?.length > 0 ? (
            <LineChart chartData={elecDataAvgExps} />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default AvgExps;
