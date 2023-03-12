import React from "react";
import { useState, useEffect } from "react";
import { Footer } from "../components";
import { useSelector } from "react-redux";
import OrderService from "../services/order.service";
import { Link } from "react-router-dom";
import CartService from "../services/cart.service";
import store from '../redux/store';
import Address from "../models/address";
import {  useNavigate } from "react-router-dom";



const Checkout = () => {
  const navigate = useNavigate();
  const [state,setState] = useState([]);
  const [address,setAddress] = useState(new Address('','','','',''));
  const currentUser = store.getState().user;

  useEffect(() => {
    CartService.getMyCart(currentUser.id).then((response) => {
      setState(response.data);
      });
  }, []);

  const handleChange = (e)=>{
    const {name,value} = e.target;
        setAddress(prevState=>{
            return{
                ...prevState , 
                [name]:value
            };
        });
    }

  const handleAddress=(e)=>{
    e.preventDefault();
    OrderService.saveOrder(currentUser.id,address).then((resp)=>{
      console.log("Birth Of Order");
      CartService.emptyMyCart(currentUser.id).then(()=>{
        console.log("Death Of Cart");
        navigate("/");
      })
    })

    alert("Order Placed");
  }

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 40;
    let totalItems = 0;
    state.cartItems.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.cartItems.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
    
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {
                        state.cartItems.map((item,index)=>{
                          return(<li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            {index+1})  {item.productId.name} x {item.quantity}  <span>Rs {item.totalPrice}</span>
                          </li>)
                        })
                      }
                      
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>Rs {shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>Rs {parseInt(state.totalPrice) + shipping}</strong>
                        </span>
                      </li>
                    </ul>
                  </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form className="needs-validation" novalidate  onSubmit={(e) => handleAddress(e)}>
                    <div className="row g-3">
                      
                      

                      <div className="col-12 my-1">
                        <label for="adressLine1" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="adressLine1"
                          name="adressLine1"
                          placeholder="1234 Main St"
                          value={address.adressLine1}
                          required
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>

                      <div className="col-12">
                        <label for="adressLine2" className="form-label">
                          Address 2
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="adressLine2"
                          name="adressLine2"
                          placeholder="Apartment or suite"
                          value={address.adressLine2}
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-12">
                        <label for="city" className="form-label">
                          City 
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          placeholder="City"
                          value={address.city}
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-5 my-1">
                        <label for="state" className="form-label">
                          State 
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          name="state"
                          placeholder="State"
                          value={address.state}
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-3 my-1">
                        <label for="zipCode" className="form-label">
                          Zip
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zipCode"
                          name="zipCode"
                          placeholder="Zip Code"
                          value={address.zipCode}
                          required
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>

                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label for="cc-name" className="form-label">
                          Name on card
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-name"
                          placeholder=""
                          required
                        />
                        <small className="text-muted">
                          Full name as displayed on card
                        </small>
                        <div className="invalid-feedback">
                          Name on card is required
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label for="cc-number" className="form-label">
                          Credit card number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-number"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Credit card number is required
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label for="cc-expiration" className="form-label">
                          Expiration
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-expiration"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Expiration date required
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label for="cc-cvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-cvv"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Security code required
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <button
                      className="w-100 btn btn-primary "
                      type="submit">Place Order
                    </button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
     
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.totalItems > 0 ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;




