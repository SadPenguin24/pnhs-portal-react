import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useCreateUserMutation } from '../../redux/api/userApi';
import '../../styles/adminHome.scss';

function AdminCreateProfileScreen() {
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState(false);
  const [admin, setAdmin] = useState(false);

  const [first_name, setFirstName] = useState('');
  const [middle_name, setMiddleName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('faculty');

  const [createUser] = useCreateUserMutation();

  const createUserHandler = async (e: any) => {
    e.preventDefault();

    try {
      await createUser({
        first_name,
        middle_name,
        last_name,
        email,
        password,
        role,
      });

      alert(`Successfully create ${role} user.`);

      navigate('/admin/home');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Create Profile" redirect="/admin/home" />
      <Container>
        <Form onSubmit={createUserHandler}>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              First Name:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Middle Name:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="text"
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Last Name:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Email:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Password:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Role:
            </Form.Label>
            <Col md={10}>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Container>
    </div>
  );
}

export default AdminCreateProfileScreen;
