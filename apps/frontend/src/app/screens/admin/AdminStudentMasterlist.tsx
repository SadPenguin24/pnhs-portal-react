/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';
import { useGetRoleQuery } from '../../redux/api/userApi';
import { setStudents } from '../../redux/slice/userSlice';
import { useAppDispatch } from '../../redux/store';

import '../../components/tables/tables.scss';
import { useForm } from 'react-hook-form';

function AdminStudentMasterlist() {
  const { register, handleSubmit } = useForm();

  const dispatch = useAppDispatch();

  const [role_name] = useState('student');
  const [searchResults, setSearchResults]: any = useState([]);
  const [searching, setSearching] = useState(false);

  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRoleQuery(role_name);

  useEffect(() => {
    dispatch(setStudents({ students }));
  }, [dispatch, students]);

  const searchStudent = ({ lastName, strand }: any) => {
    setSearching(true);
    console.log(searching);

    const condition = new RegExp(lastName.trim(), 'i');

    const result = students.filter((student: any) => {
      if (strand === 'All') {
        return condition.test(student.last_name);
      }
      return (
        condition.test(student.last_name) && strand === student.student.strand
      );
    });
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
    console.log(students);
    content = (
      <Table bordered className="tableColor" responsive="lg">
        <thead style={{ backgroundColor: '#2a6fd6' }}>
          <tr className="text-center">
            <th className="textWhite">Student No.</th>
            <th className="textWhite">Last Name</th>
            <th className="textWhite">First Name</th>
            <th className="textWhite">Middle Name</th>
            <th className="textWhite">Strand</th>
            <th className="textWhite">Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.length > 0 && students.length > 0 && searching ? (
            searchResults.map((student: any) => (
              <tr key={student._id}>
                <td>{student.student ? student.student.lrn : 'No LRN'}</td>
                <td>{student.last_name}</td>
                <td>{student.first_name}</td>
                <td>{student.middle_name}</td>
                <td>{student.student.strand}</td>
                <td className="d-flex justify-content-around">
                  <LinkContainer
                    to={`/admin/student/${student._id}?view`}
                    className="me-2"
                  >
                    <Button>View</Button>
                  </LinkContainer>
                  <LinkContainer to={`/admin/student/${student._id}?edit`}>
                    <Button>Edit</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))
          ) : students.length > 0 &&
            searchResults.length === 0 &&
            !searching ? (
            students.map((student: any) => (
              <tr key={student._id}>
                <td>{student.student ? student.student.lrn : 'No LRN'}</td>
                <td>{student.last_name}</td>
                <td>{student.first_name}</td>
                <td>{student.middle_name}</td>
                <td>{student.student.strand}</td>
                <td className="d-flex justify-content-around">
                  <LinkContainer
                    to={`/admin/student/${student._id}?view`}
                    className="me-2"
                  >
                    <Button>View</Button>
                  </LinkContainer>
                  <LinkContainer to={`/admin/student/${student._id}?edit`}>
                    <Button>Edit</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No Student
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
      <Header page="Student Masterlist" redirect="/admin/home" />
      <Container>
        {/* Search Bar */}
        <Form onSubmit={handleSubmit(searchStudent)} className="mb-3">
          <Row>
            <Col>
              <Form.Control
                type="text"
                {...register('lastName')}
                style={{
                  backgroundColor: '#ffe4a0',
                  border: '#eaaa79 solid',
                }}
                placeholder="Last Name"
              />
            </Col>
            <Col>
              <Form.Select
                {...register('strand')}
                style={{
                  backgroundColor: '#ffe4a0',
                  border: '#eaaa79 solid',
                }}
              >
                <option value="All">All Strand</option>
                {[
                  'ABM',
                  'GAS',
                  'HUMSS',
                  'SPORTS',
                  'STEM',
                  'TVL-COOKERY',
                  'TVL-HOME ECONOMICS',
                  'TVL-ICT',
                ].map((strand: any) => (
                  <option value={strand} key={strand}>
                    {strand}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Button type="submit" variant="secondary">
                Load
              </Button>
            </Col>
          </Row>
        </Form>
        {content}
      </Container>
    </div>
  );
}

export default AdminStudentMasterlist;
