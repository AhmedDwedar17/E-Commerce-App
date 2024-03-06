import React from 'react'
import img1 from "../../assets/slider-image-1.jpeg"
import img2 from "../../assets/slider-image-3.jpeg"
import main1 from "../../assets/slider-image-3.jpeg"
import main2 from "../../assets/slider-image-2.jpeg"
import Slider from 'react-slick'

export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows:false
      };


  return (
    <>
      <div className="container py-5">
        <div className="row gx-0">
            <div className="col-md-9">
            <Slider {...settings}>
                <img src={img1} className='w-100' height={400} alt="" />
                <img src={img2} className='w-100' height={400} alt="" />
                
            </Slider>
            </div>
            <div className="col-md-3">
                <img src={main1} className='w-100' height={200} alt="" />
                <img src={main2} className='w-100' height={200} alt="" />
            </div>
        </div>
      </div>
    </>
  )
}
