import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useCreateUserMutation } from '../../redux/api/userApi';
import '../../styles/adminHome.scss';

function AdminCreateProfileScreen() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [faculty, setFaculty] = useState(false);
  const [admin, setAdmin] = useState(false);

  const [createUser] = useCreateUserMutation();

  const createUserHandler = async ({
    first_name,
    middle_name,
    last_name,
    email,
    password,
    role,
  }: any) => {
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
        <Form onSubmit={handleSubmit(createUserHandler)}>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              First Name:
            </Form.Label>
            <Col md={10}>
              <Form.Control required type="text" {...register('first_name')} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Middle Name:
            </Form.Label>
            <Col md={10}>
              <Form.Control required type="text" {...register('middle_name')} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Last Name:
            </Form.Label>
            <Col md={10}>
              <Form.Control required type="text" {...register('last_name')} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Email:
            </Form.Label>
            <Col md={10}>
              <Form.Control required type="email" {...register('email')} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Password:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                required
                type="password"
                {...register('password')}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Role:
            </Form.Label>
            <Col md={10}>
              <Form.Select {...register('role')}>
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
