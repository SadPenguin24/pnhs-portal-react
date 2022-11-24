import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';

function FacultyProfileScreen() {
  const [notEditing, setNotEditing] = useState(true);

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="My Profile" redirect="/faculty/home" />
      <Container>
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
        <div>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column lg="1" md="2">
              Last Name:
            </Form.Label>
            <Col lg="11" md="10">
              <Form.Control
                plaintext={notEditing}
                readOnly={notEditing}
                defaultValue="Villadolid"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column lg="1" md="2">
              First Name:
            </Form.Label>
            <Col lg="11" md="10">
              <Form.Control
                plaintext={notEditing}
                readOnly={notEditing}
                defaultValue="Dan Hendrix"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column lg="1" md="2">
              Middle Name:
            </Form.Label>
            <Col lg="11" md="10">
              <Form.Control
                plaintext={notEditing}
                readOnly={notEditing}
                defaultValue="Frayre"
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
                defaultValue="23"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column lg="1" md="2">
              Address:
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
              Birthdate:
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
              Birthplace:
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
              Contact Number:
            </Form.Label>
            <Col lg="11" md="10">
              <Form.Control
                plaintext={notEditing}
                readOnly={notEditing}
                defaultValue="sample"
              />
            </Col>
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center mb-2">
          {notEditing ? (
            <Button onClick={() => setNotEditing(false)}>Edit</Button>
          ) : (
            <Button onClick={() => setNotEditing(true)}>Save</Button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default FacultyProfileScreen;
