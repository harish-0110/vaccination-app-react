import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import React from 'react';
import { Card, CardBody, CardText, Input, Button } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { toast } from "react-toastify";


const BookSlots = () => {
    const curPatient = JSON.parse(sessionStorage.getItem('Patient'));
    const [center, setCenter] = useState({});
    const [slots, setSlots] = useState([{}]);
    const centerId = useParams().centerId;
    // const [selectedSlot, setSelectedSlot] = useState(null);
    // const [selectedDate, setSelectedDate] = useState(new Date());
    // const [selectedVaccine, setSelectedVaccine] = useState('');
    
    const [appointment, setAppointment] = useState({
        vaccineStatus: false,
        slot: {},
        patient: curPatient,
        vaccine: {},
        certificate: null,
        bookingDate: new Date(),
    });


    useEffect(() => {
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


    const data = slots;



    const selectCard = (curSlot) => {
        if (appointment.slot !== undefined && appointment.slot !== null &&
            curSlot.id === appointment.slot.id) {
            setAppointment({
                ...appointment,
                slot: null,
            })
        } else {
            setAppointment({
                ...appointment,
                slot: curSlot
            })

        }
    };

    const handleDateChange = (date) => {
        setAppointment({
            ...appointment,
            bookingDate: date
        });
    };

    const handleVaccineChange = (e) => {
        const item = center.vaccineMap.find(vaccine => {
            return vaccine.vaccineId == e.target.value
        });
        console.log(item);
        setAppointment({
            ...appointment,
            vaccine: item
        })
    };

    const convertDateFunc = (dateVal) => {
        let year = dateVal.getFullYear();
        let month = (dateVal.getMonth() + 1).toString().padStart(2, '0');
        let day = dateVal.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    const handleSearch = (items) => {
        let dateVal = '';
        if (appointment.bookingDate !== undefined && appointment.bookingDate !== null) {
            dateVal = convertDateFunc(appointment.bookingDate);
        }
        return items.filter((item) => {

            if (dateVal === '') {
                return item;
            } else {
                return item.date === dateVal;
            }
        });
    }

    const bookAppointment = async () => {
        try {
            console.log(appointment);
            const response = await axios.post('http://localhost:8090/api/appointments/add',
                appointment)
            console.log(response.data);
            toast.success('Appointment Booked', { autoClose: 1000 });
        } catch (err) {
            console.log(err);

            toast.error(err.response.data.message, {autoClose:1000});
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center" style={{ marginTop: '2%' }}>
                <Card style={{ width: '70%' }}>
                    <CardBody>
                        <CardText>
                            Center Name: {center.centerName}
                            Address:{center.address}, {center.state}, {center.district}
                            Contact Number: {center.contactNumber}
                        </CardText>
                        <div>
                            <p><strong>Select a date:</strong></p>
                        </div><div style={{ margin: '10px' }}>
                            <DatePicker
                                selected={appointment.bookingDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                            /></div>
                        <div className="d-flex justify-content-center">
                            {handleSearch(data).map((slot, index) => (
                                <Card key={index} className={`card ${appointment.slot && slot.id === appointment.slot.id ? 'selected' : ''} mx-2`} style={{ width: '150px', cursor: 'pointer', backgroundColor: slot === appointment.slot ? 'lightyellow' : 'white' }}
                                    onClick={() => selectCard(slot)}>
                                    <CardBody>
                                        <CardText>
                                            {slot.startTime} - {slot.endTime}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                        <div style={{ margin: '10px' }}>
                            <p><strong>Select a Vaccine:</strong></p>
                            <Input style={{ width: '200px' }} type="select" onChange={handleVaccineChange} value={appointment.vaccine.vaccineId}>
                                <option key={0} value={0}>Choose the vaccine</option>
                                {center.vaccineMap && center.vaccineMap.map((vaccine, index) => (
                                    <option key={index} value={vaccine.vaccineId}>{vaccine.vaccineName}</option>
                                ))}
                            </Input>
                        </div>
                        <div className="text-center">
                            {/* Add the Update button */}
                            <Button color="primary" type="submit" onClick={bookAppointment}>Book Appointment</Button>
                        </div>

                    </CardBody>

                </Card>

            </div>
        </>
    );
}

export default BookSlots;