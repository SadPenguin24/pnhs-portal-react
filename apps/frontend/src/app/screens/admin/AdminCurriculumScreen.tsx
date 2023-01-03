import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';

function AdminCurriculumScreen() {
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="SHS Curriculum" redirect="/admin/home" />
      <Container>
        <div className="text-end mb-3">
          <LinkContainer to="/admin/curriculum/create">
            <Button className="me-3">Create Curriculum</Button>
          </LinkContainer>
        </div>
        <Table bordered className="tableColor" responsive="sm">
          <thead style={{ backgroundColor: '#2a6fd6' }}>
            <tr className="text-center">
              <th>School Year</th>
              <th>Strand</th>
              <th>Grade Level</th>
              <th>Term</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2022-2023</td>
              <td>ABM</td>
              <td>11</td>
              <td>1</td>
              <td>
                <Button variant="primary">View Subject</Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminCurriculumScreen;
