import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { Card, CardBody, CardText } from 'reactstrap';
import { toast } from "react-toastify";

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const center = JSON.parse(sessionStorage.getItem('Center'));
    const fetchAllAppointments = async () => {

        try {
            const response = await axios
                .get(`http://localhost:8090/api/appointments/vaccinationCenters/${center.centerId}`);
            console.log(response.data);
            setAppointments(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {

        fetchAllAppointments();
    }, [])
    const handleStatus = async (appointment) => {
        try {
            const response = await axios
                .put('http://localhost:8090/api/appointments/vaccinationStatus', {
                    appointmentId: appointment.bookingId,
                    isVaccinated: true,
                })
            console.log(response.data);
            fetchAllAppointments();
            toast.success('Status Approved', { autoClose: 2000 });
        } catch (err) {
            console.log(err);
        }
    }
    const getVaccineStatusText = (vaccineStatus) => {
        return vaccineStatus ? 'Approved' : 'Not Approved';
    };
    return (<>
        <div >
            {appointments.map(appointment => (
                <Card key={appointment.bookingId} className="vaccine-card hoverable-card" style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }}>
                    <CardBody>
                        <CardText><strong>Status:</strong> {getVaccineStatusText(appointment.vaccineStatus)}</CardText>
                        <CardText><strong>Vaccine Name:</strong> {appointment.vaccine.vaccineName}</CardText>
                        <CardText><strong>Slot timing:</strong> {appointment.slot.startTime} - {appointment.slot.endTime}</CardText>
                        <CardText><strong>Patient Name:</strong> {appointment.patient.patientName}</CardText>
                        <Button color="primary" onClick={() => handleStatus(appointment)} disabled={appointment.vaccineStatus}>Approve</Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    </>
    );
}

export default ManageAppointments;