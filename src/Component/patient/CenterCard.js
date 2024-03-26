import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './CenterCard.css';
const CenterCard = ({ center }) => {
    const { centerId, centerName, address, pincode, district, state, contactNumber, vaccineMap, slots, admin } = center;

    return (
        <Card className="center-card">
            <CardBody className="d-flex flex-row align-items-start justify-content-between">
                <div>
                    <CardTitle>{centerName}</CardTitle>
                    <CardText>
                        <div>Center ID: {centerId}</div>
                        <div>Address: {address}</div>
                        <div>Pincode: {pincode}</div>
                        <div>District: {district}</div>
                        <div>State: {state}</div>
                        <div>Contact Number: {contactNumber}</div>
                    </CardText>
                </div>
                <Button color="primary">Book Slot</Button>
            </CardBody>
        </Card>
    );
};

export default CenterCard;
