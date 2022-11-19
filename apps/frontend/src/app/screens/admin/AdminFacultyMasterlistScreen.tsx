import React from 'react';
import { Button, Container, FormControl, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';

function AdminFacultyMasterlistScreen() {
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Faculty Masterlist" redirect="/admin/home" />
      <Container>
        <div className="d-flex justify-content-end mb-3">
          <div className="w-50">
            <FormControl
              style={{ backgroundColor: '#ffe4a0', border: '#eaaa79 solid' }}
              placeholder="Enter Faculty Name"
            ></FormControl>
          </div>
        </div>
        <Table bordered className="tableColor" responsive="lg">
          <thead style={{ backgroundColor: '#2a6fd6' }}>
            <tr className="text-center">
              <th className="textWhite">Actions</th>
              <th className="textWhite">Last Name</th>
              <th className="textWhite">First Name</th>
              <th className="textWhite">Middle Name</th>
              <th className="textWhite">Age</th>
              <th className="textWhite">Address</th>
              <th className="textWhite">Birthdate</th>
              <th className="textWhite">Birthplace</th>
              <th className="textWhite">Contact #</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <LinkContainer to="/admin/faculty">
                  <Button>View Faculty</Button>
                </LinkContainer>
              </td>
              <td>sample</td>
              <td>sample</td>
              <td>sample</td>
              <td>11</td>
              <td>17</td>
              <td>December 25, 2015</td>
              <td>Pangasinan</td>
              <td>09999999999</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminFacultyMasterlistScreen;
