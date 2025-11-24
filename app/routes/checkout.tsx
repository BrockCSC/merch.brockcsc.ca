import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '~/components/Checkout/Checkout';
import { useEffect, useState } from 'react';
import { data } from 'react-router';

export default function CheckoutRoute() {
  const stripePromise = loadStripe(
    'pk_live_51SPYUmDKE3K4RyLK3etexVTMhi70dd9zd3q5IIEobhRvFU8qTjSgGB5w2C7cm4sq5zhohbUufsYB14z3PMl7Gt2Q00G61mdg2k'
  );

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://merch-backend.brockcsc.workers.dev/', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => setClientSecret(data.clientSecret));
    console.log(data);
  }, []);
  console.log(clientSecret);
  //if (!clientSecret) return <p>Loading payment info...</p>;

  return (
    // <Elements stripe={stripePromise} options={{ clientSecret }}>
    <Checkout />
    // </Elements>
  );
}
