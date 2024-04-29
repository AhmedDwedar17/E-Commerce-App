import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { InfinitySpin, RotatingLines, RotatingTriangles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/Cart';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    const [details, setDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [Loading, setLoading] = useState(false)

    // let {addToCart} = useContext(cartContext);
    // console.log(addToCart);

    // function addCart(id){
    //     addToCart(id)
    // }

    let {addProductToCart} =  useContext(cartContext);
    console.log(addProductToCart);

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



    let {id} = useParams()

    async function getDetails(id){
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products/'+id)
        setDetails(data.data)
        setIsLoading(false)
    }

    useEffect(() => {
        getDetails(id)
    }, [])
    


    // let {data, isLoading, isFetching} = useQuery("productDetails", ()=>getDetails(id))
  return (
    <>
      <div className="container">
        {isLoading?<InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
        wrapperClass="d-flex justify-content-center align-items-center"
        />:<div className="row align-items-center">
            <div className="col-md-4">
                <img src={details.imageCover} className='w-100' alt="" />
            </div>
            <div className="col-md-8">
                <h3>{details.title}</h3>
                <p className='text-secondary'>{details.description}</p>
                <p>{details.category.name}</p>
                <div className="d-flex justify-content-between">
                    <p>{details.price}  EGP</p>
                    <p><i className='fa fa-star rating-color'></i>{details.ratingsAverage}</p>
                </div>
                {/* onClick={()=>addCart(details.id)} */}
                <button onClick={function (){
                  addProduct(details.id)
                }} className='btn bg-main text-white w-100'> {Loading? <RotatingTriangles
                  visible={true}
                  height="30"
                  width="30"
                  color="#4fa94d"
                  ariaLabel="rotating-triangles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  /> : "+ Add To Cart"}</button>
            </div>
        </div>}

      </div>
    </>
  )
}
