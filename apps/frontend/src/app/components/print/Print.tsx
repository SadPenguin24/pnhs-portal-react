import React from 'react';
import { Col, Container, Image, Row, Table } from 'react-bootstrap';
import { ReportCardTable } from '../tables/Tables';
import '../header/header.scss';

export function PrintStudentRecordsGrade({
  eleven,
  elevenFirst,
  elevenSecond,
  twelve,
  twelveFirst,
  twelveSecond,
}: any) {
  console.log(
    eleven,
    elevenFirst,
    elevenSecond,
    twelve,
    twelveFirst,
    twelveSecond
  );
  return (
    <div>
      <nav className="topHeader py-2 mb-5">
        <Container>
          <Row className="text-center justify-content-center">
            <Col className="my-auto" lg="1" md="12" style={{ width: '95px' }}>
              <Image
                src="../../assets/images/pnhs-logo.png"
                alt="pnhs-logo"
                fluid
                roundedCircle
              />
            </Col>
            <Col className="my-auto" lg="11" md="12">
              <h1 className="mt-2">
                <strong>Pangasinan National High School</strong>
              </h1>
              <h4>
                <em>Senior High School Student Portal</em>
              </h4>
            </Col>
          </Row>
        </Container>
      </nav>
      <Container>
        {eleven}
        {elevenFirst}
        {elevenSecond}
        {twelve}
        {twelveFirst}
        {twelveSecond}
      </Container>
    </div>
  );
}

export function PrintStudentSchedule({ studentSection, currentUser }: any) {
  return (
    <div>
      <nav className="topHeader py-2 mb-5">
        <Container>
          <Row className="text-center justify-content-center">
            <Col className="my-auto" lg="1" md="12" style={{ width: '95px' }}>
              <Image
                src="../../assets/images/pnhs-logo.png"
                alt="pnhs-logo"
                fluid
                roundedCircle
              />
            </Col>
            <Col className="my-auto" lg="11" md="12">
              <h1 className="mt-2">
                <strong>Pangasinan National High School</strong>
              </h1>
              <h4>
                <em>Senior High School Student Portal</em>
              </h4>
            </Col>
          </Row>
        </Container>
      </nav>
      <Container>
        <div className="text-center">
          <h4>
            <strong>Student Schedule</strong>
          </h4>
          <h5>
            <strong>Class Program</strong>
          </h5>
          <h5>
            <strong>
              Grade {studentSection.grade_level} - {studentSection.section_name}
            </strong>
          </h5>
          <h5>
            <strong>SY. {studentSection.school_year}</strong>
          </h5>
          <h5>
            <strong>
              Adviser:{' '}
              {studentSection.teacher.first_name +
                ' ' +
                studentSection.teacher.last_name}
            </strong>
          </h5>
          <h5 className="mb-5">
            <strong>
              {'Student: ' +
                currentUser.first_name +
                ' ' +
                currentUser.last_name}
            </strong>
          </h5>
          <Table bordered className="tableColor">
            <thead>
              <tr
                className="text-center"
                style={{ backgroundColor: '#1DA914' }}
              >
                <th>DAY</th>
                <th>TIME</th>
                <th>SUBJECT</th>
                <th>ROOM</th>
                <th>TEACHER</th>
              </tr>
            </thead>
            <tbody>
              {studentSection.schedules.length > 0 ? (
                studentSection.schedules.map((schedule: any) => (
                  <tr key={schedule._id}>
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
                    <td>{schedule.subject.subject_name}</td>
                    <td>{schedule.room}</td>
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
        </div>
      </Container>
    </div>
  );
}

export function PrintFacultySchedule({
  currentUser,
  sections,
  schedules,
}: any) {
  return (
    <div>
      <nav className="topHeader py-2 mb-5">
        <Container>
          <Row className="text-center justify-content-center">
            <Col className="my-auto" lg="1" md="12" style={{ width: '95px' }}>
              <Image
                src="../../assets/images/pnhs-logo.png"
                alt="pnhs-logo"
                fluid
                roundedCircle
              />
            </Col>
            <Col className="my-auto" lg="11" md="12">
              <h1 className="mt-2">
                <strong>Pangasinan National High School</strong>
              </h1>
              <h4>
                <em>Senior High School Student Portal</em>
              </h4>
            </Col>
          </Row>
        </Container>
      </nav>
      <Container>
        <div className="text-center">
          <h4>
            <strong>Faculty Schedule</strong>
          </h4>
          <h5 className="mb-5">
            <strong>
              {'Faculty: ' +
                currentUser.first_name +
                ' ' +
                currentUser.last_name}
            </strong>
          </h5>
        </div>
        <Table bordered className="tableColor" responsive="sm">
          <thead style={{ backgroundColor: '#2867b1' }}>
            <tr className="text-center">
              <th className="textWhite">Type</th>
              <th className="textWhite">Subject</th>
              <th className="textWhite">Day</th>
              <th className="textWhite">Time</th>
              <th className="textWhite">Room</th>
              <th className="textWhite">Section</th>
            </tr>
          </thead>
          <tbody>
            {sections &&
              schedules &&
              schedules.map(
                (schedule: any) =>
                  currentUser.faculty.handled_subjects.find(
                    ({ schedule_id }: any) => schedule_id === schedule._id
                  ) && (
                    <tr>
                      <td>{schedule.subject.type}</td>
                      <td>{schedule.subject.subject_name}</td>
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
                      <td>{schedule.room}</td>
                      <td>
                        {sections.map(
                          (section: any) =>
                            currentUser.faculty.handled_subjects.find(
                              ({ section_id }: any) =>
                                section_id === section._id
                            ) && section.section_name
                        )}
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
