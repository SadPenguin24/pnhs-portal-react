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

function FacultyAdvisoryClassScreen() {
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Class List" redirect="/faculty/home" />
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
            <FormLabel className="me-2 my-auto">Section/Strand</FormLabel>
            <FormSelect style={{ height: '37.6px' }}>
              <option>All</option>
              <option>Section-1-ABM</option>
              <option>Section-1-STEM</option>
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

        <Table bordered className="mt-5 tableColor">
          <thead style={{ backgroundColor: '#2867b1' }}>
            <tr className="text-center">
              <th className="textWhite">Student No.</th>
              <th className="textWhite">Name</th>
              <th className="textWhite">Term</th>
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

export default FacultyAdvisoryClassScreen;
