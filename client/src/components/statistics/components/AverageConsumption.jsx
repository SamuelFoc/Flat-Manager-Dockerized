import BarChart from "../charts/BarChart";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AvgCons = () => {
  const [loading, setLoading] = useState(false);
  const [gasAvg, setGasAvg] = useState();
  const [waterAvg, setWaterAvg] = useState();
  const [elecAvg, setElecAvg] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("/statistics/averages")
      .then((res) => {
        setGasAvg({
          labels: res.data?.gas?.labels,
          data: res.data?.gas?.avg,
        });

        setWaterAvg({
          labels: res.data?.water?.labels,
          data: res.data?.water?.avg,
        });

        setElecAvg({
          labels: res.data?.electricity?.labels,
          data: res.data?.electricity?.avg,
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [axiosPrivate]);

  const gasDataAvg = {
    labels: gasAvg?.labels,
    datasets: [
      {
        label: "Gas - m3/day",
        data: gasAvg?.data,
        backgroundColor: [
          "#003B00",
          "#006800",
          "#009800",
          "#44CB22",
          "#7FFF5A",
        ],
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };
  const waterDataAvg = {
    labels: waterAvg?.labels,
    datasets: [
      {
        label: "Water - m3/day",
        data: waterAvg?.data,
        backgroundColor: [
          "#3B66FF",
          "#647FFF",
          "#879AFF",
          "#A8B5FF",
          "#C9D1FF",
        ],
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };
  const elecDataAvg = {
    labels: elecAvg?.labels,
    datasets: [
      {
        label: "Electricity - kWh/day",
        data: elecAvg?.data,
        backgroundColor: [
          "#333500",
          "#556300",
          "#899400",
          "#C3C800",
          "#FFFF00",
        ],
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="my-4">
      <h3 className="chartTitle">Average consumption</h3>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="chartContainer">
          {gasAvg?.data?.length > 0 ? <BarChart chartData={gasDataAvg} /> : ""}
          {waterAvg?.data?.length > 0 ? (
            <BarChart chartData={waterDataAvg} />
          ) : (
            ""
          )}
          {elecAvg?.data?.length > 0 ? (
            <BarChart chartData={elecDataAvg} />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default AvgCons;
