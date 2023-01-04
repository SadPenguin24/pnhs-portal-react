import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  ListGroup,
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
import { useGetRoleQuery } from '../../redux/api/userApi';
import { getSchedules } from '../../redux/slice/scheduleSlice';
import { useAppDispatch } from '../../redux/store';

function AdminScheduleScreen() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [filteredSection, setFilteredSection]: any = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults]: any = useState([]);
  const [selectedFaculty, setSelectedFaculty]: any = useState();
  const [facultySchedules, setFacultySchedules]: any = useState([]);

  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm();

  // School Years
  let years: any = [];

  for (let i = 0; i < 10; i++) {
    years.push(new Date().getFullYear() + i);
  }

  const { data: sections } = useGetParsedSectionsQuery({});

  const { data: faculties } = useGetRoleQuery('faculty');

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

  const filterStudentSchedule = ({ sectionId }: any) => {
    console.log(sectionId);
    if (sectionId === 'All') {
      console.log('reset');
      setFilteredSection([]);
      setIsFiltering(false);
    } else {
      console.log('filter');
      let filter = sections;
      console.log('Filter Sections');
      if (sectionId !== 'All') {
        filter = filter.filter((section: any) => section._id === sectionId);

        console.log(filter, filteredSection);
      }
      setFilteredSection(filter);
      console.log(filteredSection);
      setIsFiltering(true);
    }
  };

  const searchFaculty = (e: any) => {
    console.log(e.target.value);

    if (e.target.value === '') {
      setSearchResults([]);
      return;
    }

    const condition = new RegExp(e.target.value.trim(), 'i');

    const result = faculties.filter((faculty: any) =>
      condition.test(faculty.last_name)
    );
    console.log(result);
    setSearchResults(result);
  };

  const getSelectedFacultySchedule = (result: any) => {
    if (selectedFaculty === result) {
      setFacultySchedules([]);
    }
    setSearching(true);
    console.log(result, selectedFaculty);
    result.faculty.handled_subjects.map((subjects: any) => {
      let sameSchedule = schedules.find(
        (schedule: any) => schedule._id === subjects.schedule_id
      );
      if (!facultySchedules.includes(sameSchedule)) {
        facultySchedules.push(sameSchedule);
      }
    });
    console.log(facultySchedules);
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
    console.log(facultySchedules, filteredSection);
    content = (
      <>
        {/* Select filter */}
        {role === 'student' ? (
          <Form onSubmit={handleSubmit(filterStudentSchedule)}>
            <Row>
              <Col>
                <Form.Select
                  style={{
                    backgroundColor: '#ffe4a0',
                    border: '#eaaa79 solid',
                  }}
                  {...register('sectionId')}
                >
                  <option value="All">All Sections</option>
                  {sections &&
                    sections.map((section: any) => (
                      <option value={section._id} key={section._id}>
                        {section.section_name}
                      </option>
                    ))}
                </Form.Select>
              </Col>
              {/* <Col>
                <Form.Select
                  style={{
                    backgroundColor: '#ffe4a0',
                    border: '#eaaa79 solid',
                  }}
                  {...register('schoolYear')}
                >
                  <option value="All">All School Year</option>
                  {years.map((year: any) => (
                    <option key={year}>{year - 1 + '-' + year}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  style={{
                    backgroundColor: '#ffe4a0',
                    border: '#eaaa79 solid',
                  }}
                  {...register('term')}
                >
                  <option value="All">All Term</option>
                  {['1', '2'].map((term: any) => (
                    <option value={term} key={term}>
                      {term}
                    </option>
                  ))}
                </Form.Select>
              </Col> */}
              <Col>
                <Button variant="secondary" type="submit">
                  Load
                </Button>
              </Col>
            </Row>
          </Form>
        ) : (
          <Form>
            <Row>
              <Col>
                <Form.Control
                  id="searchBar"
                  {...(register('lastName'),
                  {
                    onChange: searchFaculty,
                  })}
                  style={{
                    backgroundColor: '#ffe4a0',
                    border: '#eaaa79 solid',
                  }}
                  placeholder="Faculty's Last Name"
                ></Form.Control>
                <ListGroup
                  className="z-1 position-absolute"
                  style={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                  {searchResults.length > 0 &&
                    searchResults.map((result: any) => {
                      if (result === selectedFaculty) {
                        return;
                      }
                      return (
                        <ListGroup.Item
                          key={result._id}
                          action
                          onClick={() => {
                            getSelectedFacultySchedule(result);
                            setSelectedFaculty(result);
                          }}
                        >
                          {result.first_name + ' ' + result.last_name}
                        </ListGroup.Item>
                      );
                    })}
                </ListGroup>
              </Col>
              {/* <Col>
                <FormControl
                  style={{
                    backgroundColor: '#ffe4a0',
                    border: '#eaaa79 solid',
                  }}
                  placeholder="Term"
                ></FormControl>
              </Col> */}
              <Col>
                <Button
                  variant="danger"
                  onClick={() => {
                    setSearching(false);
                    (
                      document.getElementById('searchBar') as HTMLInputElement
                    ).value = '';
                  }}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        )}
        <div className="text-end my-3">
          <Button onClick={() => navigate(`/admin/schedule/${role}/create`)}>
            Create Schedule
          </Button>
        </div>
        {searching && (
          <h3 className="mb-3">
            Schedule of{' '}
            {selectedFaculty.first_name + ' ' + selectedFaculty.last_name}{' '}
          </h3>
        )}
        <Table bordered className="tableColor" responsive="md">
          <thead style={{ backgroundColor: '#2a6fd6' }}>
            <tr className="text-center">
              <th>Subject</th>
              <th>Days</th>
              <th>Time</th>
              <th>Room</th>
              {role === 'student' ? <th>Teacher</th> : <th>Section</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              isFiltering ? (
                filteredSection.length > 0 ? (
                  filteredSection.map((section: any) =>
                    section.schedules.length > 0 ? (
                      section.schedules.map((schedule: any) => (
                        <tr key={schedule._id}>
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
                            {role === 'student'
                              ? schedule.teacher.first_name +
                                ' ' +
                                schedule.teacher.last_name
                              : schedule.section_id && sections
                              ? sections.map((section: any) => {
                                  if (section._id === schedule.section_id) {
                                    return section.section_name;
                                  }
                                  return;
                                })
                              : 'No Section'}
                          </td>
                          <td className="text-center">
                            <Button
                              // className="me-5"
                              onClick={() =>
                                navigate(
                                  `/admin/schedule/${role}/${schedule._id}`
                                )
                              }
                            >
                              View
                            </Button>
                            {/* <Button variant="danger">Delete</Button> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="text-center">
                        <td colSpan={6}>No Schedule</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr className="text-center">
                    <td colSpan={6}>No Found Section</td>
                  </tr>
                )
              ) : searching ? (
                facultySchedules && facultySchedules.length > 0 ? (
                  facultySchedules.map((schedule: any) => (
                    <tr key={schedule._id}>
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
                        {role === 'student'
                          ? schedule.teacher.first_name +
                            ' ' +
                            schedule.teacher.last_name
                          : schedule.section_id && sections
                          ? sections.map((section: any) => {
                              if (section._id === schedule.section_id) {
                                return section.section_name;
                              }
                              return;
                            })
                          : 'No Section'}
                      </td>
                      <td className="text-center">
                        <Button
                          // className="me-5"
                          onClick={() =>
                            navigate(`/admin/schedule/${role}/${schedule._id}`)
                          }
                        >
                          View
                        </Button>
                        {/* <Button variant="danger">Delete</Button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">
                    <td colSpan={6}>No Schedule</td>
                  </tr>
                )
              ) : (
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
                    <td>{schedule.room}</td>
                    <td>
                      {role === 'student'
                        ? schedule.teacher.first_name +
                          ' ' +
                          schedule.teacher.last_name
                        : schedule.section_id && sections
                        ? sections.map((section: any) => {
                            if (section._id === schedule.section_id) {
                              return section.section_name;
                            }
                            return;
                          })
                        : 'No Section'}
                    </td>
                    <td className="text-center">
                      <Button
                        // className="me-5"
                        onClick={() =>
                          navigate(`/admin/schedule/${role}/${schedule._id}`)
                        }
                      >
                        View
                      </Button>
                      {/* <Button variant="danger">Delete</Button> */}
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No Schedule
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className="mb-5" onClick={() => setSearchResults([])}>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header
        page={role === 'student' ? 'Student Schedule' : 'Faculty Schedule'}
        redirect="/admin/home"
      />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminScheduleScreen;
