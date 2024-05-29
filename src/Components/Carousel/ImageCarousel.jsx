import { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Card sx={{ maxWidth: 600, position: 'relative' }}>
      <CardMedia
        component="img"
        sx={{ width:'400px', height:'450px', objectFit: 'cover' }}
        image={images[currentIndex]}
        alt={`carousel image ${currentIndex + 1}`}
      />
      <Box sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}>
        <IconButton onClick={handlePrevClick} sx={{ color: 'white', backgroundColor: '#808080' }}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Box>
      <Box sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}>
        <IconButton onClick={handleNextClick} sx={{ color: 'white', backgroundColor: '#808080' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ImageCarousel;
