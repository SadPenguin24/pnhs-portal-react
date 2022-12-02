import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import {
  useGetParsedScheduleQuery,
  useUpdateScheduleMutation,
} from '../../redux/api/scheduleApi';
import { useGetSubjectsQuery } from '../../redux/api/subjectApi';
import { useGetRoleQuery } from '../../redux/api/userApi';
import { getSchedule } from '../../redux/slice/scheduleSlice';
import { useAppDispatch } from '../../redux/store';

function AdminViewScheduleScreen() {
  const { role, id } = useParams();

  const [notEditing, setNotEditing] = useState(true);

  const dispatch = useAppDispatch();

  const {
    data: schedule,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetParsedScheduleQuery(id);

  const [days, setDays]: any = useState([]);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getSchedule({ schedule }));
  }, [dispatch, schedule]);

  const { data: teachers } = useGetRoleQuery('faculty');

  const { data: subjects } = useGetSubjectsQuery({});

  const [updateSubject] = useUpdateScheduleMutation();

  const addDayHandler = (e: any) => {
    const index = days.indexOf(e.target.value);
    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(e.target.value);
    }
    console.log(days);
  };

  const updateHandler = async ({
    teacher_id,
    subject_id,
    time_in,
    time_out,
  }: any) => {
    try {
      const timeInNum = parseInt(time_in);
      const timeOutNum = parseInt(time_out);

      if (timeInNum >= timeOutNum) {
        alert('Hour of time in should be early than time out.');
        return;
      }

      if (days.length === 0) {
        alert('Please select days.');
        return;
      }

      console.log(teacher_id, subject_id, days, time_in, time_out);

      await updateSubject({
        id,
        teacher_id,
        subject_id,
        days,
        time_in,
        time_out,
      });

      alert('Successfully update schedule');

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
    content = (
      <Form onSubmit={handleSubmit(updateHandler)}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Faculty:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>
                {schedule.teacher.first_name} {schedule.teacher.last_name}
              </div>
            ) : (
              <>
                <Form.Select {...register('teacher_id')}>
                  <option value={schedule.teacher._id}>
                    {schedule.teacher.first_name} {schedule.teacher.last_name}
                  </option>
                  {teachers &&
                    teachers.map((teacher: any) => {
                      if (teacher._id === schedule.teacher._id) {
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
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Subject:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{schedule.subject.subject_name}</div>
            ) : (
              <Form.Select {...register('subject_id')}>
                <option value={schedule.subject._id}>
                  {schedule.subject.subject_name}
                </option>
                {subjects &&
                  subjects.map((subject: any) => {
                    if (subject._id === schedule.subject._id) {
                      return;
                    }
                    return (
                      <option key={subject._id} value={subject._id}>
                        {subject.subject_name}
                      </option>
                    );
                  })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Time in:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="time"
              required
              {...register('time_in')}
              defaultValue={schedule.time_in}
              readOnly={notEditing}
              plaintext={notEditing}
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
              required
              {...register('time_out')}
              defaultValue={schedule.time_out}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Days:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>
                {schedule.days.map((day: any, index: any, array: any) => {
                  array = array.length - 1;
                  if (array === index) {
                    return day;
                  }
                  return day + ' / ';
                })}
              </div>
            ) : (
              [
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
                  defaultChecked={schedule.days.includes(day) && true}
                  label={day}
                  value={day}
                  onChange={addDayHandler}
                  inline
                />
              ))
            )}
          </Col>
        </Form.Group>

        {notEditing ? (
          <Button
            onClick={() => {
              if (schedule) {
                schedule.days.forEach((day: any) => {
                  if (!days.includes(day)) {
                    days.push(day);
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
                setDays([]);
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
      <Header
        page="Strand/Enrollees/Subject"
        redirect={`/admin/schedule/${role}`}
      />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminViewScheduleScreen;
