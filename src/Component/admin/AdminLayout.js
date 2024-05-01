import { Link, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';

const AdminLayout = () => {
    const admin = JSON.parse(sessionStorage.getItem('Admin'));


    return (
        <>
            <Navbar color="light" light expand="md">
                <Container className="d-flex justify-content-between">
                    <Nav className="ml-auto" navbar>
                        <NavbarBrand className="mr-auto">Vaccination App</NavbarBrand>
                        <NavItem>
                            <NavLink className="nav-link" tag={Link} to={`/admin/${admin.email}/manageSlots`}>Create Slot</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" tag={Link} to={`/admin/${admin.email}`}>Manage Center</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" tag={Link} to={`/admin/${admin.email}/manageVaccines`}>Manage Vaccine</NavLink>
                        </NavItem>
                        <NavItem>
                        <UncontrolledDropdown inNavbar>
                            <DropdownToggle nav caret>
                                Manage patients
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem tag={Link} to={`/admin/${admin.email}/manageAppointments`}>Manage appointments</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem tag={Link} to={`/admin/${admin.email}/sideEffects`}>Side effect complaints</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </NavItem>

                    </Nav>
                    <NavbarText>
                        <UncontrolledDropdown inNavbar>
                            <DropdownToggle nav caret>
                                Profile
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem tag={Link} to={`/admin/${admin.email}/profile`}>View Profile</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem tag={Link} to={`/admin/login`}>Logout</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </NavbarText>
                </Container>
            </Navbar>


            <Outlet />
        </>
    );
}

export default AdminLayout;