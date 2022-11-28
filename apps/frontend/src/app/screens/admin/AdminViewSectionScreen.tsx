import React, { useEffect } from 'react';
import { Container, FormSelect, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useGetParsedSectionQuery } from '../../redux/api/sectionApi';
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
  } = useGetParsedSectionQuery(id);

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
          <strong>Students:</strong>
          <FormSelect>
            {section.students.length > 0 ? (
              section.students.map((student: any) => (
                <option key={student}>
                  {student.first_name} {student.last_name}
                </option>
              ))
            ) : (
              <option>No student</option>
            )}
          </FormSelect>
        </div>
        <div className="mb-2">
          <strong>Schedules:</strong>
          <FormSelect>
            {section.schedules.length > 0 ? (
              section.schedules.map((schedule: any) => (
                <option key={schedule._id}>
                  {schedule.subject.subject_name} (
                  {schedule.days.map((day: any, index: any, array: any) => {
                    array = array.length - 1;
                    if (array === index) {
                      return day.charAt(0) + ' - ';
                    }
                    return day.charAt(0) + ' / ';
                  })}
                  {schedule.time_in}-{schedule.time_out})
                </option>
              ))
            ) : (
              <option>No schedule</option>
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
