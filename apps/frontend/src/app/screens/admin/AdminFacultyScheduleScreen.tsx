import React, { useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  FormControl,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';
import { useGetSchedulesQuery } from '../../redux/api/scheduleApi';
import { getSchedules } from '../../redux/slice/scheduleSlice';
import { useAppDispatch } from '../../redux/store';

function AdminFacultyScheduleScreen() {
  const dispatch = useAppDispatch();

  const {
    data: schedules,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSchedulesQuery({});

  useEffect(() => {
    dispatch(getSchedules({ schedules }));
  }, [dispatch, schedules]);

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
      <Table bordered className="tableColor">
        <thead style={{ backgroundColor: '#2a6fd6' }}>
          <tr className="text-center">
            <th>Subject</th>
            <th>Time</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {schedules ? (
            schedules.map((schedule: any) => (
              <tr key={schedule._id}>
                <td>{schedule.subject_id}</td>
                <td>
                  {schedule.time_in} - {schedule.time_out}
                </td>
                <td>{schedule.teacher_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">
                No Schedule
              </td>
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
      <Header page="Faculty Schedule" redirect="/admin/home" />
      <Container>
        <Row>
          <Col>
            <FormControl
              style={{ backgroundColor: '#ffe4a0', border: '#eaaa79 solid' }}
              placeholder="Teacher's Name"
            ></FormControl>
          </Col>
          <Col>
            <FormControl
              style={{ backgroundColor: '#ffe4a0', border: '#eaaa79 solid' }}
              placeholder="S.Y. & Term"
            ></FormControl>
          </Col>
          <Col className="d-grid gap-2">
            <Button variant="secondary">Load</Button>
          </Col>
        </Row>
        <div className="text-end my-3">
          <Button className="me-5">Add</Button>
          <Button className="me-5">Edit</Button>
          <Button className="me-5">Save</Button>
          <Button variant="danger">Delete</Button>
        </div>
        {content}
      </Container>
    </div>
  );
}

export default AdminFacultyScheduleScreen;
