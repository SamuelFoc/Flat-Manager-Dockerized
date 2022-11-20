import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section>
      <h1 className="color-light">
        Error 401!
        <p>Unauthorized.. You do not have access to the requested page.</p>
      </h1>
      <button className="btn btn-primary" onClick={goBack}>
        Go Back
      </button>
    </section>
  );
};

export default Unauthorized;
