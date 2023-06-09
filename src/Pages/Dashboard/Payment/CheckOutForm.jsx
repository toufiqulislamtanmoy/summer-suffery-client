import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext } from "react";

const CheckOutForm = ({ price, classDetail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMsg, setErrorMsg] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [processing, setProcessing] = useState(false);
    const [clintSecret, setClintSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    console.log(classDetail)
    const { instructor, className, banner, classId, _id } = classDetail;



    useEffect(() => {
        console.log(price)
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price }).then(res => {
                setClintSecret(res.data.clientSecret);
            })
        }
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.log("inside did not get the stripe and element")
            return;
        }


        const card = elements.getElement(CardElement);
        console.log(card);
        if (card == null) {
            console.log('Card is null')
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setErrorMsg(error.message);
            setTransactionId('');
        } else {
            setErrorMsg('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true);
        const { paymentIntent, error: confrimError } = await stripe.confirmCardPayment(
            clintSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "Unknown",
                        email: user?.email || "Unknown",
                    },
                },
            },
        );

        if (confrimError) {
            console.log(confrimError);
        }

        setProcessing(false);
        
        if (paymentIntent?.status === "succeeded") {
            
            setTransactionId(paymentIntent.id);

            const paymentInfo = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                instructorName: instructor,
                banner,
                classId,
                className,
                selectedClassID: _id

            }
            console.log(paymentInfo)
        }else{
            setErrorMsg('An error occur try after some times leater or refresh the page')
        }


    }
    return (
        <div className="max-w-7xl mx-auto my-24 bg-[#424b5c] p-10 rounded-xl text-[#fff]">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#fff',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-info my-5" type="submit" disabled={!stripe || !clintSecret || processing}>
                    Pay
                </button>
            </form>
            {errorMsg && <p className='text-red-500 w-2/3 mx-auto'>{errorMsg}</p>}
            {transactionId && <p className='text-green-500 w-2/3 mx-auto'>Transaction Successful: {transactionId}</p>}
            
        </div>
    );
};

export default CheckOutForm;