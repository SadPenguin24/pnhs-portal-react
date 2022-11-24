import React from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useGetUserByIdQuery } from '../../redux/api/userApi';

function AdminStudentProfileScreen() {
  const { id } = useParams();

  const {
    data: student,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserByIdQuery(id);

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
    console.log(student);
    content = (
      <>
        <div
          className="p-3 mb-5 mx-auto w-75"
          style={{
            backgroundColor: '#fffefe',
            border: '1px solid',
          }}
        >
          <h4 className="mb-5">Student</h4>
          <div>Student No.: {student._id}</div>
          <div>Last Name: {student.last_name}</div>
          <div>First Name: {student.first_name}</div>
          <div>Middle Name: {student.middle_name}</div>
          <div>Grade Level:</div>
          <div>Age:</div>
          <div>Birthdate:</div>
          <div>Birthplace:</div>
          <div>Contact Number:</div>
        </div>
        <div className="text-center">
          <Button className="me-5">Save</Button>
          <Button variant="danger">Exit</Button>
        </div>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header redirect="/admin/studentlist" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminStudentProfileScreen;
