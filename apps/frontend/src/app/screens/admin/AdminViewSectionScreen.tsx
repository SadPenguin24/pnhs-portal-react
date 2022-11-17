import React, { useEffect } from 'react';
import { Container, FormSelect, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useGetSectionQuery } from '../../redux/api/sectionApi';
import { getSection } from '../../redux/slice/sectionSlice';
import { useAppDispatch } from '../../redux/store';

function AdminViewSectionScreen() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const {
    data: section,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSectionQuery(id);

  console.log(section);

  useEffect(() => {
    dispatch(getSection({ section }));
  }, [dispatch, section]);

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
          <strong>Section Name:</strong> {section.section_name}
        </div>
        <div className="mb-2">
          <strong>Teacher Id:</strong> {section.teacher_id}
        </div>
        <div className="mb-2">
          <strong>School Year:</strong> {section.school_year}
        </div>
        <div className="mb-2">
          <strong>Students Id:</strong>
          <FormSelect>
            {section ? (
              section.students_id.map((student: any) => (
                <option key={student}>{student}</option>
              ))
            ) : (
              <option>No student</option>
            )}
          </FormSelect>
        </div>
        <div className="mb-2">
          <strong>Subjects:</strong>
          <FormSelect>
            {section ? (
              section.subjects.map((subject: any) => (
                <option key={subject._id}>{subject.subject_name}</option>
              ))
            ) : (
              <option>No subject</option>
            )}
          </FormSelect>
        </div>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Student Section" redirect="/admin/section" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminViewSectionScreen;
