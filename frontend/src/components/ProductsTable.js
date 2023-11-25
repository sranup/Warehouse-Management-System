import React, { useState } from "react";
import axios from "axios";
import PaginationComponent from "./Pagination";
import { useDispatch } from "react-redux";



import { asyncGetProduct } from "../action/productAction";
import { asyncProductToShipment } from "../action/productAction";

const ProductsTable = (props) => {
  
  const {
    categoriesData,
    productsData,
    handleRemove,
    handleEdit,
  } = props;

  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [deletedProducts, setDeletedProducts] = useState([]);

  const dispatch = useDispatch();

  const handleProductEdit = (id) => {
    handleEdit(id);
  };

  const handleProductToShipment = (id) => {
       dispatch(asyncProductToShipment(id))

  };

  const showDeletedProducts = () => {
    axios
      .get("http://localhost:3100/wms/deletedProducts", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const deletedData = response.data;
        if (deletedData.hasOwnProperty("errors")) {
          alert(deletedData.message);
        } else {
          setDeletedProducts(deletedData);
        }
        //console.log('deleted products',response.data)
      })
      .catch((err) => {
        alert(err.message);
      });
  };


  const handleProductRemove = (id) => {
    handleRemove(id);
  };



const handleRestore=(id)=>{
    console.log('restore id',id)
    axios.get(`http://localhost:3100/wms/restoreProducts/${id}`,{
        headers:{
            "Authorization":localStorage.getItem("token")
        }
    })
    .then((response)=>{
        console.log('restore',response.data)
        const restoredData=response.data
        const filteredData=deletedProducts.filter((ele)=>ele._id==restoredData._id)
       
        if(restoredData.hasOwnProperty('errors')){
           alert(restoredData.message)
        }else{
            setDeletedProducts(filteredData)
            dispatch(asyncGetProduct())
        }
    })
    .catch((err)=>{
        alert(err.message)
    })
}

  const handleHardDelete = (id) => {
    axios
      .delete(`http://localhost:3100/wms/permanentDeleteProduct/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const deletedData = response.data;
        const filteredData = deletedProducts.filter(
          (ele) => ele._id !== deletedData._id
        );
        if (deletedData.hasOwnProperty("errors")) {
          alert(deletedData.message);
        } else {
          setDeletedProducts(filteredData);
        }
      })
      .catch((err) => {
        alert(err.response.data.errors);
        
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //Pagination Calculation
  const totalPages = productsData.length / itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="d-flex mb-3">
        <button
          type="button"
          className="btn btn-primary ms-2 p-2"
          data-bs-toggle="modal"
          data-bs-target="#expenseModal"
          style={{ width: "10rem" }}
        >
          Add Product
        </button>
        <button
          type="button"
          className="btn btn-secondary p-2 ms-2"
          data-bs-toggle="modal"
          data-bs-target="#deletedExpenseModal"
          onClick={showDeletedProducts}
        >
          Show Deleted Products
        </button>
        <input
          className="form-control ms-auto p-2 me-2"
          type="text"
          placeholder="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div
        class="modal fade"
        id="deletedExpenseModal"
        tabindex="-1"
        aria-labelledby="deletedExpenseModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="deletedExpenseModalLabel">
                Deleted Products
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="mt-3 table-wrapper-scroll-y my-custom-scrollbar">
                {deletedProducts.length == 0 ? (
                  <h4 className="d-flex justify-content-center">
                    deleted records not found
                  </h4>
                ) : (
                  <table>
                    <thead className="table-dark thead-light thead-fixed">
                      <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Deleted Time</th>
                        <th>Restore</th>
                        <th>Delete Permanantly</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deletedProducts.map((data) => {
                        return (
                          <tr key={data._id}>
                            <td>{data.name}</td>
                            <td>{data.amount}</td>
                            <td>{data.updatedAt.slice(0, 10)}</td>
                            <td>{data.updatedAt.slice(11, 19)}</td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => handleRestore(data._id)}
                              >
                                Restore
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => handleHardDelete(data._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
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
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        {productsData.length == 0 ? (
          <h3 className="d-flex justify-content-center">
            No products found. Add your first product
          </h3>
        ) : (
          <table className="table table-bordered table-hover table-striped mb-0">
            <thead className="table-dark thead-light thead-fixed">
              <tr>
                <th>Edit</th>
                <th>Category</th>
                <th>Item Name</th>
                <th>Amount</th>
                <th>Quantity</th>
                <th>Delete</th>
                <th>Move to Shipment</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.filter((ele)=>(ele.name.toLowerCase().includes(input))).map((product) => {
                return (
                  <tr key={product._id}>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        onClick={() => {
                          handleProductEdit(product._id);
                        }}
                      >
                        edit
                      </button>
                    </td>
                    <td>
                      {categoriesData
                        .filter((ele) => ele._id == product.categoryId)
                        .map((cat) => cat.name)}
                    </td>
                    <td>{product.name}</td>
                    <td>{product.amount}</td>
                    <td>{product.prodQuantity}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleProductRemove(product._id)}
                      >
                        remove
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleProductToShipment(product._id)}
                      >
                        Move
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div class="card-title d-flex justify-content-end mt-3">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductsTable;
