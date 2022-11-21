import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useCreateScheduleMutation } from '../../redux/api/scheduleApi';

function AdminCreateScheduleScreen() {
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [teacher_id, setTeacherId] = useState('');
  const [subject_id, setSubjectId] = useState('');
  const [days]: any = useState([]);
  const [time_in, setTimeIn] = useState('');
  const [time_out, setTimeOut] = useState('');

  const [createSchedule] = useCreateScheduleMutation();

  const addDayHandler = (e: any) => {
    const index = days.indexOf(e.target.value);
    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(e.target.value);
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

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

    setIsLoading(false);
    setIsSuccess(true);

    navigate('/admin/facultyschedule');
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
      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Teacher:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              value={teacher_id}
              onChange={(e: any) => {
                setTeacherId(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Subject:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              value={subject_id}
              onChange={(e: any) => {
                setSubjectId(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Time in:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="time"
              value={time_in}
              onChange={(e: any) => {
                setTimeIn(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Time out:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="time"
              value={time_out}
              onChange={(e: any) => {
                setTimeOut(e.target.value);
              }}
            />
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
      <Header page="Create Schedule" redirect="/admin/facultyschedule" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminCreateScheduleScreen;
