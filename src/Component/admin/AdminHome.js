import { Card, CardBody, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';

const AdminHome = () => {
    const admin = JSON.parse(sessionStorage.getItem('Admin'));
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
                                <Label for="adminName" sm={4}>Admin Name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="adminName" id="adminName" placeholder="Enter Super Admin Name" value={admin.adminName} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="adminType" sm={4}>Admin Type</Label>
                                <Col sm={8}>
                                    <Input type="text" name="adminType" id="adminType" placeholder="Enter Admin" value={admin.adminType} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={4}>Email</Label>
                                <Col sm={8}>
                                    <Input type="email" name="email" id="email" placeholder="Enter email" value={admin.email} onChange={onHandleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phoneNumber" sm={4}>Phone Number</Label>
                                <Col sm={8}>
                                    <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter Phone number" value={admin.phoneNumber} onChange={onHandleChange} />
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


export default AdminHome;