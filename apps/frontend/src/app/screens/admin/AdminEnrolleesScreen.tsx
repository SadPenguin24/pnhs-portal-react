import React from 'react';
import { Button, Container, FormControl, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';

function AdminEnrolleesScreen() {
  return (
    <div>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Strand/Enrollees/Subject" redirect="/admin/strand" />
      <Container>
        <div className="d-flex mb-3">
          <div className="w-50 me-3">
            <FormControl
              style={{ backgroundColor: '#ffe4a0', border: '#eaaa79 solid' }}
              placeholder="Grade/Section"
            ></FormControl>
          </div>
          <Button>Search</Button>
        </div>
        <Table bordered className="tableColor mb-3">
          <thead style={{ backgroundColor: '#2a6fd6' }}>
            <tr className="text-center">
              <th>Name</th>
              <th>Grade Level</th>
              <th>Section</th>
              <th>Adviser</th>
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
        <div className="text-center">
          <LinkContainer to="/admin/subject">
            <Button className="me-3">View Subject</Button>
          </LinkContainer>
          <Button variant="danger">Exit</Button>
        </div>
      </Container>
    </div>
  );
}

export default AdminEnrolleesScreen;
