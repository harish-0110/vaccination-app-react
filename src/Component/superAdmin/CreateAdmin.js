import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardText, Button } from 'reactstrap';
import './CreateAdmin.css';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const getAllAdmin = async () => {
            try {
                const response = await axios.get('http://localhost:8090/vaccinationapp/admin/getalladmin');
                console.log(response);
                setAdmins(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        getAllAdmin();
    }, [])

    const handleUpdate = (admin) => {
        console.log('Update admin:', admin);
        const parts =  location.pathname.split('/'); 
        parts.pop();
        const updatedRoute = parts.join('/'); 
        navigate(updatedRoute+`/updateAdmin/${admin.adminId}`);
    };

    const handleDelete = async (admin) => {
        console.log('Delete admin:', admin);
        let confirmMsg = window.confirm('Do you want to delete the admin');
        if (confirmMsg) {
            try {
                const deleteAdmin = await axios.delete(`http://localhost:8090/vaccinationapp/admin/deleteadmin/${admin.adminId}`);
                console.log(deleteAdmin);
                console.log(admins);
                const deleteAdmins = admins.filter((newAdmin) => {
                    return newAdmin.adminId !== admin.adminId;
                })
                setAdmins(deleteAdmins);
                toast.error("Admin deleted", { autoClose: 10000 });
            } catch(err) {
                console.log(err);
            }
        }
    };

    const handleAddAdmin = () => {
        console.log('Add admin');
        const parts =  location.pathname.split('/'); 
        parts.pop();
        const updatedRoute = parts.join('/'); 
        navigate(updatedRoute+'/addAdmin');
    }
    return (<>
        <div>
        <Button style={{marginTop: '1%', marginLeft: '3%'}} color="primary" onClick={handleAddAdmin}>+ Add Admin</Button>
            {admins.map(admin => (
                <Card key={admin.adminId} className="admin-card hoverable-card" style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }}>
                    <CardBody>
                        <CardText><strong>Name:</strong> {admin.adminName}</CardText>
                        <CardText><strong>Email:</strong> {admin.email}</CardText>
                        <CardText><strong>Phone Number:</strong> {admin.phoneNumber}</CardText>
                        <CardText><strong>Role:</strong> {admin.adminType}</CardText>
                        <Button color="primary" onClick={() => handleUpdate(admin)}>Update</Button>{' '}
                        <Button color="danger" onClick={() => handleDelete(admin)}>Delete</Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    </>);
}

export default CreateAdmin;