import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormSelect,
  ListGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useGetParsedSchedulesQuery } from '../../redux/api/scheduleApi';
import {
  useGetParsedSectionQuery,
  useUpdateSectionMutation,
} from '../../redux/api/sectionApi';
import { useGetRoleQuery } from '../../redux/api/userApi';
import { getSection } from '../../redux/slice/sectionSlice';
import { useAppDispatch } from '../../redux/store';

function AdminViewSectionScreen() {
  const { id } = useParams();

  const [notEditing, setNotEditing] = useState(true);
  const [students_id, setStudentsId]: any = useState([]);
  const [schedules_id, setSchedulesId]: any = useState([]);

  const dispatch = useAppDispatch();

  const {
    data: section,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetParsedSectionQuery(id);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getSection({ section }));
  }, [dispatch, section]);

  const { data: teachers } = useGetRoleQuery('faculty');

  const { data: students } = useGetRoleQuery('student');

  const { data: schedules } = useGetParsedSchedulesQuery({});

  const [updateSection] = useUpdateSectionMutation();

  const addStudentHandler = (e: any) => {
    const index = students_id.indexOf(e.target.value);
    if (index > -1) {
      students_id.splice(index, 1);
    } else {
      students_id.push(e.target.value);
    }
    console.log(students_id);
  };

  const addScheduleHandler = (e: any) => {
    const index = schedules_id.indexOf(e.target.value);
    if (index > -1) {
      schedules_id.splice(index, 1);
    } else {
      schedules_id.push(e.target.value);
    }
    console.log(schedules_id);
  };

  const updateHandler = async ({
    section_name,
    school_year,
    term,
    grade_level,
    teacher_id,
  }: any) => {
    try {
      await updateSection({
        id,
        section_name,
        school_year,
        term,
        grade_level,
        teacher_id,
        students_id,
        schedules_id,
      });

      alert('Successfully update section');

      setNotEditing(true);
    } catch (error) {
      alert(error);
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
    console.log(students_id);
    content = (
      <Form onSubmit={handleSubmit(updateHandler)}>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Section Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('section_name')}
              defaultValue={section.section_name}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            School Year:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('school_year')}
              defaultValue={section.school_year}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Term:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{section.term}</div>
            ) : (
              <Form.Select {...register('term')}>
                <option value={section.term}>{section.term}</option>
                {[1, 2].map((num: any) => {
                  if (section.term === num) {
                    return;
                  }
                  return (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Grade Level:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{section.grade_level}</div>
            ) : (
              <Form.Select {...register('grade_level')}>
                <option value={section.grade_level}>
                  {section.grade_level}
                </option>
                {[11, 12].map((num: any) => {
                  if (section.grade_level === num) {
                    return;
                  }
                  return (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Faculty:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>
                {section.teacher.first_name} {section.teacher.last_name}
              </div>
            ) : (
              <>
                <Form.Select {...register('teacher_id')}>
                  <option value={section.teacher._id}>
                    {section.teacher.first_name} {section.teacher.last_name}
                  </option>
                  {teachers &&
                    teachers.map((teacher: any) => {
                      if (teacher._id === section.teacher._id) {
                        return;
                      }
                      return (
                        <option key={teacher._id} value={teacher._id}>
                          {teacher.first_name} {teacher.last_name}
                        </option>
                      );
                    })}
                </Form.Select>
              </>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Students:
          </Form.Label>
          <Col md={10}>
            <Row>
              {notEditing ? (
                section.students.length > 0 ? (
                  section.students.map((student: any) => (
                    <Col key={student._id} md={3} xs={6} className="p-2">
                      <span className="border-bottom border-primary">
                        <i className="fa-solid fa-user"></i>{' '}
                        {student.first_name} {student.last_name}
                      </span>
                    </Col>
                  ))
                ) : (
                  <div>No Students</div>
                )
              ) : students && students.length > 0 ? (
                students.map((student: any) => (
                  <Col lg="3" md="4" xs="6" className="mb-2" key={student._id}>
                    <Form.Check
                      type="checkbox"
                      label={student.first_name + ' ' + student.last_name}
                      defaultChecked={students_id.includes(student._id) && true}
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
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Schedules:
          </Form.Label>
          <Col md={10}>
            <Row>
              {notEditing ? (
                section.schedules.length > 0 ? (
                  section.schedules.map((schedule: any) => (
                    <Col key={schedule._id} md={3} xs={6} className="p-2">
                      <span className="border-bottom border-primary">
                        <i className="fa-solid fa-calendar"></i>{' '}
                        {schedule.subject.subject_name +
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
                          ')'}
                      </span>
                    </Col>
                  ))
                ) : (
                  <div>No Schedule</div>
                )
              ) : schedules && schedules.length > 0 ? (
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
                        defaultChecked={
                          schedules_id.includes(schedule._id) && true
                        }
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
                <div>No Schedule</div>
              )}
            </Row>
          </Col>
        </Form.Group>
        {notEditing ? (
          <Button
            onClick={() => {
              if (students) {
                section.students.forEach((student: any) => {
                  if (!students_id.includes(student._id)) {
                    students_id.push(student._id);
                  }
                });
              }
              if (schedules) {
                section.schedules.forEach((schedule: any) => {
                  if (!schedules_id.includes(schedule._id)) {
                    schedules_id.push(schedule._id);
                  }
                });
              }
              setNotEditing(false);
            }}
          >
            Edit
          </Button>
        ) : (
          <>
            <Button type="submit" className="me-3">
              Save
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setStudentsId([]);
                setSchedulesId([]);
                setNotEditing(true);
              }}
            >
              Exit
            </Button>
          </>
        )}
      </Form>
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
