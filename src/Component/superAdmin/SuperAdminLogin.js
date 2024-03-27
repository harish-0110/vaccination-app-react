import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './SuperAdminLogin.css';


const SuperAdminLogin = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const onChangeHandle = (e) => {
        setLogin(
            {
                ...login,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(login)
        axios.post('http://localhost:8090/admin/login', login).then(
            (res) => {
                console.log(res);
                sessionStorage.setItem('SuperAdmin', JSON.stringify(res.data));
                navigate(`/superAdmin/${res.data.email}`);
            }
        ).catch((err) => console.log(err));
    }

    return (
        <div className="page-container">
            <Card className="card-container">
                <CardBody>
                    <CardTitle className="card-title">Super Admin SignIn</CardTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input

                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={login.email}
                                onChange={onChangeHandle}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={login.password}
                                onChange={onChangeHandle}
                            />
                        </FormGroup>
                        <Button color="primary" type="submit">Submit</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default SuperAdminLogin;