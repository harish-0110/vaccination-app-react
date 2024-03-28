import { Card, CardBody, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';

const SuperAdminProfile = () => {
    const superAdmin = JSON.parse(sessionStorage.getItem('SuperAdmin'));
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
                                <Label for="adminName" sm={4}>SuperAdmin Name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="adminName" id="adminName" placeholder="Enter Super Admin Name" value={superAdmin.adminName} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="adminType" sm={4}>Admin Type</Label>
                                <Col sm={8}>
                                    <Input type="text" name="adminType" id="adminType" placeholder="Enter Admin" value={superAdmin.adminType} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={4}>Email</Label>
                                <Col sm={8}>
                                    <Input type="email" name="email" id="email" placeholder="Enter email" value={superAdmin.email} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phoneNumber" sm={4}>Phone Number</Label>
                                <Col sm={8}>
                                    <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter Phone number" value={superAdmin.phoneNumber} onChange={onHandleChange} />
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



export default SuperAdminProfile;