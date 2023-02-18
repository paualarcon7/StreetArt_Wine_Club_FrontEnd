import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import '../WineDetailCard/WineDetailCard.css';
import NavigationBar from "../../Navbar/index";
import Banner from '../../Home/Banner/index';
import Footer from '../../Footer/index'
import { Loader } from '../../Loader/index'
import Swal from 'sweetalert2';
import { getDetail, addToCart, getReviews, loadingAction } from "../../../actions";
import ReviewsForm from "./Reviews/ReviewsForm";
import { useAuth0 } from "@auth0/auth0-react";
import ReviewsTemplate from "./Reviews/ReviewTemplate";
import { addUserCart, updateUserCart } from "../../../actions/userActions";

export default function Detail(props) {
  const { isLoading, isAuthenticated: auth, user, isAuthenticated } = useAuth0();
  const [cartQuantity, setCartQuantity] = useState(1);
  const cart = useSelector(state => state.products.cart)
  const reviews = useSelector(state => state.products.reviews)
  const dispatch = useDispatch()
  const idProduct = props.match.params.id
  const currentUser = useSelector((state) => state.users.userInfo)

  useEffect(() => {
    dispatch(loadingAction(true))
    dispatch(getDetail(idProduct))
    dispatch(loadingAction(true))
    dispatch(getReviews(idProduct));
  }, []);

  const wine = useSelector((state) => state.products.wineDetail);

  const addAlert = (cartQuantity, name) => {
    Swal.fire({
      title: "YOUR PRODUCT WAS ADDED",
      text: `You add ${name} \n Quantity Box ${cartQuantity}`,
      icon: 'success',
      timer: '4000',
      timerProgressBar: true,
      allowOutsideClick: true,
      confirmButtonColor: '#ffc107'
    })
  }
  const handleClick = (id, cartQuantity, name, price) => {
    if(!isAuthenticated) {
      dispatch(addToCart(id, cartQuantity));
      addAlert(cartQuantity, name);
    }
    if(isAuthenticated) {
      if(cart.some(el => el.id === id)){
        let updateWine = cart.find(el => el.id === id)
            dispatch(updateUserCart({
                userId: currentUser.id,
                totalPrice: price,
                quantity: updateWine.cartQuantity + parseInt(cartQuantity),
                email: user.email,
                productId: id,
            }))
            return addAlert(cartQuantity, name);
      }
      dispatch(addUserCart({
          userId: currentUser.id,
          totalPrice: price,
          quantity:cartQuantity,
          email: user.email,
          productId: id,
      }))
      addAlert(cartQuantity, name);
    }
  };

//   const addCart = (id, cartQuantity, name, price) => {
//     if(isAuthenticated){
//         if(cart.some(el => el.id === id)){
//             let updateWine = cart.find(el => el.id === id)
//             dispatch(updateUserCart({
//                 userId: currentUser.id,
//                 totalPrice: price,
//                 quantity: updateWine.cartQuantity + 1,
//                 email: user.email,
//                 productId: id,
//             }))
//             return addAlert(cartQuantity, name);
//         }
//          dispatch(addUserCart({
//           userId: currentUser.id,
//           totalPrice: price,
//           quantity:1,
//           email: user.email,
//           productId: id,
//         }))
//         addAlert(cartQuantity, name);
//       } 
//       if(!isAuthenticated) {
//         dispatch(addToCart(id, cartQuantity));
//         addAlert(cartQuantity, name);
//       }
// }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      {wine.name ? (<div className="container-fluid">
        <div><Banner /></div>
        <div><NavigationBar /></div>
        <div className="row" id="detail">
          {/* <!----cardl left---> */}
          <div className="col col-6">
            <div className="img-display">
              <div className="img-showcase">
                {/* <img src={wine.image} alt="imagen" className="imgWine"/> */}
                <img src={wine.image} alt="imagen" className="mx-auto d-block" id="img-detail" />
              </div>
            </div>
          </div>
          <div className="col col-6">
            <h1>{wine.name}</h1>
            <div className="product-price">
              <h2>Price: <span>${wine.price}</span></h2>
            </div>
            <div className="product-description">
              <ul>
                <li>Grapes: {wine.grapes.map(e => e.name + (",  "))} </li>
                <li>Winery: {wine.winery.map(e => e + (",  "))} </li>
                <li>Type: {wine.types.map(e => e.name + ("  "))}</li>
                <li>Regions: {wine.regions.map(e => e.name + (",  "))}</li>
                <li>State: {wine.states.map(e => e.name + ("  "))}</li>
                <li>Quantity: {wine.quantity}</li>
              </ul>
              <div className="input-cart">
                <label class="form-label" for="typeNumber">Number of boxes</label>
                <input type="number" id="typeNumber" class="form-control" placeholder="1" value={cartQuantity} onChange={e => setCartQuantity(e.target.value)} />
                <button type="button" id="button-cart" className="btn btn-warning btn-sm" onClick={() => handleClick(wine.id, cartQuantity, wine.name, wine.price)}>Add to cart <i class="bi bi-cart-check-fill"></i></button>

              </div>
            </div>
          </div>
          <div className="col col-12" id="description">
            <h3>About this wine:</h3>
            <p>{wine.details}</p>
          </div>
        </div>
        <div className="container">
          {auth ?
            <ReviewsForm idProduct={idProduct} />
            : <h3>You must be login to make a review</h3>}
        </div>
        <div className="col col-12 p-5" id="review">
          <h3>REVIEWS</h3>
        </div>
        {
          reviews?.map((review, index) => <ReviewsTemplate key={review.id} review={review} />)
        }
        <div className="col col-12">
          <Footer />
        </div>
      </div>
      ) : (
        <div className="container-fluid">
          <div><Banner /></div>
          <div><NavigationBar /></div>
          <Loader />
          <div className="col col-12">
            <Footer />
          </div>
        </div>
      )}


    </>
  )
}