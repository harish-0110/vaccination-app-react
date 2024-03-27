import axios from "axios";
import {  useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const UpdateVaccine = () => {
    const [vaccine, setVaccine] = useState({
        vaccineId: 0,
        vaccineName: '',
        manufacturingDate: '',
        expiryDate: '',
        description: ''
    });

    const navigate = useNavigate();
    const location = useLocation();
    const vaccineId = useParams().vaccineId;


    useEffect(() => {
        const getVaccineById = async () => {
            try {
                const response = await axios
                    .get(`http://localhost:8090/vaccine/${vaccineId}`);
                console.log(response.data);
                setVaccine(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getVaccineById();
    }, [])


    const onHandleChange = (e) => {
        setVaccine({
            ...vaccine,
            [e.target.name]: e.target.value
        })
    }


    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(vaccine);
        try {
            const response = await axios.
                put(`http://localhost:8090/vaccine/update/${vaccineId}`,vaccine);
            console.log(response.data);
            //vaccine=response.data;
            toast.success("Vaccine Updated", { autoClose: 3000 });
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
                                <Label for="vaccineId" sm={4}>Vaccine ID</Label>
                                <Col sm={8}>
                                    <Input type="text" name="vaccineId" id="vaccineId" placeholder="12345" disabled value={vaccine.vaccineId} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="vaccineName" sm={4}>Vaccine Name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="vaccineName" id="vaccineName" placeholder="Enter Vaccine Name" value={vaccine.vaccineName} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="manufacturingDate" sm={4}>manufactured date</Label>
                                <Col sm={8}>
                                    <Input type="date" name="manufacturingDate" id="manufacturingDate" placeholder="Enter manufacturing Date" value={vaccine.manufacturingDate} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="expiryDate" sm={4}>Expiry date</Label>
                                <Col sm={8}>
                                    <Input type="date" name="expiryDate" id="expiryDate" placeholder="Enter expiry date" value={vaccine.expiryDate} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" sm={4}>Vaccine Description</Label>
                                <Col sm={8}>
                                    <Input type="text" name="description" id="description" placeholder="Enter description" value={vaccine.description} onChange={onHandleChange} />
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


export default UpdateVaccine;