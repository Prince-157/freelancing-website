import Slider from 'react-slick';
import { PrevArrow, NextArrow } from '../../components'; // Make sure you have these arrows

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import './Slide.scss';

const Slide = ({ children, slidesToShow = 4 }) => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(3, slidesToShow),
          slidesToScroll: Math.min(3, slidesToShow),
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: Math.min(2, slidesToShow),
          slidesToScroll: Math.min(2, slidesToShow),
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="slide-Container">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
}

export default Slide;
