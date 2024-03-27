import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVaccine = () => {
    const [newVaccine, setNewVaccine] = useState({
        vaccineId: 0,
        vaccineName: '',
        manufacturingDate: '',
        expiryDate: '',
        description: ''
    });

    const navigate = useNavigate();
    const location = useLocation();
    const vaccineId = useParams().vaccineId;
    const onHandleChange = (e) => {
        setNewVaccine({
            ...newVaccine,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(newVaccine);
        try {
            const response = await axios.
                post('http://localhost:8090/vaccine/create', newVaccine);
            console.log(response.data);
            toast.success("Vaccine Created", { autoClose: 3000 });
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
                                <Label for="vaccineName" sm={4}>Vaccine Name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="vaccineName" id="vaccineName" placeholder="Enter Vaccine Name" value={newVaccine.vaccineName} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="manufacturingDate" sm={4}>manufactured Date</Label>
                                <Col sm={8}>
                                    <Input type="date" name="manufacturingDate" id="manufacturingDate" placeholder="Enter Manufactured date" value={newVaccine.manufacturingDate} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="expiryDate" sm={4}>Expiry Date</Label>
                                <Col sm={8}>
                                    <Input type="date" name="expiryDate" id="expiryDate" placeholder="Enter expiry Date" value={newVaccine.expiryDate} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" sm={4}>Description</Label>
                                <Col sm={8}>
                                    <Input type="text" name="description" id="description" placeholder="Enter description" value={newVaccine.description} onChange={onHandleChange} />
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
export default AddVaccine;

