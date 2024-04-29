import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/freshcart-logo.svg"
import { tokenContext } from '../../Context/TokenContext'
import { cartContext } from '../../Context/Cart'

export default function NavBar() {
  const {numOfItems}  = useContext(cartContext)
  let {token, setToken} = useContext(tokenContext)
  let navigate =  useNavigate()

  function logout(){
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="">
        <img src={logo} alt="" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link position-relative" to="cart">Cart 
          <span className="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-danger w-50 h-50">{numOfItems}
          <span className="visually-hidden">unread messages</span></span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="allorders">All Orders</Link>
        </li>
      </ul> : ""}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {token? <li className="nav-item">
          <button onClick={logout} className="nav-link" to="logout">Logout</button>
        </li> : <><li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
        </>}
        
        
      </ul>
    </div>
  </div>
</nav>
  )
}
