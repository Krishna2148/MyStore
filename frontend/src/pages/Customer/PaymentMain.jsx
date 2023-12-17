import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { getStripraKey, makePayment } from "../../api/paymentApi";

export default function PaymentMain() {
    const [clientSecret, setClientSecret] = useState("");
    let [stripeKey, setStripeKey] = useState('')

    useEffect(() => {
        getStripraKey()
            .then(data => {
                setStripeKey(data.STRIPEAPIKEY)
            })
        let amount = sessionStorage.getItem('total')
        makePayment(amount*100)
        .then(data => {
            setClientSecret(data.clientSecret)
        })

        // // Create PaymentIntent as soon as the page loads
        // fetch("/create-payment-intent", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        // })
        //     .then((res) => res.json())
        //     .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            {clientSecret && stripeKey &&
                <Elements options={options} stripe={loadStripe(stripeKey)}>
                    <CheckoutForm/>
                </Elements>
            }
        </div>
    );
}