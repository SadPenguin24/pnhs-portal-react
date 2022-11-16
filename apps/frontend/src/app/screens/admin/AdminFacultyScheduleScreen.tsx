import React from 'react';
import {
  Button,
  Col,
  Container,
  FormControl,
  Row,
  Table,
} from 'react-bootstrap';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';

function AdminFacultyScheduleScreen() {
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Faculty Schedule" redirect="/admin/home" />
      <Container>
        <Row>
          <Col>
            <FormControl
              style={{ backgroundColor: '#ffe4a0', border: '#eaaa79 solid' }}
              placeholder="Teacher's Name"
            ></FormControl>
          </Col>
          <Col>
            <FormControl
              style={{ backgroundColor: '#ffe4a0', border: '#eaaa79 solid' }}
              placeholder="S.Y. & Term"
            ></FormControl>
          </Col>
          <Col className="d-grid gap-2">
            <Button variant="secondary">Load</Button>
          </Col>
        </Row>
        <div className="text-end my-3">
          <Button className="me-5">Add</Button>
          <Button className="me-5">Edit</Button>
          <Button className="me-5">Save</Button>
          <Button variant="danger">Delete</Button>
        </div>
        <Table bordered className="tableColor">
          <thead>
            <tr className="text-center">
              <th>Subject</th>
              <th>Time</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sample</td>
              <td>sample</td>
              <td>sample</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminFacultyScheduleScreen;
