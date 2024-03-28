import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './CreateSlot.css';
import DatePicker from 'react-datepicker';
import { Button } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardText } from 'reactstrap';



const CreateSlot = () => {
    const [slots, setSlots] = useState([]);
    const center = JSON.parse(sessionStorage.getItem('Center'));
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState();


    useEffect(() => {
        const getAllSlotByCenter = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/slot/center/${center.centerId}`);
                console.log(response.data);
                setSlots(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getAllSlotByCenter();
    }, []);
    const data = slots;

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const handleSearch = (items) => {
        let dateVal = '';
        if (selectedDate !== undefined && selectedDate !== null) {
            const year = selectedDate.getFullYear();
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const day = selectedDate.getDate().toString().padStart(2, '0');
            dateVal = `${year}-${month}-${day}`;
        }
        return items.filter((item) => {

            if (dateVal === '') {
                return item;
            } else {
                return item.date === dateVal;
            }
        });
    }

    const handleClearDate = () => {
        setSelectedDate();
    }
    const handelDeleteSlot = (slot) => {

    }
    const handleEditSlot = (slot) => {
        const parts = location.pathname.split('/');
        parts.pop();
        const updatedRoute = parts.join('/');
        navigate(updatedRoute + `/editSlot/${slot.id}`);
    }

    const handleAddSlot = () => {
        const parts = location.pathname.split('/');
        parts.pop();
        const updatedRoute = parts.join('/');
        navigate(updatedRoute + `/newSlot`);
    };

    
    return (
        <>
            <Row className="justify-content-center" style={{ marginTop: '2%', marginBottom: '1%' }}>
                <Col md={3} className="d-flex align-items-center">

                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                    />
                    <Button style={{ marginLeft: '10px' }} color="primary" onClick={handleClearDate}>Clear</Button>

                </Col>
                <Col md={2} className="text-right">

                    <Button color="primary" onClick={handleAddSlot}>+ Add Slot</Button>
                </Col>
            </Row>
            {handleSearch(data).map((slot, index) => (

                <Card key={slot.id} className="vaccine-card hoverable-card" style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }}>
                    <CardBody>
                        <CardText><strong>Date: </strong>{slot.date}</CardText>
                        <CardText><strong>Start Time: </strong>{slot.startTime}</CardText>
                        <CardText><strong>End Time: </strong>{slot.endTime}</CardText>
                        <CardText><strong>Available slots: </strong>{slot.availableSlots}</CardText>
                        <CardText><strong>Center Name: </strong>{slot.center.centerName}</CardText>
                        <Button color="primary" onClick={() => handleEditSlot(slot)}>Edit</Button>{' '}
                        <Button color="danger" onClick={() => handelDeleteSlot(slot)}>Delete</Button>
                    </CardBody>
                </Card>
            ))}
        </>
    );
}

export default CreateSlot;