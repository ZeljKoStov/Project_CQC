import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm({ loading, onResult , paymentAmount, userEmail}) {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        loading(true)

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if(!error){
            try {
                const {id} = paymentMethod
                const response = await axios.post("https://intrinsic-backend.xyz/users/payment", { //TODO
                    amount: paymentAmount,
                    id: id,
                    email: userEmail
                })

                loading(false)

                if(response.data.success) {
                    onResult(true)
                } else {
                    onResult(false)
                }
                
            } catch (error) {
                console.log("Error", error)
                onResult(false)
            }
        } else {
            console.log(error.message)
        }

    }

    return (
        <>
            
            <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}/>
                    </div>
                </fieldset>
            </form>
            <div>
                <button className="PayButton" onClick={(e)=>handleSubmit(e)}>Pay</button>
            </div>
            
        </>
    )
}