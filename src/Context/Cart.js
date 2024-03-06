import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";

export let headers = {
    token: localStorage.getItem("userToken")
}


export let cartContext = createContext()
export default function CartProvider(props){
    const [numOfItems, setNumOfItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [products, setProducts] = useState(null)
    const [cartId, setCartId] = useState("")
    


    useEffect(function() {
        getUserCart()
    } , [])


    async function addProductToCart(productId){
        try {
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
                productId: productId
            }, 
            {
                headers
            }
            );

            if(data.status === "success"){
                getUserCart()
            }
            return data
        } catch (err) {
            console.log(err)
        }
    }


    async function getUserCart(){
        try {
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
                headers
            })
            if(data.status === "success"){
                setNumOfItems(data.numOfCartItems);
                setProducts(data.data.products);
                setTotalPrice(data.data.totalCartPrice);
                setCartId(data.data._id)
            }
            return data
        } catch (error) {
            setProducts([]);
        }
    }


    async function removeItem(id){
        try {
        const {data}  =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers
        }
        )

        if(data.status === "success"){
            setNumOfItems(data.numOfCartItems);
            setProducts(data.data.products);
            setTotalPrice(data.data.totalCartPrice);
        }
        return data
        } catch (error) {
            
        }
    }

    async function updateCountProduct(id , count){
        try {
        const {data} =   await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {count: count}, {headers})

            if(data.status === "success"){
                setNumOfItems(data.numOfCartItems);
                setProducts(data.data.products);
                setTotalPrice(data.data.totalCartPrice);
            }

        return data
        } catch (error) {
            console.log(error);
        }
    }

    async function clearCart(){
        try {
        const {data} =   await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})

        if(data.message === "success"){
            setNumOfItems(0);
            setProducts([]);
            setTotalPrice(0);
        }


        return data
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <cartContext.Provider value={{cartId, clearCart, updateCountProduct, removeItem, addProductToCart, numOfItems, totalPrice, products, setNumOfItems, setProducts, setTotalPrice }}>
            {props.children}
        </cartContext.Provider>
    )
}