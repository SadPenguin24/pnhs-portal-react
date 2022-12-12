import React, { useState } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import Header from '../../components/header/Header';

import '../../components/tables/tables.scss';
import { useGetParsedSchedulesQuery } from '../../redux/api/scheduleApi';
import { useGetParsedSectionsQuery } from '../../redux/api/sectionApi';

function FacultyScheduleScreen() {
  const [currentUser] = useState(JSON.parse(localStorage.getItem('userInfo')!));
  console.log(currentUser);

  const { data: sections } = useGetParsedSectionsQuery({});

  const {
    data: schedules,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetParsedSchedulesQuery({});

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
    console.log(schedules);
    content = (
      <Table bordered className="tableColor" responsive="sm">
        <thead style={{ backgroundColor: '#2867b1' }}>
          <tr className="text-center">
            <th className="textWhite">Type</th>
            <th className="textWhite">Subject</th>
            <th className="textWhite">Day</th>
            <th className="textWhite">Time</th>
            <th className="textWhite">Section</th>
          </tr>
        </thead>
        <tbody>
          {currentUser.faculty.handled_subjects.length > 0 ? (
            sections &&
            schedules &&
            schedules.map(
              (schedule: any) =>
                currentUser.faculty.handled_subjects.find(
                  ({ schedule_id }: any) => schedule_id === schedule._id
                ) && (
                  <tr>
                    <td>What is type?</td>
                    <td>{schedule.subject.subject_name}</td>
                    <td>
                      {schedule.days.map((day: any, index: any, array: any) => {
                        array = array.length - 1;
                        if (array === index) {
                          return day;
                        }
                        return day + '/';
                      })}
                    </td>
                    <td>
                      {schedule.time_in} - {schedule.time_out}
                    </td>
                    <td>
                      {sections.map(
                        (section: any) =>
                          currentUser.faculty.handled_subjects.find(
                            ({ section_id }: any) => section_id === section._id
                          ) && section.section_name
                      )}
                    </td>
                  </tr>
                )
            )
          ) : (
            <tr className="text-center">
              <td colSpan={5}>No schedule</td>
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
      <Header page="Faculty Schedule" redirect="/faculty/home" />
      <Container>{content}</Container>
    </div>
  );
}

export default FacultyScheduleScreen;
