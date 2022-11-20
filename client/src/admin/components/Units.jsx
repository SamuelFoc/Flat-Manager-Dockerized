import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Unit from "./AdminServiceCard";
import HiddenForm from "../../components/HiddenForm";

const Services = (props) => {
  const [formData, setFormData] = useState();
  const [showBox, setShowBox] = useState(false);
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

  const deleteRecord = (id) => {
    axiosPrivate
      .delete(`/admin/unit/${id}`)
      .then(() => {
        props.showMsg(`Unit ID: ${id} deleted succesfully.`);
      })
      .catch((err) => {
        props.addError(`Error occurred while deleting ID: ${id}.`);
      });
  };

  const formConfig = {
    type: "small",
    submit: {
      url: id ? `/admin/unit/${id}` : "admin/unit",
      method: id ? "put" : "post",
      data: formData,
    },
    inputs: [
      { name: "name" },
      { name: "unit_price", type: "number", min: 0, step: 0.01 },
    ],
    selections: [
      { name: "unit", options: ["l", "kg", "g", "kWh", "m", "m2", "m3"] },
    ],
    submitName: id ? "EDIT" : "CREATE",
  };

  return (
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Units</h3>
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
        <div className="text-light my-2">
          {props?.units?.length > 0 ? (
            props?.units?.map((service) => (
              <Unit
                info={service}
                showForm={showEditForm}
                handleDelete={deleteRecord}
              />
            ))
          ) : (
            <h6 className=" m-2 text-light">There are no Units yet..</h6>
          )}
        </div>
        <button
          className="btn btn-outline-success my-2"
          onClick={showCreateForm}
        >
          Add Unit
        </button>
      </div>
    </div>
  );
};

export default Services;
