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
    console.log(faculties);
    content = (
      <Table bordered className="tableColor" responsive="lg">
        <thead style={{ backgroundColor: '#2a6fd6' }}>
          <tr className="text-center">
            <th className="textWhite">Last Name</th>
            <th className="textWhite">First Name</th>
            <th className="textWhite">Middle Name</th>
            <th className="textWhite">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculties.length > 0 ? (
            faculties.map((faculty: any) => (
              <tr key={faculty._id}>
                <td>{faculty.last_name}</td>
                <td>{faculty.first_name}</td>
                <td>{faculty.middle_name}</td>
                <td className="text-center">
                  <LinkContainer to={`/admin/faculty/${faculty._id}`}>
                    <Button>View faculty</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No Faculty</td>
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
