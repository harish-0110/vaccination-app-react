import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const UpdateCenter = () => {
    const [newCenter, setNewCenter] = useState({
        centerId: 0,
        centerName: '',
        address: '',
        pincode: '',
        district: '',
        state: '',
        contactNumber: '',
        vaccineMap: [],
        admin: {
            adminId: 0
        }
    });

    const [admins, setAdmins] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const centerId = useParams().centerId;

    useEffect(() => {
        const getCenterById = async () => {
            try {
                const response = await axios
                    .get(`http://localhost:8090/center/getByID/${centerId}`);
                console.log(response.data);
                const data = response.data;
                setNewCenter(data);

            } catch (err) {
                console.log(err);
            }
        }
        const getAllAdmin = async () => {
            try {
                const response = await axios.
                    get('http://localhost:8090/vaccinationapp/admin/getalladmin');
                console.log(response.data);
                setAdmins(response.data)
            } catch (err) {
                console.log(err);
            }

        }
        getAllAdmin();
        getCenterById();
    }, [])

    const onHandleChange = (e) => {
        setNewCenter({
            ...newCenter,
            [e.target.name]: e.target.value
        })
    }

    const handleAddAdmin = (e) => {
        const item = admins.find(admin => {
            return admin.adminId == e.target.value
        });
        console.log(item);
        setNewCenter({
            ...newCenter,
            admin: item
        })
    };


    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(newCenter);
        try {
            const response = await axios.
                put('http://localhost:8090/center/update', newCenter);
            console.log(response.data);
            toast.success("Center Updated", { autoClose: 3000 });
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
                                <Label for="centerId" sm={4}>Center ID</Label>
                                <Col sm={8}>
                                    <Input type="text" name="centerId" id="centerId" placeholder="12345" disabled value={newCenter.centerId} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="centerName" sm={4}>Center Name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="centerName" id="centerName" placeholder="Enter Center Name" value={newCenter.centerName} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="address" sm={4}>Address</Label>
                                <Col sm={8}>
                                    <Input type="text" name="address" id="address" placeholder="Enter Address" value={newCenter.address} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="pincode" sm={4}>Pincode</Label>
                                <Col sm={8}>
                                    <Input type="text" name="pincode" id="pincode" placeholder="Enter Pincode" value={newCenter.pincode} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="district" sm={4}>District</Label>
                                <Col sm={8}>
                                    <Input type="district" name="district" id="district" placeholder="Enter District" value={newCenter.district} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="state" sm={4}>State</Label>
                                <Col sm={8}>
                                    <Input type="text" name="state" id="state" placeholder="Enter State" value={newCenter.state} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="contactNo" sm={4}>Contact Number</Label>
                                <Col sm={8}>
                                    <Input type="text" name="contactNo" id="contactNo" placeholder="Enter phno" value={newCenter.contactNumber} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="contactNo" sm={4}>Admin</Label>

                                <Col sm={8}>
                                    <Input name="admin" id="admin" type="select" onChange={handleAddAdmin} value={newCenter.admin ? newCenter.admin.adminId : newCenter.admin}>
                                        {admins && admins.map((admin, index) => (
                                            <option key={index} value={admin.adminId}>{admin.adminName}</option>
                                        ))}
                                    </Input>
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


export default UpdateCenter;

