import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Header from '../../components/header/Header';
import { useUpdateUserMutation } from '../../redux/api/userApi';

function FacultyProfileScreen() {
  const [notEditing, setNotEditing] = useState(true);
  const [currentUser] = useState(JSON.parse(localStorage.getItem('userInfo')!));

  const { register, handleSubmit } = useForm();

  const [updateProfile] = useUpdateUserMutation();

  const updateHandler = async ({
    first_name,
    middle_name,
    last_name,
    email,
  }: any) => {
    const id = currentUser._id;
    try {
      await updateProfile({
        id,
        first_name,
        middle_name,
        last_name,
        email,
      });

      alert('Successfully update profile');
      setNotEditing(true);
    } catch (error) {
      alert(error);
    }
  };

  console.log(currentUser);

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="My Profile" redirect="/faculty/home" />
      <Container>
        <Form onSubmit={handleSubmit(updateHandler)}>
          <div>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column lg={1} md={2}>
                Last Name:
              </Form.Label>
              <Col lg={11} md={10}>
                <Form.Control
                  type="text"
                  {...register('last_name')}
                  defaultValue={currentUser.last_name}
                  readOnly={notEditing}
                  plaintext={notEditing}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column lg={1} md={2}>
                First Name:
              </Form.Label>
              <Col lg={11} md={10}>
                <Form.Control
                  type="text"
                  {...register('first_name')}
                  defaultValue={currentUser.first_name}
                  readOnly={notEditing}
                  plaintext={notEditing}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column lg={1} md={2}>
                Middle Name:
              </Form.Label>
              <Col lg={11} md={10}>
                <Form.Control
                  type="text"
                  {...register('middle_name')}
                  defaultValue={currentUser.middle_name}
                  readOnly={notEditing}
                  plaintext={notEditing}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column lg={1} md={2}>
                Email:
              </Form.Label>
              <Col lg={11} md={10}>
                <Form.Control
                  type="email"
                  {...register('email')}
                  defaultValue={currentUser.email}
                  readOnly={notEditing}
                  plaintext={notEditing}
                />
              </Col>
            </Form.Group>
          </div>
          <div className="text-center">
            {notEditing ? (
              <Button onClick={() => setNotEditing(false)}>Edit</Button>
            ) : (
              <div>
                <Button type="submit" className="me-3">
                  Save
                </Button>
                <Button variant="danger" onClick={() => setNotEditing(true)}>
                  Exit
                </Button>
              </div>
            )}
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default FacultyProfileScreen;
