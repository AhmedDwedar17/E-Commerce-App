// import axios from "axios";
// import { createContext, useState } from "react";
// import toast from "react-hot-toast";


// let headers = {
//     token: localStorage.getItem("userToken")
// }


// function addToCart(id){
//     return  axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
//         productId:id
//     }, {
//         headers
//     }).then((data)=>{
//         toast.success('Added Successfully')
//         if(data.status == "success"){
//             setNumOfItems(data.numOfCartItems)
//             // setProducts()
//             setTotalPrice(data.data.totalCartPrice)
//         }
//     }).catch((err)=>{
//         toast.error("This didn't work.")
//     })
    
// }

// export let cartContext =  createContext();
// export default function CartContextProvider(props){
//     const [numOfItems, setNumOfItems] = useState(0)
//         const [totalPrice, setTotalPrice] = useState(0)
//         const [products, setProducts] = useState(null)
//     return <cartContext.Provider value={{addToCart, numOfItems}}>
//         {props.children}
//     </cartContext.Provider>
// }