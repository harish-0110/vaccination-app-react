import { Link, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';

const SuperAdminLayout = () => {
    const superAdmin = JSON.parse(sessionStorage.getItem('SuperAdmin'));


    return (
        <>
            <Navbar color="light" light expand="md">
                <Container className="d-flex justify-content-between">
                    <Nav className="ml-auto" navbar>
                        <NavbarBrand className="mr-auto">Vaccination App</NavbarBrand>

                        <NavItem>
                            <NavLink className="nav-link" tag={Link} to={`/superAdmin/${superAdmin.email}`}>Create Center</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" tag={Link} to={`/superAdmin/${superAdmin.email}/createVaccine`}>Create Vaccine</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" tag={Link} to={`/superAdmin/${superAdmin.email}/createAdmin`}>Create Admin</NavLink>
                        </NavItem>

                    </Nav>
                    <NavbarText>
                        <UncontrolledDropdown inNavbar>
                            <DropdownToggle nav caret>
                                Profile
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem tag={Link} to={`/superAdmin/${superAdmin.email}/profile`}>View Profile</DropdownItem>
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

export default SuperAdminLayout;