import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useCreateScheduleMutation } from '../../redux/api/scheduleApi';
import { useGetSubjectsQuery } from '../../redux/api/subjectApi';
import { useGetRoleQuery } from '../../redux/api/userApi';

function AdminCreateScheduleScreen() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [days]: any = useState([]);

  const { data: teachers } = useGetRoleQuery('faculty');

  const { data: subjects } = useGetSubjectsQuery({});

  const [createSchedule] = useCreateScheduleMutation();

  const addDayHandler = (e: any) => {
    const index = days.indexOf(e.target.value);
    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(e.target.value);
    }
  };

  const submitHandler = async ({
    teacher_id,
    subject_id,
    time_in,
    time_out,
  }: any) => {
    setIsSuccess(false);
    setIsLoading(true);

    const timeInNum = parseInt(time_in);
    const timeOutNum = parseInt(time_out);

    if (timeInNum >= timeOutNum) {
      alert('Hour of time in should be early than time out.');
      setIsLoading(false);
      setIsSuccess(true);
      return;
    }

    console.log(teacher_id, subject_id, days, time_in, time_out);

    await createSchedule({ teacher_id, subject_id, days, time_in, time_out });

    alert('Successfully create a schedule.');

    setIsLoading(false);
    setIsSuccess(true);

    navigate('/admin/schedule');
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
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Faculty:
          </Form.Label>
          <Col md={10}>
            <Form.Select
              defaultValue="Choose Faculty"
              {...register('teacher_id')}
            >
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
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Subject:
          </Form.Label>
          <Col md={10}>
            <Form.Select
              defaultValue="Choose Subject"
              {...register('subject_id')}
            >
              {subjects ? (
                subjects.map((subject: any) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.subject_name}
                  </option>
                ))
              ) : (
                <option>No Subject</option>
              )}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Time in:
          </Form.Label>
          <Col md={10}>
            <Form.Control type="time" {...register('time_in')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Time out:
          </Form.Label>
          <Col md={10}>
            <Form.Control type="time" {...register('time_out')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Days:
          </Form.Label>
          <Col md={10}>
            {[
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ].map((day) => (
              <Form.Check
                key={day}
                type="checkbox"
                label={day}
                value={day}
                onChange={addDayHandler}
                inline
              />
            ))}
          </Col>
        </Form.Group>
        <Button type="submit">Create Schedule</Button>
      </Form>
    );
  }

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Create Schedule" redirect="/admin/schedule" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminCreateScheduleScreen;
