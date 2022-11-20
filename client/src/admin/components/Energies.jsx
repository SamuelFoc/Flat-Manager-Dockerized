import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EnergyCard from "./AdminEnergyCard";
import HiddenForm from "../../components/HiddenForm";

const Energy = (props) => {
  const [showBox, setShowBox] = useState();
  const [formData, setFormData] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [id, setId] = useState(false);

  // TODO: Service Editing
  const [isForm, setIsForm] = useState(false);
  const showEditForm = (id) => {
    setIsForm((prevState) => !prevState);
    setId(id);
    setFormData({});
  };

  const showCreateForm = (id) => {
    setIsForm((prevState) => !prevState);
    setId(false);
    setFormData({});
  };

  const setVisibility = () => {
    setShowBox((prevState) => !prevState);
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const formConfig = {
    type: "small",
    submit: {
      url: id ? `/admin/energy/${id}` : "admin/energy",
      method: id ? "put" : "post",
      data: formData,
    },
    inputs: [{ name: "measured" }],
    dates: ["date"],
    selections: [{ name: "type", options: ["Electricity", "Water", "Gas"] }],
    submitName: id ? "EDIT" : "CREATE",
  };

  const deleteRecord = (id) => {
    axiosPrivate
      .delete(`/admin/energy/${id}`)
      .then(() => {
        props.showMsg(`Record ID: ${id} deleted succesfully.`);
      })
      .catch((err) => {
        props.addError(`Error occurred while deleting ID: ${id}.`);
      });
  };

  return (
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Energies</h3>
        {!showBox ? (
          <button
            className="btn btn-outline-warning my-2"
            onClick={setVisibility}
          >
            Configure
          </button>
        ) : (
          <button
            className="btn btn-outline-danger my-2"
            onClick={setVisibility}
          >
            Close
          </button>
        )}
      </div>
      <div className={showBox ? "formBox" : "formBox hidden"}>
        {isForm && (
          <HiddenForm
            formInfo={formConfig}
            showForm={showEditForm}
            handleChange={handleChange}
            whatFailed={props.addError}
            whatChanged={props.showMsg}
          />
        )}
        <div className="text-light my-4">
          {props?.energies?.water?.length > 0 ? (
            props?.energies?.water?.map((energy, i) => (
              <EnergyCard
                handleDelete={deleteRecord}
                showForm={showEditForm}
                key={i}
                info={energy}
                type={"water"}
              />
            ))
          ) : (
            <h6>There are no water consumption records..</h6>
          )}
          {props?.energies?.gas?.length > 0 ? (
            props?.energies?.gas?.map((energy, i) => (
              <EnergyCard
                handleDelete={deleteRecord}
                showForm={showEditForm}
                key={i}
                info={energy}
                type={"gas"}
              />
            ))
          ) : (
            <h6>There are no gas consumption records..</h6>
          )}
          {props?.energies?.electricity?.length > 0 ? (
            props?.energies?.electricity?.map((energy, i) => (
              <EnergyCard
                handleDelete={deleteRecord}
                showForm={showEditForm}
                key={i}
                info={energy}
                type={"electricity"}
              />
            ))
          ) : (
            <h6>There are no electricity consumption records..</h6>
          )}
        </div>
        <button
          className="btn btn-outline-success my-2"
          onClick={showCreateForm}
        >
          Add Record
        </button>
      </div>
    </div>
  );
};

export default Energy;
