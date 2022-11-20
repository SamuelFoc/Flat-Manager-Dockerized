import React from "react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import PaymentCard from "../components/PaymentCard";
import "./styles/Payments.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HiddenForm from "../components/HiddenForm";

const Payments = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [payments, setPayments] = useState();
  const [msg, setMsg] = useState();
  const [error, setError] = useState();
  const [id, setId] = useState();
  const [newPayment, setNewPayment] = useState();
  const [showForm, setShowForm] = useState();

  const formInfo = {
    submit: {
      url: id ? `/payments/${id}` : `/payments/${auth?.user}`,
      method: id ? "put" : "post",
      data: newPayment,
    },
    inputs: [
      { name: "title" },
      { name: "description" },
      { name: "pay_day" },
      { name: "iban" },
      { name: "am" },
      { name: "ss" },
      { name: "vs" },
      { name: "cc" },
      { name: "rn" },
      { name: "msg" },
    ],
    submitName: id ? "EDIT" : "CREATE",
  };

  const showFormCreate = () => {
    setShowForm(!showForm);
    setId(false);
    setNewPayment({});
    setMsg("Create payment");
  };

  const showFormEdit = (id) => {
    setShowForm(!showForm);
    setId(id);
    setNewPayment({});
    setMsg("Edit payment");
  };

  const handleChange = (event) => {
    setNewPayment((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  useEffect(() => {
    const getPayments = async () => {
      axiosPrivate
        .get(`/payments/${auth?.user}`)
        .then((payments) => {
          setPayments(payments.data.data);
          setError(false);
        })
        .catch((err) => {
          setMsg(err.message);
          setError(true);
        });
    };

    getPayments();
  }, [axiosPrivate, auth, msg]);

  return (
    <section className="paymentsMainSection">
      <div className="createPaymentButtonBox">
        <FontAwesomeIcon
          icon={faPlus}
          className="mainButton"
          onClick={showFormCreate}
        />
      </div>
      {msg && (
        <div className={error ? "paymentsMsg-denied" : "paymentsMsg-success"}>
          {msg}
        </div>
      )}
      <div className="paymentsMainContainer">
        <div className="paymentsSubContainer">
          {payments?.length > 0 ? (
            payments?.map((payment) => (
              <PaymentCard
                info={payment}
                msg={setMsg}
                handleEdit={showFormEdit}
                setId={setId}
              />
            ))
          ) : (
            <h3>You have no payments yet..</h3>
          )}
        </div>
      </div>
      {showForm && (
        <HiddenForm
          formInfo={formInfo}
          showForm={showFormCreate}
          handleChange={handleChange}
          whatChanged={setMsg}
        />
      )}
    </section>
  );
};

export default Payments;
