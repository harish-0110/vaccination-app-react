import axios from "axios";
import {  useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const UpdateAdmin = () => {
    const [admin, setAdmin] = useState({
        adminId: 0,
        adminName: '',
        adminType: '',
        password: '',
        email: '',
        phoneNumber: ''
    });
    const navigate = useNavigate();
    const location = useLocation();
    const adminId = useParams().adminId;

    useEffect(() => {
        const getAdminById = async () => {
            try {
                const response = await axios
                    .get(`http://localhost:8090/vaccinationapp/admin/getadminbyid/${adminId}`);
                console.log(response.data);
                setAdmin(response.data);
            } catch (err) {
                console.log(err);
            }

        }
        getAdminById();
    }, [])

    const onHandleChange = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(admin);
        try {
            const response = await axios.
                put('http://localhost:8090/vaccinationapp/admin/update', admin);
            console.log(response.data);
            toast.success("Admin Updated", { autoClose: 3000 });
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
                                <Label for="adminId" sm={4}>Admin ID</Label>
                                <Col sm={8}>
                                    <Input type="text" name="adminId" id="adminId" placeholder="12345" disabled value={admin.adminId} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="adminName" sm={4}>Admin Name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="adminName" id="adminName" placeholder="Enter Admin Name" value={admin.adminName} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="adminType" sm={4}>Admin Role</Label>
                                <Col sm={8}>
                                    <Input type="text" name="adminType" id="adminType" placeholder="Enter Admin Role" value={admin.adminType} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phoneNumber" sm={4}>Admin Number</Label>
                                <Col sm={8}>
                                    <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter Admin Number" value={admin.phoneNumber} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={4}>Admin Email</Label>
                                <Col sm={8}>
                                    <Input type="email" name="email" id="email" placeholder="Enter Admin Email" value={admin.email} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <div className="text-center">
                                {/* Add the Update button */}
                                <Button color="primary" type="submit" >Update</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default UpdateAdmin;