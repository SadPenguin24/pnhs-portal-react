/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  Spinner,
  Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';
import { useGetAllProfileQuery } from '../../redux/api/userApi';
import { setAllUsers } from '../../redux/slice/userSlice';
import { useAppDispatch } from '../../redux/store';

import '../../components/tables/tables.scss';

function AdminStudentMasterlist() {
  const dispatch = useAppDispatch();

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllProfileQuery({});

  // eslint-disable-next-line prefer-const
  let students: any[] = [];

  const getStudents = (item: any) => {
    if (item.role[0] === 'student') {
      students.push(item);
    }
  };

  if (users) {
    users.forEach(getStudents);
  }

  useEffect(() => {
    dispatch(setAllUsers({ users }));
  }, [dispatch, users]);

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
    console.log('THIS IS PROFILE: ', students);
    content = (
      <>
        <div className="d-flex justify-content-end mb-3">
          <div className="w-50">
            <FormControl
              style={{ backgroundColor: '#ffe4a0', border: '#eaaa79 solid' }}
              placeholder="Enter Student Name"
            ></FormControl>
          </div>
        </div>

        <Table bordered className="tableColor" responsive="lg">
          <thead style={{ backgroundColor: '#2a6fd6' }}>
            <tr className="text-center">
              <th className="textWhite">Actions</th>
              <th className="textWhite">Student No.</th>
              <th className="textWhite">Last Name</th>
              <th className="textWhite">First Name</th>
              <th className="textWhite">Middle Name</th>
              <th className="textWhite">Grade Level</th>
              <th className="textWhite">Age</th>
              <th className="textWhite">Birthdate</th>
              <th className="textWhite">Birthplace</th>
              <th className="textWhite">Contact #</th>
            </tr>
          </thead>
          <tbody>
            {students ? (
              students.map((student: any) => (
                <tr key={student._id}>
                  <td>
                    <LinkContainer to="/admin/student">
                      <Button>View Student</Button>
                    </LinkContainer>
                  </td>
                  <td>{student.student._id}</td>
                  <td>{student.last_name}</td>
                  <td>{student.first_name}</td>
                  <td>{student.middle_name}</td>
                  <td>11</td>
                  <td>17</td>
                  <td>December 25, 2015</td>
                  <td>Pangasinan</td>
                  <td>09999999999</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10}>No Students</td>
              </tr>
            )}
          </tbody>
        </Table>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Student Masterlist" redirect="/admin/home" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminStudentMasterlist;
