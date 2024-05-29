import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Rating } from '@mui/material';
import './Reviews.css';

import { submitReview } from '../../api/product_api';
import useAuth from '../../Hooks/useAuth';
import useReviews from '../../Hooks/useReviews';
import { useNotification } from '../../Hooks/useNotification';


function Reviews() {
    const { auth } = useAuth();
    const {notify, NotificationTypes} = useNotification()


    const params = useParams();
    const productID = params.productID;

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const handleSubmit = async () => {
        const respone = await submitReview(auth?.firstname, auth?.id, productID, review, rating)
        if(respone.success) {
            notify(NotificationTypes.SUCCESS, respone.message)
        }
        else {
            notify(NotificationTypes.ERROR, respone.message)
        }

    }

    const reviews = useReviews(productID);

  return (
        <div className='section-reviews'>
            <h2 className='review-title'>Reviews</h2>
            <hr />
            {reviews.length > 0 
            ?
                <ul className="review-list">
                    {reviews.map( (review,idx) => {
                        return (
                            <li className="review" key={idx}>
                                <h3 className='review-username'>{review.name}</h3>
                                <p className='review-text'>
                                    {review.text}
                                </p>
                                <ul className="review-stars">
                                    <Rating value={review.rating}  readOnly/>
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            :
            <div>No Reviews Yet</div>
            }
            {!auth?.isMerchant &&
                <>
                    <label>
                    Write Review:
                    <Rating
                        name="user-input-rating"
                        value={Number(rating)}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                    <textarea name="review" 
                        value={review} 
                        onChange={(e) => setReview(e.target.value)} 
                        className="form-control" 
                    />
                    </label>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Write</button>
                </>
            }
        </div>
  )
}

export default Reviews