import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import './ProductCarousel.css';
import ProductCard from '../Product/ProductCard';


function ProductCarousel({products}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <>
      {products.length ?
        <Carousel className='custom-carousel'
          swipeable={false}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={false}
          
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {products.map((item,idx) => {
              item.id = idx;
              return <ProductCard product={item} key={item._id} />
            } 
          )}
        </Carousel>
        : ''
      }
    </>
  )
}

export default ProductCarousel