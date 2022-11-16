/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { Container, FormControl, Spinner } from 'react-bootstrap';
import Header from '../../components/header/Header';
import { MasterlistTable } from '../../components/tables/Tables';
import { useGetAllProfileQuery } from '../../redux/api/userApi';
import { setAllUsers } from '../../redux/slice/userSlice';
import { useAppDispatch } from '../../redux/store';

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
        <MasterlistTable
          headerColor="#2a6fd6"
          studentRole={true}
          students={students}
        />
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
