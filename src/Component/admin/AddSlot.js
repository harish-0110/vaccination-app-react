import axios from "axios";
import { useState } from "react";
import { Card, CardBody, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddSlot = () => {
    const currCenter = JSON.parse(sessionStorage.getItem('Center'));
    const [slot, setSlot] = useState({
        date: '',
        startTime: '',
        endTime: '',
        availableSlots: '',
        center: currCenter
    });


    const onSubmit = async (e) => {
        e.preventDefault();
        setSlot({
            ...slot,
            center : currCenter
        })
        console.log(slot);
        
        try {
            const response = await axios.post(`http://localhost:8090/slot`, slot);
            console.log(response.data);
            toast.success('Added new Slot', {autoClose: 2000});
        } catch (err) {
            console.log(err);
            toast.error('Can\'t create Slot', {autoClose: 2000});
        }
    }
    const onHandleChange = (e) => {
        setSlot({
            ...slot,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div>
                <Card style={{
                    maxWidth: '600px', // Adjust the card width to make it smaller
                    margin: '10px auto', // Center the card on the page
                    padding: '20px'
                }}>
                    <CardBody>
                        <Form onSubmit={onSubmit}>
                            <FormGroup row>
                                <Label for="date" sm={4}>Date</Label>
                                <Col sm={8}>
                                    <Input type="date" name="date" id="date" placeholder="Enter date" value={slot.date} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="startTime" sm={4}>Start Time</Label>
                                <Col sm={8}>
                                    <Input type="time" name="startTime" id="startTime" placeholder="" value={slot.startTime} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="endTime" sm={4}>End Time</Label>
                                <Col sm={8}>
                                    <Input type="time" name="endTime" id="endTime" placeholder="" value={slot.endTime} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="availableSlots" sm={4}>Available Slot</Label>
                                <Col sm={8}>
                                    <Input type="number" name="availableSlots" id="availableSlots" placeholder="10" value={slot.availableSlots} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>

                            <div className="text-center">
                                {/* Add the Update button */}
                                <Button color="primary" type="submit" >Add Center</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default AddSlot;