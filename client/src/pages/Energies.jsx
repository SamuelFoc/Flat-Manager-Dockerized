import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// * Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { faPlug } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// * Components
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import EnergyCard from "../components/EnergyCard";
import HiddenForm from "../components/HiddenForm";

// TODO: CSS
import "./styles/Energies.css";

export default function Energies() {
  // TODO: STATES
  const [energyData, setEnergyData] = useState();
  const [newRecord, setNewRecord] = useState();
  const [isShowedCreate, setIsShowedCreate] = useState();
  const [whatChanged, setWhatChanged] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: HANDLERS
  const showFormCreate = () => {
    setIsShowedCreate(!isShowedCreate);
    setWhatChanged("creation");
    setNewRecord({});
  };

  const handleChange = (event) => {
    setNewRecord((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  // TODO: FETCH DATA
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEnergies = async () => {
      try {
        const response = await axiosPrivate.get("/energies");
        isMounted && setEnergyData(response.data.data);
      } catch (err) {
        console.log(err);
        navigate("/home", { state: { from: location }, replace: true });
      }
    };

    getEnergies();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate, whatChanged]);

  // TODO: INFO OBJECTS
  const formInfo = {
    submit: {
      url: "/energies",
      method: "post",
      data: newRecord,
    },
    inputs: [{ name: "measured", type: "number", min: 0, step: 0.01 }],
    dates: ["date"],
    selections: [{ name: "type", options: ["Electricity", "Gas", "Water"] }],
    submitName: "CREATE RECORD",
  };

  return (
    <div className="energiesMainSection">
      <h3 className="custom-pill-box">
        Energy Records{" "}
        <FontAwesomeIcon
          icon={faPlus}
          className="mainButton"
          onClick={showFormCreate}
        />
      </h3>
      <div className="energiesMainContainer">
        <div className="row d-flex">
          <div className="col-12 col-xl-6 col-xxl-4 p-2 px-md-5">
            <h6 className="energiesSubTitle">
              Water consumption{" "}
              <FontAwesomeIcon icon={faDroplet} className="text-neutral" />
            </h6>
            <div className="m-2">
              {energyData?.water?.length > 0 ? (
                energyData?.water?.map((record) => (
                  <EnergyCard type="water" info={record} />
                ))
              ) : (
                <div className="noData">
                  <span>There are no records..</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-xl-6 col-xxl-4 p-2 px-md-5">
            <h6 className="energiesSubTitle">
              Gas consumption{" "}
              <FontAwesomeIcon
                icon={faFireFlameCurved}
                className="high-priority"
              />
            </h6>
            <div className="m-2">
              {energyData?.gas?.length > 0 ? (
                energyData?.gas?.map((record) => (
                  <EnergyCard type="gas" info={record} />
                ))
              ) : (
                <div className="noData">
                  <span>There are no records..</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-xl-6 col-xxl-4 p-2 px-md-5">
            <h6 className="energiesSubTitle">
              Electricity consumption{" "}
              <FontAwesomeIcon icon={faPlug} className="text-success" />
            </h6>
            <div className="m-2">
              {energyData?.electricity?.length > 0 ? (
                energyData?.electricity?.map((record) => (
                  <EnergyCard info={record} type="electricity" />
                ))
              ) : (
                <div className="noData">
                  <span>There are no records..</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* HIDDEN FORM FOR CREATING NEW RESPS*/}
      {isShowedCreate && (
        <HiddenForm
          formInfo={formInfo}
          showForm={showFormCreate}
          handleChange={handleChange}
          whatChanged={setWhatChanged}
        />
      )}
    </div>
  );
}
