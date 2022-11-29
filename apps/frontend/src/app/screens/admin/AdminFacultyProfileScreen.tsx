import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '../../redux/api/userApi';

function AdminFacultyProfileScreen() {
  const { id } = useParams();

  const [notEditing, setNotEditing] = useState(true);

  const { register, handleSubmit } = useForm();

  const {
    data: faculty,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserByIdQuery(id);

  const [updateFaculty] = useUpdateUserMutation();

  const updateHandler = async ({
    first_name,
    middle_name,
    last_name,
    email,
  }: any) => {
    try {
      await updateFaculty({
        id,
        first_name,
        middle_name,
        last_name,
        email,
      });

      alert('Successfully update faculty');
      setNotEditing(true);
    } catch (error) {
      alert(error);
    }
  };

  let content;

  if (isLoading) {
    content = (
      <div className="text-center">
        <Spinner variant="primary" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (isSuccess) {
    console.log(faculty);
    content = (
      <Form onSubmit={handleSubmit(updateHandler)}>
        <div
          className="p-3 mb-5 mx-auto w-75"
          style={{
            backgroundColor: '#fffefe',
            border: '1px solid',
          }}
        >
          <h4 className="mb-5">Student</h4>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Last Name:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="text"
                {...register('last_name')}
                defaultValue={faculty.last_name}
                readOnly={notEditing}
                plaintext={notEditing}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              First Name:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="text"
                {...register('first_name')}
                defaultValue={faculty.first_name}
                readOnly={notEditing}
                plaintext={notEditing}
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
                {...register('middle_name')}
                defaultValue={faculty.middle_name}
                readOnly={notEditing}
                plaintext={notEditing}
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
                {...register('email')}
                defaultValue={faculty.email}
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
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header redirect="/admin/facultylist" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminFacultyProfileScreen;
