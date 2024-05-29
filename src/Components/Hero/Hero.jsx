import './Hero.css'

import background from '../../assets/web-images/hero-background.jpg';

function Hero() {
  return (
    <div className='hero'>
        <div className="hero-text">
            <h2>Welcome to our store</h2>
            <p>Explore our extensive collection of high-quality products, curated to suit every taste and preference. With our user-friendly interface, secure payment processes, and exceptional customer service, we aim to provide you with the best online shopping experience possible.</p>
        </div>
        <div className="hero-img">
            <img src={background} alt="" />
        </div>
    </div>
  )
}

export default Hero