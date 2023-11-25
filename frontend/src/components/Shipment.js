import React,{useEffect,useState} from "react";
import axios from "axios";
import PaginationComponent from "./Pagination";
import { useDispatch,useSelector } from "react-redux";
import { asyncShipmentDetails } from "../action/shipmentAction";

const Shipment=(props)=>{
    const [customerName,setCustomerName]=useState('')
    const [customerEmail,setCustomerEmail]=useState('')
    const [customerAddress,setCustomerAddress]=useState('')
    const [customerPhoneNo,setCustomerPhoneNo]=useState('')
    const [docketNo,setDocketNo]=useState('')
    const [shipmentId,setShipmentId]=useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const dispatch=useDispatch()

    useEffect(() => {
       
        dispatch(asyncShipmentDetails())
        
    }, []);

    const shipmentDetails=useSelector((state)=>{
       return state.shipments
    })

    const handlePageChange = (page) => {
        setCurrentPage(page)

    }

    //Pagination Calculation
    const totalPages = shipmentDetails.length / itemsPerPage
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = shipmentDetails.slice(indexOfFirstItem, indexOfLastItem)

    const handleFormData=async ()=>{
        const formData={
            docketNo:docketNo,
            customer:{
                name:customerName,
                email:customerEmail,
                address:customerAddress,
                phoneNo:customerPhoneNo
            }
        }

       // console.log('shipment form',formData,shipmentId)
       const response=await axios.put(`http://localhost:3100/wms/shipments/${shipmentId}`,formData,{
        headers:{
            'Authorization':localStorage.getItem('token')
        }
       })
       //console.log('shipment axios',response.data)
       alert('order placed successfully')

    }
    

    
    return(
      <div>
      <div  style={{marginTop:'200px',backgroundColor:'white'}}>
           {
             shipmentDetails.length == 0 ? (
                  <h3 className='d-flex justify-content-center'>No shipments found</h3>
              ) : (
                  <table className='table table-bordered table-hover table-striped mb-0'>
                      <thead className="table-dark thead-light thead-fixed">
                          <tr>
                             
                              <th>Item Name</th>
                              <th>Amount</th>
                              <th>Quantity</th>
                              <th>Add customer details</th>
                          </tr>
                      </thead>
                      <tbody>
                         
                         {shipmentDetails.map((shipment)=>{
                             return(
                              <tr key={shipment._id}>
                                 
                                 
                                  <td>{shipment.product.name}</td>
                                  <td>{shipment.product.amount}</td>
                                  <td>{shipment.product.prodQuantity}</td>
                                  <td> <button type="button" className='btn btn-secondary p-2 ms-2' data-bs-toggle="modal" data-bs-target="#deletedExpenseModal" onClick={()=>setShipmentId(shipment._id)} >enter</button></td>
                                 


                              </tr>
                             )
                         })}
                      </tbody>
                  </table>
              )
          }
           <div class="modal fade" id="deletedExpenseModal" tabindex="-1" aria-labelledby="deletedExpenseModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h1 class="modal-title fs-5" id="deletedExpenseModalLabel">Customer Details</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label className="d-flex justify-content-left">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label className="d-flex justify-content-left">
                    Phone No
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={customerPhoneNo}
                    onChange={(e) => setCustomerPhoneNo(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label className="d-flex justify-content-left">
                    Address
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <label className="d-flex justify-content-left">
                    Docket No
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={docketNo}
                    onChange={(e) => setDocketNo(e.target.value)}
                  />
                </div>
               
              </div>
                  </div>
                  <div class="modal-footer">
                  <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleFormData}
                
              >
                update
              </button>
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                      
                  </div>
              </div>
          </div>
      </div>

      </div>
      <div class="card-title d-flex justify-content-end mt-3">
          <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
          />
      </div>
  </div>
    )

}

export default Shipment