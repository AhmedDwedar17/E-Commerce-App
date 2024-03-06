import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function Register() {
    const [userMessage, setUserMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    let navigate =  useNavigate()

    let mySchema = Yup.object(
        {
            name: Yup.string().required("name is required").min(5,"Min Is 5 Char").max(15,"Max Char Is 15"),
            email: Yup.string().email("Email Is Not Valid").required("Email Is Required"),
            password: Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must start with capital letter"),
            rePassword: Yup.string().required("Repassword Is Required").oneOf([Yup.ref("password")], "password not match"),
            phone: Yup.string().required("Phone Is required").matches(/^01[0125][0-9]{8}$/, "phone is not valid")
        }
    )

    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        validationSchema:mySchema,
        onSubmit: (values)=>{
            formRegister(values)
        }
    })

    async function formRegister(values){
        console.log(values);
        setIsLoading(true)
        return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((data)=>{
            console.log(data);
            if(data.data.message === "success"){
                setUserMessage(data.data.message)
                navigate("/login")
                setIsLoading(false)
            }
        }).catch((err)=>{
            console.log(err);
            setErrorMessage(err.response.data.message);
            setIsLoading(false)
        })
    }
  return (
    <>
      <div className="container">
        <div className="w-75 mx-auto">
            <form onSubmit={formik.handleSubmit}>
            <h2>Register Now</h2>
            {userMessage? <div className='alert alert-success'>{userMessage}</div>: " "}
            {errorMessage? <div className='alert alert-danger'>{errorMessage}</div>: ""}
            <label htmlFor="name">Name :</label>
            <input type="text" name='name' id='name' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
            {formik.touched.name && formik.errors.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ""}
            <label htmlFor="email">Email :</label>
            <input type="email" name='email' id='email' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email}/>
            {formik.touched.email && formik.errors.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}
            <label htmlFor="password">Password :</label>
            <input type="password" name='password' id='password' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password}/>
            {formik.touched.password && formik.errors.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}
            <label htmlFor="rePassword">RePassword :</label>
            <input type="password" name='rePassword' id='rePassword' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword}/>
            {formik.touched.rePassword && formik.errors.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ""}
            <label htmlFor="phone">Phone :</label>
            <input type="tel" name='phone' id='phone' className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone}/>
            {formik.touched.phone && formik.errors.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ""}
            {isLoading? <button type='submit' className='btn bg-main text-white'><i className='fa fa-spin fa-spinner'></i></button>: <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}
            </form>
        </div>
      </div>
    </>
  )
}
