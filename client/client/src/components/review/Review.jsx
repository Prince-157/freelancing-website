import { getCountryFlag } from '../../utils';
import { useState } from 'react';
import './Review.scss';

const Review = (props) => {
  const { review } = props;
  const country = getCountryFlag(review?.userID?.country);
  const [helpful, setHelpful] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleHelpful = (value) => {
    if (helpful === value) {
      setHelpful(null);
    } else {
      setHelpful(value);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <div className="review">
      <div className="user">
        <img
          className="pp"
          src={review.userID?.image || '/media/noavatar.png'}
          alt={review?.userID?.username || 'User'}
        />
        <div className="info">
          <span className="username">{review?.userID?.username}</span>
          <div className="country">
            <img
              src={country?.normal}
              alt={review?.userID?.country || 'Country'}
            />
            <span>{review?.userID?.country}</span>
          </div>
        </div>
      </div>
      <div className="stars">
        {new Array(review.star).fill(0).map((_, i) => (
          <img key={i} src="/media/star.png" alt="Star" className="star" />
        ))}
        <span className="rating">{review.star}</span>
      </div>
      <p className="description">{review.description}</p>
      <div className="helpful">
        <span>Was this review helpful?</span>
        <button 
          className={`like-btn ${helpful === true ? 'active' : ''}`}
          onClick={() => handleHelpful(true)}
          aria-label="Mark as helpful"
        >
          <img 
            src={helpful === true ? "/media/like-filled.png" : "/media/like.png"} 
            alt="Like" 
            className={isAnimating && helpful === true ? 'pulse' : ''}
          />
          <span>Yes</span>
        </button>
        <button 
          className={`dislike-btn ${helpful === false ? 'active' : ''}`}
          onClick={() => handleHelpful(false)}
          aria-label="Mark as not helpful"
        >
          <img 
            src={helpful === false ? "/media/dislike-filled.png" : "/media/dislike.png"} 
            alt="Dislike" 
            className={isAnimating && helpful === false ? 'pulse' : ''}
          />
          <span>No</span>
        </button>
      </div>
    </div>
  );
};

export default Review;