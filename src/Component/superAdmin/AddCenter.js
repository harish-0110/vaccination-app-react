import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCenter = () => {
    const [newCenter, setNewCenter] = useState({
        centerId: 0,
        centerName: '',
        address: '',
        pincode: '',
        district: '',
        state: '',
        contactNumber: '',
        vaccineMap: []
    });

    const navigate = useNavigate();
    const location = useLocation();
    const centerId = useParams().centerId;
    const onHandleChange = (e) => {
        setNewCenter({
            ...newCenter,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(newCenter);
        try {
            const response = await axios.
                post('http://localhost:8090/center/create', newCenter);
            console.log(response.data);
            toast.success("Center Created", { autoClose: 3000 });
            navigate(-1);

        } catch (err) {
            console.log(err);
        }


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
                                <Label for="centerName" sm={4}>Center Name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="centerName" id="centerName" placeholder="Enter Center Name" value={newCenter.centerName} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="address" sm={4}>Center Address</Label>
                                <Col sm={8}>
                                    <Input type="text" name="address" id="address" placeholder="Enter Address" value={newCenter.address} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="pincode" sm={4}>Pincode</Label>
                                <Col sm={8}>
                                    <Input type="text" name="pincode" id="pincode" placeholder="Enter pincode" value={newCenter.pincode} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="district" sm={4}>District</Label>
                                <Col sm={8}>
                                    <Input type="text" name="district" id="district" placeholder="Enter district" value={newCenter.district} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="state" sm={4}>State</Label>
                                <Col sm={8}>
                                    <Input type="text" name="state" id="state" placeholder="Enter state" value={newCenter.state} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="contactNo" sm={4}>Contact Number</Label>
                                <Col sm={8}>
                                    <Input type="text" name="contactNumber" id="contactNumber" placeholder="Enter Phone Number" value={newCenter.contactNumber} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>

                            <div className="text-center">
                                {/* Add the Update button */}
                                <Button color="primary" type="submit" >Create</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
export default AddCenter;

