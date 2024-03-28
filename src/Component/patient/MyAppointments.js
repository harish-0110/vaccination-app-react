import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardText, Button } from 'reactstrap';


const MyAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const patient = JSON.parse(sessionStorage.getItem('Patient'));

    useEffect(() => {
        const getAllAppointments = async () => {
            try {
                const appointments = await axios.get('http://localhost:8090/api/appointments/id', {
                    params: {
                        patientId: patient.patientId
                    }

                });
                setAppointments(appointments.data)
                console.log(appointments.data)
            } catch (err) {
                console.log(err);
            }

        }
        getAllAppointments();

    }, []);

    const handleStatus = (appointment) => {
        const url = `http://localhost:8090/export-to-pdf/${appointment.bookingId}`;

        axios.get(url, { responseType: 'arraybuffer' })
            .then(response => {
                const blob = new Blob([response.data], { type: 'application/pdf' });

                const url = window.URL.createObjectURL(blob);

                window.open(url);
            })
            .catch(error => {
              
                console.error('Error:', error);
            });
    }
    const getVaccineStatusText = (vaccineStatus) => {
        return vaccineStatus ? 'Approved' : 'Not Approved';
    };
    return (
        <>
            <div >
                {appointments.map(appointment => (
                    <Card key={appointment.bookingId} className="vaccine-card hoverable-card" style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }}>
                        <CardBody>
                            <CardText><strong>Status:</strong> {getVaccineStatusText(appointment.vaccineStatus)}</CardText>
                            <CardText><strong>Vaccine Name:</strong> {appointment.vaccine.vaccineName}</CardText>
                            <CardText><strong>Slot timing:</strong> {appointment.slot.startTime} - {appointment.slot.endTime}</CardText>
                            <CardText><strong>Center Name:</strong> {appointment.slot.center.centerName}</CardText>
                            <Button color="primary" onClick={() => handleStatus(appointment)} disabled={!appointment.vaccineStatus}>Download pdf</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default MyAppointment;