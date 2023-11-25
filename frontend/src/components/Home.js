import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import DonutChart from "react-donut-chart";


import { asyncGetCategories } from "../action/categoryAction";

import { asyncAddProduct, asyncEditProduct, asyncGetProduct, asyncProductToShipment, asyncRemoveProduct } from "../action/productAction";
import ProductsTable from "./ProductsTable";

const Home = (props) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [prodQuantity, setProdQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const dispatch = useDispatch();

  const data = {
    name,
    amount,
    description,
    prodQuantity,
    categoryId: category,
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();

    console.log("product data", data);
    dispatch(asyncAddProduct(data));
    setIsSaved(true);
  };

  useEffect(() => {
    dispatch(asyncGetCategories());
    dispatch(asyncGetProduct());
   
  }, [dispatch]);

  const categoriesData = useSelector((state) => {
    return state.categories;
  });

  
  const productsData = useSelector((state) => {
    return state.products;
  });

  const budgetData = useSelector((state) => {
    return state.budget;
  });

  const shipmentDetails=useSelector((state)=>{
    return state.shipments
  })

  console.log('ship',shipmentDetails.length)

  //Donut Chart Data

  const values = productsData.length
  const total = shipmentDetails.length;
  const percentage = (values / total) * 100;

  const handleRemove = (id) => {
    console.log("product remove id", id);
    
    const confirmRemove=window.confirm('Are you sure?')
    if(confirmRemove){
      dispatch(asyncRemoveProduct(id))
    }
  };

  const handleEdit = (id) => {
    //console.log("edit id", id);
    const data = productsData.find((ele) => ele._id == id);
    setName(data.name);
    setAmount(data.amount);
    setDescription(data.description);
    setProdQuantity(data.prodQuantity);
    setProductId(data._id);
  };

  const handleUpdateProduct = () => {
    dispatch(asyncEditProduct(productId, data));
    setIsSaved(true);
  };



  //Pie Chart Data
  const categoriesExpenses = productsData.reduce((groups, expense) => {
    const category = expense.categoryId;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(expense);
    return groups;
  }, {});

  const chartData = [["Category", "amount"]];

  Object.entries(categoriesExpenses).map(([category, expenses]) => {
    chartData.push([
      String(
        categoriesData
          .filter((cat) => cat._id === category)
          .map((ele) => ele.name)
      ),
      expenses.reduce((a, b) => a + Number(b.amount), 0),
    ]);
  });

  useEffect(() => {
    if (isSaved) {
      setName("");
      setAmount("");
      setDescription("");
      setProdQuantity("");
      setCategory("");
    }
  }, [isSaved]);

  return (
    <div className="row mt-5">
      <div className="col-md-12 d-flex justify-content-center mt-5">
        <div className="card text-center" style={{ width: "75rem" }}>
          <div className="card-header">
            <h4>Product Page</h4>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-around">
              <div className="card ms-5" style={{ width: "25rem" }}>
                <div className="card-header">Product-Shipment Overview</div>
                <div className="card-body">
                  <DonutChart
                    data={[
                      {
                        value:total,
                        label: "shipment",
                        isEmpty:false
                      },
                      {
                        label: "products",
                        value: values,
                        isEmpty: false,
                      },
                    ]}
                    height={200}
                    width={300}
                    innerRadius={0.5}
                    outerRadius={0.8}
                    colors={["#607d8b"]}
                    formatValues={(percentage) => `${percentage.toFixed(2)}%`}
                  />
                
                </div>
              </div>
             
            </div>
          </div>
          <div>
            <div
              className="modal fade"
              id="expenseModal"
              aria-labelledby="expenseModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="expenseModalLabel">
                      Enter Product Details
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div style={{ width: "28rem" }}>
                      <div className="mt-2">
                        <label className="d-flex justify-content-left">
                          Name:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mt-2">
                        <label className="d-flex justify-content-left">
                          Price:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                      <div className="mt-2">
                        <label className="d-flex justify-content-left">
                          Description:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="mt-2">
                        <label className="d-flex justify-content-left">
                          Quantity:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={prodQuantity}
                          onChange={(e) => setProdQuantity(e.target.value)}
                        />
                      </div>
                      <div className="mt-2">
                        <div className="d-flex justify-content-left mt-2">
                          <label>Category:</label>
                          <select
                            className="ms-2"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">select category</option>
                            {categoriesData.map((category) => {
                              return (
                                <option key={category._id} value={category._id}>
                                  {category.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={handleSaveProduct}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="editModal"
              tabindex="-1"
              aria-labelledby="editModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editModalLabel">
                      Modal title
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div style={{ width: "28rem" }}>
                      <div className="mt-2">
                        <label className="d-flex justify-content-left">
                          Name:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="d-flex justify-content-left">
                          Amount:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="d-flex justify-content-left">
                          Description:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="d-flex justify-content-left">
                          Quantity:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={prodQuantity}
                          onChange={(e) => setProdQuantity(e.target.value)}
                        />
                      </div>
                      <div className="mt-2">
                        <div className="d-flex justify-content-left mt-2">
                          <label>Category:</label>
                          <select
                            className="ms-2"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">select category</option>
                            {categoriesData.map((category) => {
                              return (
                                <option key={category._id} value={category._id}>
                                  {category.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={handleUpdateProduct}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductsTable
            categoriesData={categoriesData}
            productsData={productsData}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
           // handleProductMoveToShipment={handleProductMoveToShipment}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
