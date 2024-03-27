import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';


const CreateCenter = () => {
    const [centers, setCenters] = useState([]);

    useEffect(() => {
        const getAllCenters = async () => {
            try {
                const response = await axios
                    .get('http://localhost:8090/center/getAllCenter');
                console.log(response);
                setCenters(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        getAllCenters();
    }, [])

    const handleUpdate = (center) => {
        console.log('Update center:', center);
    };

    const handleDelete = (center) => {
        console.log('Delete center:', center);
    };
    return (<>
        <div>
            {centers.map(center => (
                <Card key={center.centerId} className="admin-card hoverable-card"  style={{marginTop: '2%', marginLeft:'2%',  marginRight:'2%' }}>
                    <CardBody>
                    <CardText><strong>Center Name:</strong> {center.centerName}</CardText>
                        <CardText><strong>Admin Name:</strong> {center.admin.adminName}</CardText>
                        <CardText><strong>State:</strong> {center.state}</CardText>
                        <CardText><strong>District:</strong> {center.district}</CardText>
                        <Button color="primary" onClick={() => handleUpdate(center)}>Update</Button>{' '}
                        <Button color="danger" onClick={() => handleDelete(center)}>Delete</Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    </>
    );
}

export default CreateCenter;