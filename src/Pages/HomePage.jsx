import Hero from '../Components/Hero/Hero.jsx';
import ProductCarousel from '../Components/Carousel/ProductCarousel.jsx';
import Newsletter from '../Components/Newsletter/Newsletter.jsx';

import useRecommendations from '../Hooks/useRecommendations.jsx'

function HomePage() {
  const { recommendations } = useRecommendations();
  
  return (
    <>
        <Hero />
        {recommendations && <ProductCarousel products={recommendations} />}
        <Newsletter />
    </>
  )
}

export default HomePage