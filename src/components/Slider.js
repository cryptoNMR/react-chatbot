import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../App.css'

export default function Slider() {
  return (
    <Carousel pause="hover" className="bg-dark">
      <Carousel.Item>
        <img src="/images/first.jpg" alt="" fluid />
        <Carousel.Caption className="carousel-caption">
          <h2>Welcome to Talk chatgpt</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/images/second.jpg" alt="" fluid />
        <Carousel.Caption className="carousel-caption">
          <h2>Lets Explore chatgpt</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/images/third.jpg" alt="" fluid />
        <Carousel.Caption className="carousel-caption">
          <h2>Have Great Day !</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
