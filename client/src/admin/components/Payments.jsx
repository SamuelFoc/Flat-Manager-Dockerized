import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Payment from "./AdminPaymentCard";
import HiddenForm from "../../components/HiddenForm";

const Payments = (props) => {
  const [formData, setFormData] = useState();
  const [showPayments, setShowPayments] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [paymentName, setPaymentName] = useState("");

  // TODO: User Editing
  const [isEditForm, setIsEditForm] = useState(false);
  const showEditForm = (username) => {
    setIsEditForm((prevState) => !prevState);
    setPaymentName(username);
    setFormData({});
  };

  const showCreateForm = () => {
    setIsEditForm((prevState) => !prevState);
    setPaymentName(false);
    setFormData({});
  };

  const setVisibility = () => {
    setShowPayments((prevState) => !prevState);
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
      url: paymentName
        ? `/admin/paymentAccount/${paymentName}`
        : "admin/paymentAccount",
      method: paymentName ? "put" : "post",
      data: formData,
    },
    inputs: [{ name: "name" }, { name: "iban" }, { name: "currency" }],
    checks: [{ name: "isDefault" }],
    submitName: paymentName ? "EDIT" : "CREATE",
  };

  // TODO: DELETE USER
  const deletePayment = (paymentName) => {
    axiosPrivate
      .delete(`/admin/paymentAccount/${paymentName}`)
      .then(() => {
        props.showMsg(`Payment ${paymentName} deleted succesfully.`);
      })
      .catch((err) => {
        props.addError(`Error occurred while deleting ${paymentName}.`);
      });
  };

  return (
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Payment Accounts</h3>
        {!showPayments ? (
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
      <div className={showPayments ? "formBox" : "formBox hidden"}>
        {isEditForm && (
          <HiddenForm
            formInfo={formConfig}
            showForm={showEditForm}
            handleChange={handleChange}
            whatChanged={props.showMsg}
            whatFailed={props.addError}
          />
        )}
        <div className="text-light my-4">
          {props?.payments?.length > 0 ? (
            props?.payments?.map((payment) => (
              <Payment
                info={payment}
                handleDelete={deletePayment}
                showForm={showEditForm}
              />
            ))
          ) : (
            <h6 className=" m-2 text-light">
              There are no Payment Accounts yet..
            </h6>
          )}
        </div>
        <button
          className="btn btn-outline-success my-2"
          onClick={showCreateForm}
        >
          Add Payment Account
        </button>
      </div>
    </div>
  );
};

export default Payments;
