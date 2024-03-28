import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import './CreateVaccine.css';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CreateVaccine = () => {
    const [vaccines, setVaccines] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getAllVaccine = async () => {
            try {
                const respone = await axios.get('http://localhost:8090/vaccine/getAllvaccine');
                console.log(respone.data);
                setVaccines(respone.data);
            } catch (err) {
                console.log(err);
            }
        }
        getAllVaccine();
    }, [])
    const data = Object.values(vaccines);

    const handleUpdate = (vaccine) => {
        console.log('Update vaccine:', vaccine);
        const parts = location.pathname.split('/');
        parts.pop();
        const updatedRoute = parts.join('/');
        navigate(updatedRoute + `/updateVaccine/${vaccine.vaccineId}`);
    };

    const handleDelete = async (vaccine) => {
        console.log('Delete vaccine:', vaccine);
        let confirmMsg = window.confirm('Do you want to delete the vaccine');
        if (confirmMsg) {
            try {
                const deleteVaccine = await axios.delete(`http://localhost:8090/vaccine/deleteById/${vaccine.vaccineId}`);
                //http://localhost:8090/vaccine/deleteById/5665
                console.log(deleteVaccine);
                console.log(vaccines);
                const afterDeleteVaccines = vaccines.filter((newVaccine) => {
                    return newVaccine.vaccineId !== vaccine.vaccineId;
                })
                setVaccines(afterDeleteVaccines);
                toast.error("Vaccine deleted", { autoClose: 10000 });
            } catch (err) {
                console.log(err);
            }
        }
    };

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

    const handleAddVaccine = () => {
        console.log('Add Vaccine');
        const parts = location.pathname.split('/');
        parts.pop()
        const updatedRoute = parts.join('/');

        console.log(updatedRoute);
        navigate(updatedRoute + '/addVaccine');
    }

    return (
        <>
            <div className="search-container" style={{ display: 'flex', alignItems: 'center', marginLeft:'10%', marginRight: '10%', marginTop: '1%' }}>
                <input name='vaccineName' type="text" placeholder="vaccineName" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <Button color="primary" onClick={handleAddVaccine} style={{ marginLeft: 'auto' }}>+ Add Vaccine</Button>
            </div>
            <div>
                {handleSearch(data).map(vaccine => (
                    <Card key={vaccine.vaccineId} className="vaccine-card hoverable-card" style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }}>
                        <CardBody>
                            <CardText><strong>Vaccine Name:</strong> {vaccine.vaccineName}</CardText>
                            <CardText><strong>Description:</strong> {vaccine.description}</CardText>
                            <CardText><strong>Expiry Date:</strong> {vaccine.expiryDate}</CardText>
                            <CardText><strong>Manufacturing Date:</strong> {vaccine.manufacturingDate}</CardText>
                            <Button color="primary" style={{ marginRight: '5px' }} onClick={() => handleUpdate(vaccine)}>Update</Button>
                            <Button color="danger" onClick={() => handleDelete(vaccine)}>Delete</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </>
    );
};
export default CreateVaccine;