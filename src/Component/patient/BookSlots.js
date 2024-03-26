import { useEffect, useState } from "react";
import CenterCard from "./CenterCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookSlots = () => {
    const [center, setCenter] = useState({});
    const [slots, setSlots] = useState([{}]);
    const centerId  = useParams().centerId;

    useEffect( () => {
        const fetchCenter = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/center/getByID/${centerId}`);
                setCenter(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching center:', error);
            }
        };

        const fetchSlots = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/slot/center/${centerId}`);
                setSlots(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching slots:', error);
            }
        };

        fetchCenter();
        fetchSlots();
    }, []);


    return (
        <>
            <p>Book slots</p>
        </>
    );
}

export default BookSlots;