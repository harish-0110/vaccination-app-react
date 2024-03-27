import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CreateCenter = () => {
    const [centers, setCenters] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

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
        const parts = location.pathname.split('/');
        //parts.pop();
        const updatedRoute = parts.join('/');
        navigate(updatedRoute+ `/updateCenter/${center.centerId}`);

    };

    const handleDelete = async(center) => {
        console.log('Delete center:', center);
        let confirmMsg = window.confirm('Do you want to delete the center');
        if (confirmMsg) {
            try {
                const deletedCenter = await axios.delete(`http://localhost:8090/center/${center.centerId}/remove`);
                console.log(deletedCenter);
                console.log(centers);
                const afterDeleteCenters = centers.filter((newCenter) => {
                    return newCenter.centerId !== center.centerId;
                })
                setCenters(afterDeleteCenters);
                toast.error("Center deleted", { autoClose: 10000 });
            } catch(err) {
                console.log(err);
            }
        }
    };


    const handleAddCenter = () => {
         console.log('Add center');
         const parts = location.pathname.split('/');
         const updatedRoute = parts.join('/');
         console.log(updatedRoute);
         navigate(updatedRoute+ '/addCenter');
    }

    return (<>
        <div>
        <Button color="primary" onClick={handleAddCenter}>+ Add Center</Button> 
            {centers.map(center => (
                <Card key={center.centerId} className="admin-card hoverable-card"  style={{marginTop: '2%', marginLeft:'2%',  marginRight:'2%' }}>
                    <CardBody>
                        <CardText><strong>Center ID:</strong> {center.centerId}</CardText>
                        <CardText><strong>Center Name:</strong> {center.centerName}</CardText>
                        {/* <CardText><strong>Admin Name:</strong> {center.admin.adminName}</CardText> */}
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