import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';
import { useGetParsedSchedulesQuery } from '../../redux/api/scheduleApi';
import { useGetParsedSectionsQuery } from '../../redux/api/sectionApi';
import { getSchedules } from '../../redux/slice/scheduleSlice';
import { useAppDispatch } from '../../redux/store';

function AdminScheduleScreen() {
  const { role } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  let [foundSection, setFoundSection]: any = useState();

  const { register, handleSubmit } = useForm();

  const { data: sections } = useGetParsedSectionsQuery({});

  const {
    data: schedules,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetParsedSchedulesQuery({});

  useEffect(() => {
    dispatch(getSchedules({ schedules }));
  }, [dispatch, schedules]);

  let content;

  const filterHandler = ({ section }: any) => {
    const found = sections.find((item: any) => item._id === section);
    setFoundSection(found);

    // foundSection = sections.find((item: any) => item._id === section);
  };

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
      <Table bordered className="tableColor" responsive="md">
        <thead style={{ backgroundColor: '#2a6fd6' }}>
          <tr className="text-center">
            <th>Subject</th>
            <th>Days</th>
            <th>Time</th>
            {role === 'student' ? <th>Teacher</th> : <th>Section</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!foundSection && schedules ? (
            schedules.map((schedule: any) => (
              <tr key={schedule._id}>
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
                  {role === 'student'
                    ? schedule.teacher.first_name +
                      ' ' +
                      schedule.teacher.last_name
                    : schedule.section_id
                    ? sections.map((section: any) => {
                        if (section._id === schedule.section_id) {
                          return section.section_name;
                        }
                        return;
                      })
                    : 'No Section'}
                </td>
                <td>
                  <Button
                    className="me-5"
                    onClick={() =>
                      navigate(`/admin/schedule/${role}/${schedule._id}`)
                    }
                  >
                    View
                  </Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))
          ) : foundSection.schedules.length > 0 && schedules ? (
            foundSection.schedules.map((schedule: any) => (
              <tr key={schedule._id}>
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
                  {schedule.teacher.first_name} {schedule.teacher.last_name}
                </td>
                <td>
                  <Button
                    className="me-5"
                    onClick={() =>
                      navigate(`/admin/schedule/${role}/${schedule._id}`)
                    }
                  >
                    View
                  </Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
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
      <Header
        page={role === 'student' ? 'Student Schedule' : 'Faculty Schedule'}
        redirect="/admin/home"
      />
      <Container>
        <Form onSubmit={handleSubmit(filterHandler)}>
          <Row>
            {role === 'student' ? (
              <>
                <Col>
                  <FormControl
                    style={{
                      backgroundColor: '#ffe4a0',
                      border: '#eaaa79 solid',
                    }}
                    placeholder="Student's Name"
                  ></FormControl>
                </Col>
                <Col>
                  <Form.Select
                    style={{
                      backgroundColor: '#ffe4a0',
                      border: '#eaaa79 solid',
                    }}
                    {...register('section')}
                  >
                    <option value="all">All Sections</option>
                    {sections &&
                      sections.map((section: any) => (
                        <option value={section._id} key={section._id}>
                          {section.section_name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <FormControl
                    style={{
                      backgroundColor: '#ffe4a0',
                      border: '#eaaa79 solid',
                    }}
                    placeholder="Faculty's Name"
                  ></FormControl>
                </Col>
                <Col>
                  <FormControl
                    style={{
                      backgroundColor: '#ffe4a0',
                      border: '#eaaa79 solid',
                    }}
                    placeholder="Term"
                  ></FormControl>
                </Col>
              </>
            )}

            <Col className="d-grid gap-2">
              <Button variant="secondary" type="submit">
                Load
              </Button>
            </Col>
          </Row>
        </Form>
        <div className="text-end my-3">
          <Button onClick={() => navigate(`/admin/schedule/${role}/create`)}>
            Create Schedule
          </Button>
        </div>
        {content}
      </Container>
    </div>
  );
}

export default AdminScheduleScreen;
