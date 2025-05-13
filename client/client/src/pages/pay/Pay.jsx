import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { axiosFetch } from '../../utils';
import { CheckoutForm } from '../../components';
import './Pay.scss';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Pay = () => {
  const { _id } = useParams();
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosFetch.post(`/orders/create-payment-intent/${_id}`);
        setClientSecret(data.clientSecret);
        setError(null);
      } catch({ response }) {
        setError(response?.data?.message || 'Failed to initialize payment');
        console.error(response);
      } finally {
        setIsLoading(false);
      }
    })();
    window.scrollTo(0, 0);
  }, [_id]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#1dbf73',
      colorBackground: '#f8f9fa',
      colorText: '#404145',
      fontFamily: 'inherit',
    },
    rules: {
      '.Input': {
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '12px',
        boxShadow: 'none',
      },
      '.Input:focus': {
        borderColor: '#1dbf73',
        boxShadow: '0 0 0 1px #1dbf73',
      }
    }
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='pay'>
      <div className="payment-container">
        <h2 className="payment-title">Secure Payment</h2>
        <p className="payment-subtitle">Complete your purchase with Stripe</p>
        
        {isLoading ? (
          <div className="loading-animation">
            <div className="spinner"></div>
            <p>Preparing secure payment...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="#e74c3c" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <p>{error}</p>
          </div>
        ) : clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        ) : null}
      </div>
    </div>
  )
}

export default Pay;