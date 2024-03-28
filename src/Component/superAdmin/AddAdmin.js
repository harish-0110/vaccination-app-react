import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddAdmin = () => {
    const [newAdmin, setNewAdmin] = useState({
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
    const onHandleChange = (e) => {
        setNewAdmin({
            ...newAdmin,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(newAdmin);
        try {
            const response = await axios.
                post('http://localhost:8090/vaccinationapp/admin/add', newAdmin);
            console.log(response.data);
            toast.success("Admin Created", { autoClose: 3000 });
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
                                <Label for="adminName" sm={4}>Admin Name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="adminName" id="adminName" placeholder="Enter Admin Name" value={newAdmin.adminName} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="adminType" sm={4}>Admin Role</Label>
                                <Col sm={8}>
                                    <Input type="text" name="adminType" id="adminType" placeholder="Enter Admin Role" value={newAdmin.adminType} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phoneNumber" sm={4}>Admin Number</Label>
                                <Col sm={8}>
                                    <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter Admin Number" value={newAdmin.phoneNumber} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={4}>Admin Email</Label>
                                <Col sm={8}>
                                    <Input type="email" name="email" id="email" placeholder="Enter Admin Email" value={newAdmin.email} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={4}>Admin Password</Label>
                                <Col sm={8}>
                                    <Input type="password" name="password" id="password" placeholder="Enter Admin Password" value={newAdmin.password} onChange={onHandleChange} />
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

export default AddAdmin;