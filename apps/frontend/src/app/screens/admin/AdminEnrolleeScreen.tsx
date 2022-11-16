import React, { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useGetEnrolleeByIdQuery } from '../../redux/api/enrolleeApi';
import { getEnrolleeById } from '../../redux/slice/enrolleeSlice';
import { useAppDispatch } from '../../redux/store';

function AdminEnrolleeScreen() {
  let { id } = useParams();

  const dispatch = useAppDispatch();

  const {
    data: enrollee,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEnrolleeByIdQuery(id);

  useEffect(() => {
    dispatch(getEnrolleeById({ enrollee }));
  });

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
      <>
        <div className="mb-2">
          <strong>First Name:</strong> {enrollee.first_name}
        </div>
        <div className="mb-2">
          <strong>Middle Name:</strong> {enrollee.middle_name}
        </div>
        <div className="mb-2">
          <strong>Last Name:</strong> {enrollee.last_name}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {enrollee.email}
        </div>
        <div className="mb-2">
          <strong>Address:</strong> {enrollee.address}
        </div>
        <div className="mb-2">
          <strong>Phone Number:</strong> {enrollee.phone_number}
        </div>
        <div className="mb-2">
          <strong>LRN:</strong> {enrollee.lrn}
        </div>
        <div className="mb-2">
          <strong>Strand:</strong> {enrollee.strand}
        </div>
        <div className="mb-2">
          <strong>Birth Certificate:</strong> {enrollee.birth_certificate}
        </div>
        <div className="mb-2">
          <strong>2x2 Picture:</strong> {enrollee.picture_2x2}
        </div>
        <div className="mb-2">
          <strong>Grade 10 Card:</strong> {enrollee.grade_10_card}
        </div>
        <div>
          <strong>Good Moral:</strong> {enrollee.good_moral}
        </div>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Strand/Enrollees/Subject" redirect="/admin/enrollees" />
      <Container className="mb-5">{content}</Container>
    </div>
  );
}

export default AdminEnrolleeScreen;
