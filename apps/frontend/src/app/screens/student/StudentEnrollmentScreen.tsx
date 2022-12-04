import React, { useState } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import {
  useGetParsedSectionQuery,
  useUpdateSectionMutation,
} from '../../redux/api/sectionApi';
import '../../components/tables/tables.scss';

function StudentEnrollmentScreen() {
  const { sectionId } = useParams();

  const navigate = useNavigate();

  const [currentUser] = useState(JSON.parse(localStorage.getItem('userInfo')!));
  const [students_id]: any = useState([]);

  const {
    data: section,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetParsedSectionQuery(sectionId);

  const [updateSection] = useUpdateSectionMutation();

  const enrollToSection = async () => {
    const id = section._id;
    if (!students_id.includes(currentUser._id)) {
      students_id.push(currentUser._id);
    }
    console.log('Yes', id, students_id);

    try {
      await updateSection({
        id,
        students_id,
      });

      alert('Successfully enroll to section');

      navigate('/student/home');
    } catch (error) {
      console.log(error);
    }
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
    console.log(section);
    section.students.map((student: any) => {
      if (!students_id.includes(student._id)) {
        students_id.push(student._id);
      }
    });
    content = (
      <>
        <div className="mb-2">Section: {section.section_name}</div>
        <div className="mb-2">
          Class Adviser:{' '}
          {section.teacher.first_name + ' ' + section.teacher.last_name}
        </div>
        <div className="mb-2">Strand: {section.strand}</div>
        <div className="mb-2">Grade Level: {section.grade_level}</div>
        <div className="mb-2">Term: {section.term}</div>
        <div className="mb-4">School Year: {section.school_year}</div>
        <h3>Schedules</h3>
        <Table bordered className="tableColor mb-3" responsive="lg">
          <thead style={{ backgroundColor: '#19940e' }}>
            <tr className="text-center">
              <th>Subject</th>
              <th>Faculty</th>
              <th>Days</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {section.schedules.length > 0 ? (
              section.schedules.map((schedule: any) => (
                <tr key={schedule._id}>
                  <td>{schedule.subject.subject_name}</td>
                  <td>
                    {schedule.teacher.first_name +
                      ' ' +
                      schedule.teacher.last_name}
                  </td>
                  <td>
                    {schedule.days.map((day: any, index: any, array: any) => {
                      array = array.length - 1;
                      if (array === index) {
                        return day;
                      }
                      return day + ' / ';
                    })}
                  </td>
                  <td>{schedule.time_in + ' - ' + schedule.time_out}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No Schedule
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Button
          onClick={() => {
            if (
              confirm('Do you really want to enroll on this section?') === true
            ) {
              enrollToSection();
            }
          }}
        >
          Enroll Now
        </Button>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header
        page="Enrollment / Registration"
        redirect="/student/enrollment/sections"
      />
      <Container>{content}</Container>
    </div>
  );
}

export default StudentEnrollmentScreen;
