import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';

function AdminSubjectScreen() {
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Strand/Enrollees/Subject" redirect="/admin/enrollees" />
      <Container>
        <div className="text-end mb-3">
          <Button className="me-3">Add Subject</Button>
          <Button variant="danger">Delete All</Button>
        </div>
        <Table bordered className="tableColor">
          <thead style={{ backgroundColor: '#2a6fd6' }}>
            <tr className="text-center">
              <th>Type</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sample</td>
              <td>sample</td>
              <td>Edit Delete</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminSubjectScreen;
