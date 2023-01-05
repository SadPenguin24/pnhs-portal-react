import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useGetParsedSchedulesQuery } from '../../redux/api/scheduleApi';
import { useCreateSectionMutation } from '../../redux/api/sectionApi';
import { useGetSubjectQuery } from '../../redux/api/subjectApi';
import { useGetRoleQuery } from '../../redux/api/userApi';

function AdminCreateSectionScreen() {
  const { register, handleSubmit } = useForm();

  const { data: schedules } = useGetParsedSchedulesQuery({});

  const {
    data: teachers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRoleQuery('faculty');

  const [role] = useState('student');
  const [schedules_id]: any = useState([]);

  const navigate = useNavigate();

  const [createSection] = useCreateSectionMutation();

  // School Years
  let years: any = [];

  for (let i = 0; i < 10; i++) {
    years.push(new Date().getFullYear() + i);
  }

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
    section_name,
    school_year,
    strand,
    term,
    grade_level,
    teacher_id,
  }: any) => {
    if (teacher_id === '') {
      alert('Please select a faculty.');
      return;
    }
    console.log(
      role,
      section_name,
      school_year,
      strand,
      term,
      grade_level,
      teacher_id,
      schedules_id
    );
    await createSection({
      role,
      section_name,
      school_year,
      strand,
      term,
      grade_level,
      teacher_id,
      schedules_id,
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
            Section Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              required
              type="text"
              {...register('section_name')}
              placeholder="Example 11-ABM-1"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            School Year:
          </Form.Label>
          <Col md={10}>
            <Form.Select {...register('school_year')}>
              {years.map((year: any) => (
                <option key={year}>{year - 1 + '-' + year}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Strand:
          </Form.Label>
          <Col md={10}>
            <Form.Select {...register('strand')}>
              {[
                'ABM',
                'GAS',
                'HUMSS',
                'SPORTS',
                'STEM',
                'TVL-COOKERY',
                'TVL-HOME ECONOMICS',
                'TVL-ICT',
              ].map((strand: any) => (
                <option value={strand} key={strand}>
                  {strand}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Term:
          </Form.Label>
          <Col md={10}>
            <Form.Select {...register('term')}>
              {[1, 2].map((num: any) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Grade Level:
          </Form.Label>
          <Col md={10}>
            <Form.Select {...register('grade_level')}>
              {[11, 12].map((num: any) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Class Adviser:
          </Form.Label>
          <Col md={10}>
            <Form.Select {...register('teacher_id')}>
              {teachers.length > 0 ? (
                teachers.map((teacher: any) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.first_name} {teacher.last_name}
                  </option>
                ))
              ) : (
                <option value="">No Faculty</option>
              )}
            </Form.Select>
          </Col>
        </Form.Group>
        {/* form of schedules id */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Schedules:
          </Form.Label>
          <Col md={10}>
            <Row>
              {schedules && schedules.length > 0 ? (
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
                                return day.charAt(0) + ' / ';
                              }
                              array = array.length - 1;
                              if (array === index) {
                                return ' ' + day.charAt(0) + ' / ';
                              } else if (index === 0) {
                                return day.charAt(0);
                              }
                              return ' ' + day.charAt(0);
                            }
                          ) +
                          schedule.time_in +
                          '-' +
                          schedule.time_out +
                          ' / ' +
                          schedule.room +
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
