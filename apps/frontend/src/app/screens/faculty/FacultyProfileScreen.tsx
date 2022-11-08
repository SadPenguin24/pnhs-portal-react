import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/header/Header';

function FacultyProfileScreen() {
  return (
    <div>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="My Profile" redirect="/faculty/home" />
      <Container>
        <div className="mb-3">Image</div>
        <div className="mb-2">Last Name: sample</div>
        <div className="mb-2">First Name: sample</div>
        <div className="mb-2">Middle Name: sample</div>
        <div className="mb-2">Age: sample</div>
        <div className="mb-2">Address: sample</div>
        <div className="mb-2">Birthdate: sample</div>
        <div className="mb-2">Birthplace: sample</div>
        <div className="mb-2">Religion: sample</div>
        <div className="mb-2">Contact Number: sample</div>
      </Container>
    </div>
  );
}

export default FacultyProfileScreen;
