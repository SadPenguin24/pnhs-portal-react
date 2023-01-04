import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  Spinner,
  Table,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';
import { useGetRoleQuery } from '../../redux/api/userApi';

function AdminFacultyMasterlistScreen() {
  const { register, handleSubmit } = useForm();

  const [role_name] = useState('faculty');
  const [searchResults, setSearchResults]: any = useState([]);
  const [searching, setSearching] = useState(false);

  const {
    data: faculties,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRoleQuery(role_name);

  const searchStudent = ({ lastName }: any) => {
    setSearching(true);
    console.log(searching);

    const condition = new RegExp(lastName.trim(), 'i');

    const result = faculties.filter((student: any) =>
      condition.test(student.last_name)
    );
    console.log(result);
    setSearchResults(result);
  };

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
          {searchResults.length > 0 && faculties.length > 0 && searching ? (
            searchResults.map((faculty: any) => (
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
          ) : faculties.length > 0 &&
            searchResults.length === 0 &&
            !searching ? (
            faculties.map((faculty: any) => (
              <tr key={faculty._id}>
                <td>{faculty.last_name}</td>
                <td>{faculty.first_name}</td>
                <td>{faculty.middle_name}</td>
                <td className="d-flex justify-content-around">
                  <LinkContainer
                    to={`/admin/faculty/${faculty._id}`}
                    className="me-2"
                  >
                    <Button>View</Button>
                  </LinkContainer>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No Faculty
              </td>
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
        <Form
          onSubmit={handleSubmit(searchStudent)}
          className="d-flex justify-content-end"
        >
          <InputGroup className="w-50 d-flex mb-3">
            <Form.Control
              type="text"
              {...register('lastName')}
              style={{
                backgroundColor: '#ffe4a0',
                border: '#eaaa79 solid',
              }}
              placeholder="Search Faculty's Last Name"
            />
            <Button
              type="submit"
              style={{
                backgroundColor: '#ffe4a0',
                border: '#eaaa79 solid',
                borderLeft: 'none',
              }}
            >
              <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>
        </Form>
        {content}
      </Container>
    </div>
  );
}

export default AdminFacultyMasterlistScreen;
