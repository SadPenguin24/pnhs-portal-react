import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Header from '../../components/header/Header';
import { useUpdateUserMutation } from '../../redux/api/userApi';

function StudentProfileScreen() {
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
      <Header page="Student Profile" redirect="/student/home" />
      <Container>
        <Form onSubmit={handleSubmit(updateHandler)}>
          <div className="text-end my-0">
            Personal Data / Family / Enrollment
          </div>
          <div>
            <strong>Personal Data:</strong>
          </div>

          {notEditing ? (
            <div
              style={{ width: '100px', height: '100px', border: 'solid' }}
              className="mb-5"
            >
              Picture
            </div>
          ) : (
            <Form.Group as={Row} className="mb-2">
              <Form.Label column lg="1" md="2">
                Image:
              </Form.Label>
              <Col lg="11" md="10">
                <Form.Control type="file" />
              </Col>
            </Form.Group>
          )}

          {/* <Form.Group as={Row} className="mt-3 mb-2">
          <Form.Label column lg="1" md="2">
            Student No.:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group> */}
          {/* <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            School Group:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Student Batch:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group> */}
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
          {/* <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Sex:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Age:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Date of Birth:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Place of Birth:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Nationality:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Civil Status:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Religion:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            LRN:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Mother Tongue:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <div className="mt-3 mb-1">
          <strong>Contact Information:</strong>
        </div>
        <div>Address:</div>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Street:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Barangay:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            City:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Province:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Country:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Zip Code:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Contact No.:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Email Address:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <div className="mt-3 mb-1">
          <strong>Parents/Guardian Information:</strong>
        </div>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Mother:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Mother's Contact No.:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Father:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Father's Contact No.:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Guardian:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column lg="1" md="2">
            Guardian's Contact No.:
          </Form.Label>
          <Col lg="11" md="10">
            <Form.Control
              plaintext={notEditing}
              readOnly={notEditing}
              defaultValue="sample"
            />
          </Col>
        </Form.Group> */}
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

export default StudentProfileScreen;
