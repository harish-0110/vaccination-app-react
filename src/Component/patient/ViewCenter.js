import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Table } from 'reactstrap';
import './ViewCenter.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewCenter = () => {
    const navigate = useNavigate();
    const [centers, setCenters] = useState([]);
    const [activeTab, setActiveTab] = useState('pincode');
    const [searchValue, setSearchValue] = useState(''); 
    const location = useLocation();
    
    useEffect(() => {
        axios.get('http://localhost:8090/center/getAllCenter').then((res) => {
            console.log(res);
            setCenters(res.data);
        }).catch((err) => console.log(err));
    }, []);
    const data = Object.values(centers);

    const handleSearch = (items) => {
        return items.filter((item) => {
            if (searchValue.trim() === '') {
                return item;
            } else {
                const itemVal = item[activeTab].toLowerCase();
                const search = searchValue.trim().toLowerCase();
                return itemVal.includes(search);
            }
        });
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const NavigateToCenter = (centerId) => {
        const parts =  location.pathname.split('/'); 
        parts.pop();
        const updatedRoute = parts.join('/'); 
        navigate(updatedRoute+`/viewCenter/${centerId}`);
    };

    return (
        <>

            <div>
                <div className="tabs">
                    <button onClick={() => handleTabChange('pincode')} className={activeTab === 'pincode' ? 'active' : ''}>Pincode</button>
                    <button onClick={() => handleTabChange('centerName')} className={activeTab === 'centerName' ? 'active' : ''}>Name</button>
                    <button onClick={() => handleTabChange('district')} className={activeTab === 'district' ? 'active' : ''}>District</button>
                    <button onClick={() => handleTabChange('state')} className={activeTab === 'state' ? 'active' : ''}>State</button>
                </div>
                <div className="search-container">
                    {activeTab === 'pincode' && <input name='pincode' type="text" placeholder="Pincode" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />}
                    {activeTab === 'centerName' && <input name='centerName' type="text" placeholder="Name" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />}
                    {activeTab === 'state' && <input name='state' type="text" placeholder="State" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />}
                    {activeTab === 'district' && <input name='district' type="text" placeholder="District" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />}
                </div>
            </div>
            <Table borderless className="center-table">
                <tbody>
                    {handleSearch(data).map((center, index) => (
                        <tr key={index} className="center-card" onClick={() => NavigateToCenter(center.centerId)}>
                            <td>{index + 1} </td>
                            <td>{center.centerName}</td>
                            <td>{center.address}</td>
                            <td>{center.pincode}</td>
                            <td>{center.district}</td>
                            <td>{center.state}</td>
                            <td>{center.contactNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default ViewCenter;