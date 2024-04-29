import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";

export default function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        arrows:false
      };


    function getCatSlider(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }


    let {data} = useQuery("catSlider", getCatSlider)

  return (
    <>
      <div className="container py-5">
        <h2>Shop Populer Categories</h2>
      <Slider {...settings}>
      {data?.data?.data.map((el)=> <>
        <img src={el.image} height={200} className='w-100' alt="" />
        <p>{el.name}</p>
        </>)}
    </Slider>
      </div>
    </>
  )
}
