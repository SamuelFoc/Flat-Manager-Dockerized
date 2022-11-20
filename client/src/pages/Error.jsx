import { Link } from "react-router-dom";

// TODO: CSS
import "./styles/Error.css";

export default function Error() {
  return (
    <div className="errorMainSection">
      <h1 className="errorMainTitle">
        Error 420!
        <p className="fs-5">
          Something went wrong.. Please try it again or contact your webmaster.
        </p>
      </h1>
      <Link to="/" className="btn btn-primary">
        Home
      </Link>
    </div>
  );
}
