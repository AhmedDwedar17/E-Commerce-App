import React, { useContext } from 'react'
import { cartContext } from '../../Context/Cart'
import { InfinitySpin } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {
  const {numOfItems, totalPrice, products, removeItem, updateCountProduct, clearCart} = useContext(cartContext)


  async function remove(id){
    const res = await removeItem(id)
    if (res.status === "success"){
      toast.success("Item Removed Successfully")
    }else{
      toast.error("This didn't work.")
    }
  }

  async function update(id, count){
    const res = await updateCountProduct(id, count)
    if (res.status === "success"){
      toast.success("Count Updated Successfully")
    }else{
      toast.error("This didn't work.")
    }
  }

  async function clear(){
   await clearCart()
  }

  if(products == null){

    return <>
    <div className="vh-100 d-flex justify-content-center align-items-center">
    <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
        />
    </div>
    </>
  }

  if(products.length === 0){

    return <>
    <div className="vh-100 d-flex justify-content-center align-items-center">
    <h2>No Data To Display</h2>
    </div>
    </>
  }

  return (
    <div style={{backgroundColor: "#eee"}} className='container py-5'>
      <h2> Shop Cart: </h2>
      <h3 className='text-success'>{totalPrice}</h3>
      <button onClick={clear} className='btn btn-warning my-3'>Clear Cart</button>
      <Link to={"/payment"} className='btn btn-primary mx-3 my-3'>Payment</Link>
      {products?.map(function(product, idx){return <div key={idx} className="row g-3 border-bottom border-1 py-3 align-items-center">
        <div className="col-sm-1">
          <img src={product.product.imageCover} className='w-100' alt="" />
        </div>
        <div className="col-sm-8">
          <div>
            <h5>{product.product.title}</h5>
            <h6>{product.price} EGP</h6>
            <button onClick={()=>{remove(product.product.id)}} className='btn btn-danger'>Remove</button>
          </div>
        </div>
        <div className="col-sm-3">
        <div className="d-flex align-items-center">
          <button onClick={function(){
            update(product.product.id , product.count +1)
          }} className='btn btn-outline-success'>+</button>
          <span className='mx-2'>{product.count}</span>
          {product.count <= 0 ? (<button onClick={()=>{remove(product.product.id)}} className='btn btn-outline-danger'>-</button>) :
          (<button onClick={()=>{update(product.product.id , product.count -1)}} className='btn btn-outline-danger'>-</button>)}
        </div>
        </div>
      </div>})}
      
    </div>
  )
}
