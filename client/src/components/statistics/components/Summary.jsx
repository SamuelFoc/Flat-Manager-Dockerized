import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Regular
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
//Solid
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faPlugCircleBolt } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./Summary.css";

const Summary = () => {
  const [loading, setLoading] = useState(false);
  const [gas, setGas] = useState();
  const [water, setWater] = useState();
  const [elec, setElec] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setLoading(true);
    axiosPrivate
      .get("/statistics/summary")
      .then((res) => {
        setGas(res.data?.gas_summary);
        setWater(res.data?.water_summary);
        setElec(res.data?.electricity_summary);

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [axiosPrivate]);

  return (
    <div className="my-4 summarySubContainer">
      {false ? (
        <h6 className="fw-light">
          Data not available, please check if all unit prices are defined
          correctly.
        </h6>
      ) : (
        <div className="mt-4">
          <div className="row mb-5">
            <div className="d-flex flex-column">
              <h6 className="summaryTitle mb-0 mb-1">Electricity</h6>
              <div
                className="summaryTitle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Measured between dates."
              >
                <span>
                  <FontAwesomeIcon icon={faCalendar} className="text-neutral" />
                  &ensp;{elec?.from}&ensp;
                  <FontAwesomeIcon
                    icon={faRightLong}
                    className="text-neutral"
                  />
                  &ensp;{elec?.to}
                </span>
              </div>
            </div>
            <div className="col-6 summaryText">
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Number of days counted in summary."
              >
                <FontAwesomeIcon icon={faSun} className="text-orange" />
                <span>&ensp;{elec?.days}</span>
              </div>
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Overall consumption."
              >
                <strong>
                  <FontAwesomeIcon icon={faSquare} className="text-neutral" />
                  &ensp;
                </strong>
                <span>
                  {elec?.real_consumption}&ensp;{elec?.unit}
                </span>
              </div>
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Overall Inkaso."
              >
                <strong>
                  <FontAwesomeIcon icon={faMoon} className="text-gray" />
                  &ensp;
                </strong>
                <span>
                  {elec?.predictedPrice}&ensp;{elec?.price_currency}
                </span>
              </div>
            </div>
            <div className="col-6 summaryText">
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Real estimated consumption."
              >
                <strong>
                  <FontAwesomeIcon
                    icon={faPlugCircleBolt}
                    className="text-orange"
                  />
                  &ensp;
                </strong>
                <span>
                  {elec?.real_consumption_price}&ensp;{elec?.price_currency}
                </span>
              </div>
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Overpayments."
              >
                <strong>
                  <FontAwesomeIcon
                    icon={faHandHoldingDollar}
                    className="text-neutral"
                  />
                  &ensp;
                </strong>
                <span>
                  {elec?.overpayments}&ensp;{elec?.price_currency}
                </span>
              </div>
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Arrears."
              >
                <strong>
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-red"
                  />
                  &ensp;
                </strong>
                <span>
                  {elec?.arrears}&ensp;{elec?.price_currency}
                </span>
              </div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="d-flex flex-column">
              <h6 className="summaryTitle mb-0 mb-1">Water</h6>
              <div
                className="summaryTitle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Measured between dates."
              >
                <span>
                  <FontAwesomeIcon icon={faCalendar} className="text-neutral" />
                  &ensp;{water?.from}&ensp;
                  <FontAwesomeIcon
                    icon={faRightLong}
                    className="text-neutral"
                  />
                  &ensp;{water?.to}
                </span>
              </div>
            </div>
            <div className="col-6 summaryText">
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Number of days counted in summary."
              >
                <FontAwesomeIcon icon={faSun} className="text-orange" />
                <span>&ensp;{water?.days}</span>
              </div>
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Overall consumption."
              >
                <strong>
                  <FontAwesomeIcon icon={faSquare} className="text-neutral" />
                  &ensp;
                </strong>
                <span>
                  {water?.real_consumption}&ensp;{water?.unit}
                </span>
              </div>
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Overall Inkaso."
              >
                <strong>
                  <FontAwesomeIcon icon={faMoon} className="text-gray" />
                  &ensp;
                </strong>
                <span>
                  {water?.predictedPrice}&ensp;{water?.price_currency}
                </span>
              </div>
            </div>
            <div className="col-6 summaryText">
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Real estimated consumption."
              >
                <strong>
                  <FontAwesomeIcon
                    icon={faPlugCircleBolt}
                    className="text-orange"
                  />
                  &ensp;
                </strong>
                <span>
                  {water?.real_consumption_price}&ensp;{water?.price_currency}
                </span>
              </div>
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Overpayments."
              >
                <strong>
                  <FontAwesomeIcon
                    icon={faHandHoldingDollar}
                    className="text-neutral"
                  />
                  &ensp;
                </strong>
                <span>
                  {water?.overpayments}&ensp;{water?.price_currency}
                </span>
              </div>
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Arrears."
              >
                <strong>
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-red"
                  />
                  &ensp;
                </strong>
                <span>
                  {water?.arrears}&ensp;{water?.price_currency}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="d-flex flex-column">
              <h6 className="summaryTitle mb-0 mb-1">Gas</h6>
              <div
                className="summaryTitle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Measured between dates."
              >
                <span>
                  <FontAwesomeIcon icon={faCalendar} className="text-neutral" />
                  &ensp;{gas?.from}&ensp;
                  <FontAwesomeIcon
                    icon={faRightLong}
                    className="text-neutral"
                  />
                  &ensp;{gas?.to}
                </span>
              </div>
            </div>
            <div className="col-6 summaryText">
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Number of days counted in summary."
              >
                <FontAwesomeIcon icon={faSun} className="text-orange" />
                <span>&ensp;{gas?.days}</span>
              </div>
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Overall consumption."
              >
                <strong>
                  <FontAwesomeIcon icon={faSquare} className="text-neutral" />
                  &ensp;
                </strong>
                <span>
                  {gas?.real_consumption}&ensp;{gas?.unit}
                </span>
              </div>
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Overall Inkaso."
              >
                <strong>
                  <FontAwesomeIcon icon={faMoon} className="text-gray" />
                  &ensp;
                </strong>
                <span>
                  {gas?.predictedPrice}&ensp;{gas?.price_currency}
                </span>
              </div>
            </div>
            <div className="col-6 summaryText">
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Real estimated consumption."
              >
                <strong>
                  <FontAwesomeIcon
                    icon={faPlugCircleBolt}
                    className="text-orange"
                  />
                  &ensp;
                </strong>
                <span>
                  {gas?.real_consumption_price}&ensp;{gas?.price_currency}
                </span>
              </div>
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Overpayments."
              >
                <strong>
                  <FontAwesomeIcon
                    icon={faHandHoldingDollar}
                    className="text-neutral"
                  />
                  &ensp;
                </strong>
                <span>
                  {gas?.overpayments}&ensp;{gas?.price_currency}
                </span>
              </div>
              <div
                className="p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Arrears."
              >
                <strong>
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-red"
                  />
                  &ensp;
                </strong>
                <span>
                  {gas?.arrears}&ensp;{gas?.price_currency}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
