import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import './CreateVaccine.css';
const CreateVaccine = () => {
    const [vaccines, setVaccines] = useState([]);
    const [searchValue, setSearchValue] = useState(''); 
    
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
    };

    const handleDelete = (vaccine) => {
        console.log('Delete vaccine:', vaccine);
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

    return (
        <>
            <div className="search-container">
                <input name='vaccineName' type="text" placeholder="vaccineName" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </div>
            <div >
                {handleSearch(data).map(vaccine => (
                    <Card key={vaccine.vaccineId} className="vaccine-card hoverable-card" style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }}>
                        <CardBody>

                            <CardText><strong>Description:</strong> {vaccine.description}</CardText>
                            <CardText><strong>Expiry Date:</strong> {vaccine.expiryDate}</CardText>
                            <CardText><strong>Manufacturing Date:</strong> {vaccine.manufacturingDate}</CardText>
                            <CardText><strong>Vaccine Name:</strong> {vaccine.vaccineName}</CardText>
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