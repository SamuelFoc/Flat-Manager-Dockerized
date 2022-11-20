import React from "react";
import { useState, useEffect } from "react";
// * Icons
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// * Components
import HiddenForm from "../components/HiddenForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ProductCard from "../components/ProductCard";

// TODO: CSS
import "./styles/ShoppingList.css";

export default function ShoppingList() {
  // TODO: STATES
  const [isShowedCreate, setIsShowedCreate] = useState(false);
  const [Id, setId] = useState();
  const [whatChanged, setWhatChanged] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    owner: "",
    priority: "",
    price: null,
    type: "",
  });
  const [products, setProducts] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: HANDLERS
  const deleteProduct = (id) => {
    axiosPrivate.delete(`/products/${id}`);
    setId(false);
    setWhatChanged(`${id} deleted`);
  };

  const showFormCreate = () => {
    setIsShowedCreate(!isShowedCreate);
    setId(false);
    setNewProduct({});
    setWhatChanged("creation");
  };

  const showFormEdit = (id) => {
    setIsShowedCreate(!isShowedCreate);
    setId(id);
    setNewProduct({});
    setWhatChanged("edit");
  };

  const handleChange = (event) => {
    setNewProduct((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  // TODO: EFFECTS
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get("/products");
        isMounted && setProducts(response.data.data);
      } catch (err) {
        console.log(err);
        navigate("/home", { state: { from: location }, replace: true });
      }
    };

    getProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate, whatChanged]);

  // TODO: INFO OBJECTS
  const formInfo = {
    submit: {
      url: Id ? `/products/${Id}` : "/products",
      method: Id ? "put" : "post",
      data: newProduct,
    },
    inputs: [
      { name: "name" },
      { name: "owner" },
      { name: "price", type: "number", min: 0, step: 0.01 },
    ],
    dates: [],
    selections: [
      { name: "priority", options: ["LOW", "HIGH", "CRITICAL"] },
      {
        name: "type",
        options: [
          "Kitchen",
          "Bathroom",
          "Bedroom",
          "Toilet",
          "Free Time",
          "Food",
        ],
      },
    ],
    submitName: Id ? "EDIT" : "CREATE",
  };

  return (
    <div className="shoppingListMainSection">
      <h3 className="custom-pill-box">
        Shopping List
        <FontAwesomeIcon
          icon={faPlus}
          className="mainButton"
          onClick={showFormCreate}
        />
      </h3>
      <div className="shoppingListMainContainer">
        {products?.length ? (
          products.map((product, i) => (
            <ProductCard
              key={i}
              info={product}
              handleEdit={showFormEdit}
              handleDelete={deleteProduct}
            />
          ))
        ) : (
          <h5 className="noData">Shoping list is empty</h5>
        )}
      </div>
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
