import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { InfinitySpin, RotatingTriangles } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/Cart'
import toast from 'react-hot-toast'

export default function FeatureProducts() {
    const [Loading, setLoading] = useState(false)
    let {addProductToCart} =  useContext(cartContext);

    async function addProduct (id){
        setLoading(true)
      const res = await addProductToCart(id)
      if(res.status == "success"){
        toast.success("Product Added Successfully")
      }else{
        toast.error("This didn't work.")
      }
      setLoading(false)
    }
    // let {addToCart} = useContext(cartContext);
    // console.log(addToCart);

    // function addCart(id){
    //     addToCart(id)
    // }

    function getProducts(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }
    let {data, isLoading, isFetching} = useQuery("FeatureProducts", getProducts)
  return (
    
      <>
      <div className='container pt-5'>
        <div className="row">
        {isLoading? <div className="vh-100 d-flex justify-content-center align-items-center">
    <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
        />
    </div> :""}
        {data?.data?.data.map((el)=> <div key={el.id} className="col-md-2">
            <div className="product py-1 px-2">
                <Link to={'/details/' + el.id}>
                <img src={el.imageCover} className='w-100' alt="" />
                <p className='text-main'>{el.description.split(" ").slice(0,1).join(" ")}</p>
                <h5>{el.title.split(" ").slice(0,2).join(" ")}</h5>
                <div className="d-flex justify-content-between">
                    <p>{el.price} EGP</p>
                    <i className='fa fa-star rating-color'>{el.ratingsAverage}</i>
                </div>
                </Link>
                {/* onClick={()=>addCart(el.id)} */}
            <button onClick={function (){
                  addProduct(el.id)
                }} className='btn bg-main text-white'>{Loading? <RotatingTriangles
                    visible={true}
                    height="30"
                    width="30"
                    color="#4fa94d"
                    ariaLabel="rotating-triangles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    /> : "+ Add To Cart"}</button>
            </div>
        </div>)}
    </div>
      </div>
      </>
    
  )
}
