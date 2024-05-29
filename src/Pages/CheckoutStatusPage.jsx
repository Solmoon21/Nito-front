import useAuth from '../Hooks/useAuth'
import { Container, Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';

import { clearCart } from '../api/user_api';

export const CheckoutStatusPage = ({ success }) => {
    const { auth } = useAuth()
        
    if(success) clearCart(auth.id);
    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Card>
            <CardContent>
              {success ? (
                <Box textAlign="center">
                  <CheckCircle color="success" sx={{ fontSize: 60 }} />
                  <Typography variant="h4" gutterBottom>
                    Payment Successful
                  </Typography>
                  <Typography variant="body1">
                    Your order is on the way.
                  </Typography>
                </Box>
              ) : (
                <Box textAlign="center">
                  <Error color="error" sx={{ fontSize: 60 }} />
                  <Typography variant="h4" gutterBottom>
                    Payment Failed
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    There was an issue processing your payment. Please try again.
                  </Typography>
                  <CardMedia
                    component="iframe"
                    height="315"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      );
}
