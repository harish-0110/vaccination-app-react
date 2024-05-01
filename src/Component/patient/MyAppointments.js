import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { toast } from "react-toastify";


const MyAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [sideEffectText, setSideEffectText] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
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
    const toggleModal = () => setModal(!modal);

    const handleAddAfterEffects = (appointment) => {
        setSelectedAppointment(appointment);
        toggleModal();
    };

    const submitSideEffect = () => {
        if (!sideEffectText.trim()) {
            alert("Please enter a side effect description.");
            return;
        }
        // Here you would call an API to submit the side effect using selectedAppointment and sideEffectText
        console.log("Submitting Side Effect:", sideEffectText, "for Appointment ID:", selectedAppointment.bookingId);
        // After submission, you can reset the state and close the modal
        setSideEffectText('');
        toggleModal();
        toast.success('feedback submitted', { autoClose: 1000 });
    };

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
                            <Button color="primary" onClick={() => handleStatus(appointment)} disabled={!appointment.vaccineStatus}>Download pdf</Button>{' '}
                            <Button color="primary" onClick={() => handleAddAfterEffects(appointment)} disabled={!appointment.vaccineStatus}>Add After effects</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add After Effects</ModalHeader>
                <ModalBody>
                    <Input type="textarea" value={sideEffectText} onChange={(e) => setSideEffectText(e.target.value)} placeholder="Describe the side effects" />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={submitSideEffect}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default MyAppointment;