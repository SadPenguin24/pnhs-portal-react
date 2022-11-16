import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Header from '../../components/header/Header';

function StudentProfileScreen() {
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Student Profile" redirect="/student/home" />
      <Container>
        <div className="text-end my-0">Personal Data / Family / Enrollment</div>
        <div>
          <strong>Personal Data:</strong>
        </div>
        <div className="mt-3">Image</div>
        <div className="mt-3 mb-1 ms-3">Student No.:</div>
        <div className="mb-1 ms-3">School Group:</div>
        <div className="mb-1 ms-3">Student Batch:</div>
        <div className="mb-1 ms-3">Surname</div>
        <div className="mb-1 ms-3">First Name:</div>
        <div className="mb-1 ms-3">Middle Name:</div>
        <div className="mb-1 ms-3">Sex:</div>
        <div className="mb-1 ms-3">Age:</div>
        <div className="mb-1 ms-3">Date of Birth:</div>
        <div className="mb-1 ms-3">Place of Birth</div>
        <div className="mb-1 ms-3">Nationality:</div>
        <div className="mb-1 ms-3">Civil Status:</div>
        <div className="mb-1 ms-3">Religion:</div>
        <div className="mb-1 ms-3">LRN</div>
        <div className="mb-1 ms-3">Mother Tongue:</div>
        <div className="mt-3 mb-1">
          <strong>Contact Information:</strong>
        </div>
        <div className="ms-3">Address:</div>
        <div className="ms-5">Street:</div>
        <div className="ms-5">Barangay</div>
        <div className="ms-5">City</div>
        <div className="ms-5">Province:</div>
        <div className="ms-5">Country:</div>
        <div className="mb-1 ms-5">Zip Code:</div>
        <div className="mb-1 ms-3">Contact No.:</div>
        <div className="mb-1 ms-3">Email Address:</div>
        <div className="mt-3 mb-1">
          <strong>Parents/Guardian Information:</strong>
        </div>
        <div className="ms-3">Mother:</div>
        <div className="mb-2 ms-3">Contact No.:</div>
        <div className="ms-3">Father:</div>
        <div className="mb-2 ms-3">Contact No.:</div>
        <div className="ms-3">Guardian:</div>
        <div className="mb-3 ms-3">Contact No.:</div>
        <div className="text-center my-3">
          <Button className="me-4">Save</Button>
          <Button className="me-4">Exit</Button>
          <Button>Reset</Button>
        </div>
      </Container>
    </div>
  );
}

export default StudentProfileScreen;
