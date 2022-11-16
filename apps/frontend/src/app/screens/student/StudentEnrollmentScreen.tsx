import React from 'react';
import {
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from 'react-bootstrap';
import Header from '../../components/header/Header';

import '../../components/tables/tables.scss';

function StudentEnrollmentScreen() {
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Enrollment / Registration" redirect="/student/home" />
      <Container>
        <div className="mb-2">Student No.:</div>
        <div className="mb-2">Name:</div>
        <div className="mb-2">School Year:</div>
        <div className="mb-2">Semester:</div>
        <div className="mb-2">Curriculum Ref. No.:</div>

        <FormGroup as={Row} className="mb-3">
          <FormLabel column lg="2" md="4">
            Grade Level&Sec / Strand:
          </FormLabel>
          <Col lg="10" md="8">
            <FormControl></FormControl>
          </Col>
        </FormGroup>

        <div className="text-end mb-3">
          <Button variant="secondary">Load Section</Button>
        </div>

        <Table bordered className="tableColor mb-3">
          <thead style={{ backgroundColor: '#19940e' }}>
            <tr className="text-center">
              <th>Type</th>
              <th>Subject</th>
              <th>Unit</th>
              <th>Day and Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sample</td>
              <td>sample</td>
              <td>sample</td>
              <td>sample</td>
            </tr>
          </tbody>
        </Table>

        <div className="text-center mb-2">
          <Button
            variant="secondary"
            className="me-5"
            style={{ width: '110px' }}
          >
            Enroll Now
          </Button>
          <Button variant="danger" style={{ width: '110px' }}>
            Exit
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default StudentEnrollmentScreen;
