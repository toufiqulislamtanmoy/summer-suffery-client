import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useEffect } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_PAY_PK);

const Payment = () => {
    const location = useLocation();
    const { id } = queryString.parse(location.search);
    const [classs, setClasss] = useState([]);
    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/selectedClass/${id}`).then(data => {
            setClasss(data.data);
        });
    }, [axiosSecure, id]);

console.log(typeof classs.price)
    return (
        <Elements stripe={stripePromise}>
            <CheckOutForm price={parseFloat(classs.price)} classDetail={classs}/>
        </Elements>
    );
};

export default Payment;
