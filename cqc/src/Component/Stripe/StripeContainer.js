import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from "./PaymentForm"
import React from 'react'

const PUBLIC_STRIPE_KEY = "pk_test_51MUoM0IBwkQHJgoeJS6Xnmzih0QpRQeMn0XSiQ6Ngso4TPqaDkpYM3rALhytDPajo6IZnd5jdHOogmKY46oMuoFs00vVMFqmV8"
const stripeTestPromise = loadStripe(PUBLIC_STRIPE_KEY) 


export default function StripeContainer({ orders, loading, onResult, paymentAmount, userEmail }) {
    return (
        <Elements stripe={stripeTestPromise} >
            <PaymentForm loading={loading} onResult={onResult} paymentAmount={paymentAmount} userEmail={userEmail} />
        </Elements>
    )
}