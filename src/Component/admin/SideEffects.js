import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { createMemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { Input, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';

const SideEffects = () => {
    const [sideEffects, setSideEffects] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const center = JSON.parse(sessionStorage.getItem('Center'));
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getAllSideEffectByCenter = async () => {
            try {
                const respone = await axios
                    .get(`http://localhost:8090/sideEffects/center/${center.centerId}`);
                console.log(respone.data);
                setSideEffects(respone.data);
            } catch (err) {
                console.log(err);
            }
        }
        getAllSideEffectByCenter();
    }, [])
    const data = sideEffects;
    const handleSearch = (items) => {
        return items.filter((item) => {
            if (searchValue.trim() === '') {
                return item;
            } else {
                const itemVal = item.booking.vaccine.vaccineName.toLowerCase();
                const search = searchValue.trim().toLowerCase();
                return itemVal.includes(search);
            }
        });
    }
    return(
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
            </Row>
            <div >
                {handleSearch(data).map(sideEffect => (
                    <Card key={sideEffect.id} className="vaccine-card hoverable-card" style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }}>
                        <CardBody>
                        <CardText><strong> Patient Name :</strong> {sideEffect.patient.patientName}</CardText>
                        <CardText><strong>Vaccine Name:</strong> {sideEffect.booking.vaccine.vaccineName}</CardText>
                            <CardText><strong>Side Effect:</strong> {sideEffect.description}</CardText>
                        </CardBody>
                    </Card>
                ))}
            </div>
    </>
)}
export default SideEffects;