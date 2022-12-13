import React, { useState, useRef } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Header from '../../components/header/Header';
import { PrintStudentSchedule } from '../../components/print/Print';

import '../../components/tables/tables.scss';
import { useGetParsedSectionsQuery } from '../../redux/api/sectionApi';

function StudentScheduleScreen() {
  const componentRef = useRef(null);

  const [currentUser] = useState(JSON.parse(localStorage.getItem('userInfo')!));

  const {
    data: sections,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetParsedSectionsQuery({});

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
    const studentSection = sections.find(
      ({ _id }: any) => _id === currentUser.student.section_id
    );
    console.log(studentSection);
    content = (
      <>
        {studentSection ? (
          <>
            <h4>
              <strong>Class Program</strong>
            </h4>
            <h4>
              <strong>
                Grade {studentSection.grade_level} -{' '}
                {studentSection.section_name}
              </strong>
            </h4>
            <h4>
              <strong>SY. {studentSection.school_year}</strong>
            </h4>
            <h4>
              <strong>
                Adviser:{' '}
                {studentSection.teacher.first_name +
                  ' ' +
                  studentSection.teacher.last_name}
              </strong>
            </h4>
            <h4 className="mb-5">
              <strong>
                {'Student: ' +
                  currentUser.first_name +
                  ' ' +
                  currentUser.last_name}
              </strong>
            </h4>
            <div className="text-start">
              <ReactToPrint
                documentTitle="Student_Schedule"
                trigger={() => <Link to={''}>Print Preview</Link>}
                content={() => componentRef.current}
              />
              <div style={{ display: 'none' }}>
                <div ref={componentRef}>
                  <PrintStudentSchedule
                    studentSection={studentSection}
                    currentUser={currentUser}
                  />
                </div>
              </div>
            </div>
            <Table bordered className="tableColor">
              <thead>
                <tr
                  className="text-center"
                  style={{ backgroundColor: '#1DA914' }}
                >
                  <th>DAY</th>
                  <th>TIME</th>
                  <th>SUBJECT</th>
                  <th>TEACHER</th>
                </tr>
              </thead>
              <tbody>
                {studentSection.schedules.length > 0 ? (
                  studentSection.schedules.map((schedule: any) => (
                    <tr key={schedule._id}>
                      <td>
                        {schedule.days.map(
                          (day: any, index: any, array: any) => {
                            array = array.length - 1;
                            if (array === index) {
                              return day;
                            }
                            return day + '/';
                          }
                        )}
                      </td>
                      <td>
                        {schedule.time_in} - {schedule.time_out}
                      </td>
                      <td>{schedule.subject.subject_name}</td>
                      <td>
                        {schedule.teacher.first_name +
                          ' ' +
                          schedule.teacher.last_name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">
                    <td colSpan={4}>No schedule</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </>
        ) : (
          <h4>
            <strong style={{ color: 'red' }}>
              You are not enrolled to any section.
            </strong>
          </h4>
        )}
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Schedule / Subjects" redirect="/student/home" />
      <Container>
        <div className="text-center">
          <h4>
            <strong>REGION 1</strong>
          </h4>
          <h4>
            <strong>Schools Division Office 1 PANGASINAN</strong>
          </h4>
          <h4>
            <strong>PANGASINAN NATIONAL HIGH SCHOOL</strong>
          </h4>
          <h4 className="mb-5">
            <strong>Lingayen, Pangasinan</strong>
          </h4>
          {content}
        </div>
      </Container>
    </div>
  );
}

export default StudentScheduleScreen;
