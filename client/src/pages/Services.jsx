import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// * Components
import useAxiosPrivate from "../hooks/useAxiosPrivate";
// * Charts
import Service from "../components/ServiceCard";
import PieChart from "../components/statistics/charts/PieChart";
import BarChart from "../components/statistics/charts/BarChart";

// TODO: CSS
import "./styles/Services.css";

const Services = () => {
  // TODO: STATES
  const [serviceData, setServiceData] = useState();
  const [unitsData, setUnitsData] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: EFFECTS
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const services = await axiosPrivate.get("/services");
        const units = await axiosPrivate.get("admin/units");
        isMounted && setServiceData(services.data.data);
        setUnitsData(units.data.data);
      } catch (err) {
        console.log(err);
        navigate("/home", { state: { from: location }, replace: true });
      }
    };

    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  const PieData = {
    labels: serviceData?.map((item) => item.name),
    datasets: [
      {
        label: "All services",
        data: serviceData?.map((item) => item.monthly_price),
        backgroundColor: [
          "#905CCE",
          "#456EDD",
          "#DD268B",
          "#E53232",
          "#2F4858",
          "#FFE5DC",
        ],
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };
  const BarData = {
    labels: unitsData?.map((item) => item.name),
    datasets: [
      {
        label: "All services",
        data: unitsData?.map((item) => item.unit_price),
        backgroundColor: [
          "#905CCE",
          "#456EDD",
          "#DD268B",
          "#E53232",
          "#2F4858",
          "#FFE5DC",
        ],
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="servicesMainSection">
      <div className="servicesMainContainer">
        <div className="text-end text-md-start">
          <h3 className="m-2 fw-light fs-2 ps-3">Monthly payable services</h3>
        </div>
        <div className="servicesSubContainer">
          {serviceData?.length > 0 ? (
            serviceData?.map((service) => <Service info={service} />)
          ) : (
            <h6>There are no services in DB..</h6>
          )}
        </div>
        <div className="pieChartBox">
          {serviceData?.length > 0 ? (
            <div className="pieChart">
              <PieChart chartData={PieData} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="servicesMainContainer">
        <div className="text-end text-md-start">
          <h3 className="m-2 fw-light fs-2 ps-3">Unit prices</h3>
        </div>
        <div className="servicesSubContainer">
          {unitsData?.length > 0 ? (
            unitsData?.map((service) => <Service info={service} />)
          ) : (
            <h6>There are no services in DB..</h6>
          )}
        </div>
        <div className="barChartBox">
          {unitsData?.length > 0 ? (
            <div className="barChart">
              <BarChart chartData={BarData} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
