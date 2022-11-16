import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Header from '../../components/header/Header';

function AdminProfileScreen() {
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Admin Profile" redirect="/admin/home" />
      <Container>
        <div
          style={{ width: '100px', height: '100px', border: 'solid' }}
          className="mb-5"
        >
          Picture
        </div>
        <div>
          <div className="mb-2">
            <strong>Last Name:</strong> Villadolid
          </div>
          <div className="mb-2">
            <strong>First Name:</strong> Dan Hendrix
          </div>
          <div className="mb-2">
            <strong>Middle Name:</strong> Frayre
          </div>
          <div className="mb-2">
            <strong>Sex:</strong> Male
          </div>
          <div className="mb-2">
            <strong>Age:</strong> 23
          </div>
          <div className="mb-2">
            <strong>Birthdate:</strong> sample
          </div>
          <div className="mb-2">
            <strong>Birthplace:</strong> sample
          </div>
          <div className="mb-2">
            <strong>Contact Number:</strong> sample
          </div>
          <div className="mb-2">
            <strong>Role:</strong> Admin
          </div>
        </div>
        <div className="d-flex justify-content-center mb-2">
          <Button variant="secondary" className="me-5">
            Edit
          </Button>
          <Button>Save</Button>
        </div>
      </Container>
    </div>
  );
}

export default AdminProfileScreen;
