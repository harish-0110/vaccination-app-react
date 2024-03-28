import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { createMemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { Input, Row, Col } from 'reactstrap';
import './ManageVaccine.css';
import { toast } from 'react-toastify';

const ManageVaccines = () => {
    const [vaccines, setVaccines] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const center = JSON.parse(sessionStorage.getItem('Center'));
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getAllVaccineByCenter = async () => {
            try {
                const respone = await axios
                    .get(`http://localhost:8090/center/getAllVaccinesInCenter/${center.centerId}`);
                console.log(respone.data);
                setVaccines(respone.data);
            } catch (err) {
                console.log(err);
            }
        }
        getAllVaccineByCenter();
    }, [])
    const data = vaccines;
    const handleSearch = (items) => {
        return items.filter((item) => {
            if (searchValue.trim() === '') {
                return item;
            } else {
                const itemVal = item.vaccineName.toLowerCase();
                const search = searchValue.trim().toLowerCase();
                return itemVal.includes(search);
            }
        });
    }
    const handleDelete = async (delVaccine) => {
        if (window.confirm('Remove vaccine from center?')) {
            try {
                const response = await axios.
                    delete(`http://localhost:8090/center/${center.centerId}/removeVaccine/${delVaccine.vaccineId}`);
                console.log(response);
                const newVaccine = vaccines.filter((vaccine) => {
                    return vaccine.vaccineId !== delVaccine.vaccineId;
                })
                setVaccines(newVaccine);
                toast.success(delVaccine.vaccineName + ' removed from the center', {autoClose: 2000});
            } catch (err) {
                console.log(err)
            }
        }

    };
    const handleAddVaccine = () => {
        const parts = location.pathname.split('/');
        parts.pop();
        const updatedRoute = parts.join('/');
        navigate(updatedRoute + '/viewVaccine');
    }
    return (
        <>
            <Row className="justify-content-center" style={{ marginTop: '2%' }}>
                <Col md={3} className="d-flex align-items-center">
                    <div className="search-container">
                        <Input
                            name='vaccineName'
                            type="text"
                            placeholder="Vaccine Name"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </Col>
                <Col md={2} className="text-right">
                    <Button color="primary" onClick={handleAddVaccine}>+ Add Vaccine</Button>
                </Col>
            </Row>
            <div >
                {handleSearch(data).map(vaccine => (
                    <Card key={vaccine.vaccineId} className="vaccine-card hoverable-card" style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }}>
                        <CardBody>

                            <CardText><strong>Description:</strong> {vaccine.description}</CardText>
                            <CardText><strong>Expiry Date:</strong> {vaccine.expiryDate}</CardText>
                            <CardText><strong>Manufacturing Date:</strong> {vaccine.manufacturingDate}</CardText>
                            <CardText><strong>Vaccine Name:</strong> {vaccine.vaccineName}</CardText>
                            <Button color="danger" onClick={() => handleDelete(vaccine)}>Remove</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default ManageVaccines;