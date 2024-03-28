import { Card, CardBody, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
// import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ManageCenter = () => {
    const [center, setCenter] = useState({
        centerId: 0,
        centerName: '',
        address: '',
        pincode: '',
        district: '',
        state: '',
        contactNumber: '',
        vaccineMap: [],
        admin: {},
    });

    const currAdmin = JSON.parse(sessionStorage.getItem('Admin'));

    useEffect(() => {
        const getCenterByAdminId = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/center/admin/${currAdmin.adminId}`);
                console.log(response.data);
                sessionStorage.setItem('Center', JSON.stringify(response.data));
                setCenter(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getCenterByAdminId();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8090/center/update', center);
            console.log(response.data);
            setCenter(response.data);
            toast.success("Center Updated", { autoClose: 3000 });
        } catch (err) {
            console.log(err);
        }
    }

    const onHandleChange = (e) => {
        setCenter({
            ...center,
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
                                <Label for="centerId" sm={4}>Center ID</Label>
                                <Col sm={8}>
                                    <Input type="number" name="centerId" id="centerId" placeholder="12345" disabled value={center.centerId} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="centerName" sm={4}>Center Name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="centerName" id="centerName" placeholder="Enter center Name" value={center.centerName} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="address" sm={4}>Address</Label>
                                <Col sm={8}>
                                    <Input type="text" name="address" id="address" placeholder="Enter center address" value={center.address} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="pincode" sm={4}>Pincode</Label>
                                <Col sm={8}>
                                    <Input type="text" name="pincode" id="pincode" placeholder="Enter center pincode" value={center.pincode} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="district" sm={4}>District</Label>
                                <Col sm={8}>
                                    <Input type="text" name="district" id="district" placeholder="Enter center district" value={center.district} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="state" sm={4}>State</Label>
                                <Col sm={8}>
                                    <Input type="text" name="state" id="state" placeholder="Enter center state" value={center.state} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="contactNumber" sm={4}>Contact Number</Label>
                                <Col sm={8}>
                                    <Input type="text" name="contactNumber" id="contactNumber" placeholder="Enter center contactNumber" value={center.contactNumber} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <div className="text-center">
                                {/* Add the Update button */}
                                <Button color="primary" type="submit" >Update Center</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default ManageCenter;