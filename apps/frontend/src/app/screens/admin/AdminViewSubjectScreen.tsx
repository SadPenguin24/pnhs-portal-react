import React, { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useGetSubjectQuery } from '../../redux/api/subjectApi';
import { getSubject } from '../../redux/slice/subjectSlice';
import { useAppDispatch } from '../../redux/store';

function AdminViewSubjectScreen() {
  const { strand, id } = useParams();

  const dispatch = useAppDispatch();

  const {
    data: subject,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubjectQuery(id);

  useEffect(() => {
    dispatch(getSubject({ subject }));
  }, [dispatch, subject]);

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
          <strong>Strand:</strong> {subject.strand}
        </div>
        <div className="mb-2">
          <strong>Subject:</strong> {subject.subject_name}
        </div>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header
        page="Strand/Enrollees/Subject"
        redirect={`/admin/subject/${strand}`}
      />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminViewSubjectScreen;
