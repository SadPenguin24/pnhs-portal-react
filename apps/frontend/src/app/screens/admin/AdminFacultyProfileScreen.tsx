import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Header from '../../components/header/Header';

function AdminFacultyProfileScreen() {
  return (
    <div>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header redirect="/admin/facultylist" />
      <Container>
        <div
          className="p-3 mb-5 mx-auto w-75"
          style={{
            backgroundColor: '#fffefe',
            border: '1px solid',
          }}
        >
          <h4 className="mb-5">Faculty</h4>
          <div>Student No.:</div>
          <div>Last Name:</div>
          <div>First Name:</div>
          <div>Middle Name:</div>
          <div>Age:</div>
          <div>Address:</div>
          <div>Birthdate:</div>
          <div>Birthplace:</div>
          <div>Contact Number:</div>
        </div>
        <div className="text-center">
          <Button className="me-5">Save</Button>
          <Button variant="danger">Exit</Button>
        </div>
      </Container>
    </div>
  );
}

export default AdminFacultyProfileScreen;
