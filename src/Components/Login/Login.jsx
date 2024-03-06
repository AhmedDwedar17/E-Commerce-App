import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import {  useFormik } from 'formik'
import { tokenContext } from '../../Context/TokenContext';

export default function Login() {
    let {token, setToken} = useContext(tokenContext);
    const [userMessage, setUserMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let navigate =  useNavigate()


    let mySchema = Yup.object(
        {
            email: Yup.string().email("Email Is Not Valid").required("Email Is Required"),
            password: Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must start with capital letter"),
        }
    )

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema:mySchema,
        onSubmit: (values)=>{
            formLogin(values)
        }
    })
    
    async function formLogin(values){
        setIsLoading(true)
        return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((data)=>{
            if(data.data.message === "success"){
                localStorage.setItem("userToken", data.data.token)
                setToken(data.data.token)
                setUserMessage(data.data.message)
                navigate("/")
                setIsLoading(false)
            }
        }).catch((err)=>{
            setErrorMessage(err.response.data.message);
            setIsLoading(false)
        })
    }

  return (
    <>
    <div className="container">
      <div className="w-75 mx-auto">
          <form onSubmit={formik.handleSubmit}>
          <h2>Login Now</h2>
          {userMessage? <div className='alert alert-success'>{userMessage}</div>: " "}
          {errorMessage? <div className='alert alert-danger'>{errorMessage}</div>: ""}
          <label htmlFor="email">Email :</label>
          <input type="email" name='email' id='email' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email}/>
          {formik.touched.email && formik.errors.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}
          <label htmlFor="password">Password :</label>
          <input type="password" name='password' id='password' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password}/>
          {formik.touched.password && formik.errors.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}
          {isLoading? <button type='submit' className='btn bg-main text-white'><i className='fa fa-spin fa-spinner'></i></button>: <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>}
          </form>
      </div>
    </div>
  </>
  )
}
