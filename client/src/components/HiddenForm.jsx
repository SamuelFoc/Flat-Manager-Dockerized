import "./styles/HiddenForm.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function HiddenForm(props) {
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = props.formInfo.submit.method;
    const url = props.formInfo.submit.url;
    var data = JSON.stringify(props.formInfo.submit.data);
    const message =
      method === "post"
        ? `Posted new ${url.split("/").pop()}: ${
            Object.values(props.formInfo.submit.data)[0]
          }.`
        : `Edited ${url.split("/")[url.split("/").length - 2]}: ${
            Object.values(props.formInfo.submit.data)[0]
          }.`;
    var config = {
      method: props.formInfo.submit.method,
      url: props.formInfo.submit.url,
      data: data,
    };

    axiosPrivate(config)
      .then((res) => {
        props.showForm(false);
        props.whatChanged(message);
        props.whatFailed("");
      })
      .catch((error) => {
        props.whatFailed(error?.response?.data);
        console.log(error);
      });
  };

  return (
    <div
      className={
        props.formInfo.type === "small"
          ? "smallAfterElementForm"
          : "afterElementForm"
      }
    >
      <form>
        {/* INPUTS */}
        {props.formInfo?.inputs?.map((input, i) => {
          return (
            <input
              key={i}
              className="form-control my-2"
              onChange={props.handleChange}
              type={input?.type ? input.type : "text"}
              min={input?.min}
              max={input?.max}
              step={input?.step}
              name={input.name}
              placeholder={input.name[0].toUpperCase() + input.name.slice(1)}
            />
          );
        })}

        {/* DATES */}
        {props.formInfo?.dates?.map((input, i) => {
          return (
            <div key={i} className="text-light">
              <label htmlFor={input}>
                {input[0].toUpperCase() + input.slice(1)}
              </label>
              <input
                className="form-control mb-2"
                onChange={props.handleChange}
                type="date"
                name={input}
                id={input}
              />
            </div>
          );
        })}

        {/* SELECTIONS */}
        {props.formInfo?.selections?.map((selection, i) => {
          return (
            <select
              key={i}
              className="form-select my-2"
              name={selection.name}
              onChange={props.handleChange}
            >
              <option defaultValue value={"LOW"}>
                {selection.name[0].toUpperCase() + selection.name.slice(1)}
              </option>

              {selection.options.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          );
        })}

        {props.formInfo?.checks?.map((input, i) => {
          return (
            <div key={i} className="text-light form-check">
              <label className="form-check-label" htmlFor={input}>
                {input?.name[0]?.toUpperCase() + input?.name?.slice(1)}
              </label>
              <input
                className="form-check-input mb-2"
                onChange={props?.handleChange}
                type="checkbox"
                name={input?.name}
                id={input?.name}
              />
            </div>
          );
        })}

        <div className="hiddenFormButtons">
          <button
            className="btn btn-primary m-4 px-4"
            type="submit"
            onClick={handleSubmit}
          >
            {props.formInfo.submitName}
          </button>
          <button className="btn btn-danger m-4 px-4" onClick={props.showForm}>
            BACK
          </button>
        </div>
      </form>
    </div>
  );
}

export default HiddenForm;
