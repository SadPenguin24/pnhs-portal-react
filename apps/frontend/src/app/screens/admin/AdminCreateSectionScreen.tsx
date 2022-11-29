import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useGetParsedSchedulesQuery } from '../../redux/api/scheduleApi';
import { useCreateSectionMutation } from '../../redux/api/sectionApi';
import {
  useGetSubjectQuery,
  useGetSubjectsQuery,
} from '../../redux/api/subjectApi';
import { useGetRoleQuery } from '../../redux/api/userApi';

function AdminCreateSectionScreen() {
  const { register, handleSubmit } = useForm();

  const { data: students } = useGetRoleQuery('student');

  const { data: schedules } = useGetParsedSchedulesQuery({});

  const {
    data: teachers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRoleQuery('faculty');

  const [role] = useState('student');
  const [students_id]: any = useState([]);
  const [schedules_id]: any = useState([]);

  const navigate = useNavigate();

  const [createSection] = useCreateSectionMutation();

  const addStudentHandler = (e: any) => {
    const index = students_id.indexOf(e.target.value);
    if (index > -1) {
      students_id.splice(index, 1);
    } else {
      students_id.push(e.target.value);
    }
  };

  const scheduleHandler = (id: any) => {
    const { data: subject } = useGetSubjectQuery(id);
    return subject;
  };

  const addScheduleHandler = (e: any) => {
    const index = schedules_id.indexOf(e.target.value);
    if (index > -1) {
      schedules_id.splice(index, 1);
    } else {
      schedules_id.push(e.target.value);
    }
  };

  const createSectionHandler = async ({
    school_year,
    section_name,
    teacher_id,
  }: any) => {
    await createSection({
      role,
      section_name,
      teacher_id,
      students_id,
      schedules_id,
      school_year,
    });

    alert('Successfully create a section.');

    navigate('/admin/section');
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
    content = (
      <Form onSubmit={handleSubmit(createSectionHandler)}>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Section:
          </Form.Label>
          <Col md={10}>
            <Form.Control type="text" {...register('section_name')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            School Year:
          </Form.Label>
          <Col md={10}>
            <Form.Control type="text" {...register('school_year')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Faculty:
          </Form.Label>
          <Col md={10}>
            <Form.Select {...register('teacher_id')}>
              {teachers ? (
                teachers.map((teacher: any) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.first_name} {teacher.last_name}
                  </option>
                ))
              ) : (
                <option>No Faculty</option>
              )}
            </Form.Select>
          </Col>
        </Form.Group>
        {/* form of students id */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Students:
          </Form.Label>
          <Col md={10}>
            <Row>
              {students ? (
                students.map((student: any) => (
                  <Col lg="3" md="4" xs="6" className="mb-2" key={student._id}>
                    <Form.Check
                      type="checkbox"
                      name="student"
                      label={student.first_name + ' ' + student.last_name}
                      value={student._id}
                      onChange={addStudentHandler}
                    />
                  </Col>
                ))
              ) : (
                <div>No Students</div>
              )}
            </Row>
          </Col>
        </Form.Group>
        {/* form of schedules id */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Schedules:
          </Form.Label>
          <Col md={10}>
            <Row>
              {schedules ? (
                schedules.map((schedule: any) => {
                  return (
                    <Col
                      lg="4"
                      md="6"
                      xs="12"
                      className="mb-2"
                      key={schedule._id}
                    >
                      <Form.Check
                        type="checkbox"
                        name="schedule"
                        label={
                          schedule.subject.subject_name +
                          ' (' +
                          schedule.days.map(
                            (day: any, index: any, array: any) => {
                              if (array.length === 1) {
                                return day.charAt(0) + ' - ';
                              }
                              array = array.length - 1;
                              if (array === index) {
                                return ' ' + day.charAt(0) + ' - ';
                              } else if (index === 0) {
                                return day.charAt(0);
                              }
                              return ' ' + day.charAt(0);
                            }
                          ) +
                          schedule.time_in +
                          '-' +
                          schedule.time_out +
                          ')'
                        }
                        value={schedule._id}
                        onChange={addScheduleHandler}
                      />
                    </Col>
                  );
                })
              ) : (
                <div>No Schedules</div>
              )}
            </Row>
          </Col>
        </Form.Group>
        <Button type="submit">Create Section</Button>
      </Form>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Create Section" redirect="/admin/section" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminCreateSectionScreen;
