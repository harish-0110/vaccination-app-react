import { Card, CardBody, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';

const PatientHome = () => {
    const patient = JSON.parse(sessionStorage.getItem('Patient'));
    const onSubmit = () => {

    }

    const onHandleChange =() => {

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
                                <Label for="patientName" sm={4}>Patient Name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="patientName" id="patientName" placeholder="Enter Patient Name" value={patient.patientName} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="address" sm={4}>Address</Label>
                                <Col sm={8}>
                                    <Input type="text" name="address" id="address" placeholder="Enter Address" value={patient.address} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={4}>Email</Label>
                                <Col sm={8}>
                                    <Input type="email" name="email" id="email" placeholder="Enter email" value={patient.email} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phoneNumber" sm={4}>Phone Number</Label>
                                <Col sm={8}>
                                    <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter Phone number" value={patient.phoneNumber} onChange={onHandleChange} />
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

export default PatientHome; 