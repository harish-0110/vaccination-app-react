import { Link, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './PatientLayout.css';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';

const PatientLayout = () => {
    const patientEmail = JSON.parse(sessionStorage.getItem('Patient')).email;


    return (
        <>
           
            <Navbar color="light" light expand="md">
                <Container className="d-flex justify-content-between">
                    <Nav className="ml-auto" navbar>
                        <NavbarBrand className="mr-auto">Vaccination App</NavbarBrand>

                        <NavItem>
                            <NavLink className="nav-link" tag={Link} to={`/patient/${patientEmail}`}>My Appointment</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" tag={Link} to={`/patient/${patientEmail}/viewCenters`}>Center</NavLink>
                        </NavItem>

                    </Nav>
                    <NavbarText>
                        <UncontrolledDropdown inNavbar>
                            <DropdownToggle nav caret>
                                Profile
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem tag={Link} to={`/patient/${patientEmail}/profile`}>View Profile</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Logout</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </NavbarText>
                </Container>
            </Navbar>


            <Outlet />
        </>
    );
}

export default PatientLayout;