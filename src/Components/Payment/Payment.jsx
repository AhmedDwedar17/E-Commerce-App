import axios from 'axios'
import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/Cart'
import { useNavigate } from 'react-router-dom'

export default function Payment() {

const [phone, setPhone] = useState("")
const [city, setCity] = useState("")
const [details, setDetails] = useState("")
const {cartId, setNumOfItems, setProducts, setTotalPrice} = useContext(cartContext)
const nav =  useNavigate()



async function cashPayment(){
    
    let formData = {
        shippingAddress:{
            details: details,
            phone: phone,
            city: city
            }
    };

    try {
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, formData, {
            headers: {token: localStorage.getItem("userToken")}
        });
        if(data.status === "success"){
            setTotalPrice(0);
            setProducts([]);
            setNumOfItems(0);
            nav("/allorders");
        }

        return data
    } catch (error) {
        console.log(error);
    }

}

async function onlinePayment(){
    let formData = {
        shippingAddress:{
            details: details,
            phone: phone,
            city: city
            }
    };
    try {
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,formData, {
            headers : {token: localStorage.getItem("userToken")},
            params: {
                url:"http://localhost:3000",
            }
        } )

        if(data.status === "success"){
            window.open(data.session.url)
        }
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className='w-50 m-auto'>
        <label htmlFor="city">City</label>
        <input className='form-control my-3' onChange={function(e){
            setCity(e.target.value)
        }} type="text" id='city' name='city' className='form-control my-3' />
        <label htmlFor="phone">Phone</label>
        <input className='-control my-3' onChange={function(e){
            setPhone(e.target.value)
        }} type="tel" id='phone' name='phone' className='form-control my-3' />
        <label htmlFor="details">Details</label>
        <textarea onChange={function(e){
            setDetails(e.target.value)
        }} id='details' name='details' className='form-control my-3'></textarea>
        <button onClick={cashPayment} className='btn btn-info'>Cash Payment</button>
        <button onClick={onlinePayment} className='btn btn-warning mx-3'>Online Payment</button>
    </div>
  )
}
