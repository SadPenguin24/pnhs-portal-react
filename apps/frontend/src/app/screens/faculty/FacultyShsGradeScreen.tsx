import React from 'react';
import {
  Button,
  Col,
  Container,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
  Table,
} from 'react-bootstrap';
import Header from '../../components/header/Header';

import '../../components/tables/tables.scss';

function FacultyShsGradeScreen() {
  return (
    <div>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="SHS Grade" redirect="/faculty/home" />
      <Container>
        <Row>
          <FormGroup as={Col} className="d-lg-flex">
            <FormLabel className="me-2 my-auto">Grade</FormLabel>
            <FormSelect style={{ height: '37.6px' }}>
              <option>All</option>
              <option>11</option>
              <option>12</option>
            </FormSelect>
          </FormGroup>
          <FormGroup as={Col} className="d-lg-flex">
            <FormLabel className="me-2 my-auto">Subject</FormLabel>
            <FormSelect style={{ height: '37.6px' }}>
              <option>All</option>
              <option>General Mathematics</option>
              <option>Physical Education</option>
            </FormSelect>
          </FormGroup>
          <FormGroup as={Col} className="d-lg-flex">
            <FormLabel className="me-2 my-auto">Term</FormLabel>
            <FormSelect style={{ height: '37.6px' }}>
              <option>All</option>
              <option>First semester</option>
              <option>Second semester</option>
            </FormSelect>
          </FormGroup>
          <Col className="my-auto">
            <Button variant="secondary">Load</Button>
          </Col>
        </Row>
        <Table bordered className="mt-5 tableColor" responsive="sm">
          <thead style={{ backgroundColor: '#2867b1' }}>
            <tr className="text-center">
              <th className="textWhite">Student No.</th>
              <th className="textWhite">Name</th>
              <th className="textWhite">Subject</th>
              <th className="textWhite">Unit</th>
              <th className="textWhite">1st Q</th>
              <th className="textWhite">2nd Q</th>
              <th className="textWhite">Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sample</td>
              <td>sample</td>
              <td>sample</td>
              <td>sample</td>
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

export default FacultyShsGradeScreen;
