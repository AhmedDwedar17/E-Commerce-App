import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';

const AllOrders = () => {

    const userId =  jwtDecode(localStorage.getItem("userToken")).id;
    const [allData, setAllData] = useState(null)

    async function getAllOrders(){
        try {

            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
            console.log(data);
            setAllData(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(function(){
        getAllOrders()
    },[])
  return (
    <div className='container py-5'>
      <div className="row g-3">

        {allData ? allData.map((order, idx) => <div key={idx} className="col-md-6">
            <div className="inner p-3 bg-main rounded-2">
                <p className='text-white'>Details: {order.shippingAddress.details}</p>
                <p className='text-white'>City: {order.shippingAddress.city}</p>
                <p className='text-white'>Phone: {order.shippingAddress.phone}</p>
                <p className='text-white'>Payment Method type: {order.paymentMethodType}</p>
                <div className="row">
                {order.cartItems.map((item) => <div className="col-md-4">
                    <div>
                        <img src={item.product.imageCover} className='w-100' alt="" />
                        <h6 className='text-white'>{item.product.title.split(" ").slice(0.2).join(" ")}</h6>
                    </div>
                </div>)}
            </div>
            </div>

        </div>): <div className="vh-100 d-flex justify-content-center align-items-center">
            <InfinitySpin
                visible={true}
                width="200"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
            />
    </div> }

      </div>
    </div>
  )
}

export default AllOrders
