import React, { useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  Spinner,
  Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';
import { useGetRoleQuery } from '../../redux/api/userApi';

function AdminFacultyMasterlistScreen() {
  const [role_name] = useState('faculty');

  const {
    data: faculties,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRoleQuery(role_name);

  let content;
  if (isLoading) {
    content = (
      <div className="text-center">
        <Spinner variant="primary" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (isSuccess) {
    content = (
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
          {faculties ? (
            faculties.map((faculty: any) => (
              <tr key={faculty._id}>
                <td>
                  <LinkContainer to={`/admin/faculty/${faculty._id}`}>
                    <Button>View faculty</Button>
                  </LinkContainer>
                </td>
                <td>{faculty.last_name}</td>
                <td>{faculty.first_name}</td>
                <td>{faculty.middle_name}</td>
                <td>11</td>
                <td>17</td>
                <td>December 25, 2015</td>
                <td>Pangasinan</td>
                <td>09999999999</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10}>No facultys</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Faculty Masterlist" redirect="/admin/home" />
      <Container>
        {/* Search Bar */}
        {/* <div className="d-flex justify-content-end mb-3">
          <div className="w-50">
            <FormControl
              style={{ backgroundColor: '#ffe4a0', border: '#eaaa79 solid' }}
              placeholder="Enter Faculty Name"
            ></FormControl>
          </div>
        </div> */}
        {content}
      </Container>
    </div>
  );
}

export default AdminFacultyMasterlistScreen;
