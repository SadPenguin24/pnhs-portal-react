import { deleteCookie } from 'cookies-next';
import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';

import '../../components/tables/tables.scss';
import { useGetMiscQuery } from '../../redux/api/miscApi';
import {
  useGetParsedSectionQuery,
  useGetParsedSectionsQuery,
  useUpdateSectionMutation,
} from '../../redux/api/sectionApi';

function StudentEnrollmentSectionsScreen() {
  const navigate = useNavigate();

  const [currentUser] = useState(JSON.parse(localStorage.getItem('userInfo')!));
  const [selectedSection, setSelectedSection]: any = useState();
  const [students_id]: any = useState([]);

  const {
    data: misc,
    isLoading: isLoadingMisc,
    isSuccess: isSuccessMisc,
    isError: isErrorMisc,
    error: errorMisc,
  } = useGetMiscQuery('63976fa2de273706ca849846');

  const {
    data: studentSection,
    isLoading: isLoadingStudentSection,
    isSuccess: isSuccessStudentSection,
    isError: isErrorStudentSection,
    error: errorStudentSection,
  } = useGetParsedSectionQuery(currentUser.student.section_id);

  const {
    data: sections,
    isLoading: isLoadingSections,
    isSuccess: isSuccessSections,
    isError: isErrorSections,
    error: errorSections,
  } = useGetParsedSectionsQuery({});

  const [updateSection] = useUpdateSectionMutation();

  let content, table, sameStrand: any;

  const enrollToSection = async () => {
    selectedSection.students.map((student: any) => {
      if (!students_id.includes(student._id)) {
        students_id.push(student._id);
      }
    });
    const id = selectedSection._id;
    if (!students_id.includes(currentUser._id)) {
      students_id.push(currentUser._id);
    }
    console.log('Yes', id, students_id);

    try {
      await updateSection({
        id,
        students_id,
      });
      await updateSection({
        id,
        students_id,
      });

      alert(
        'Successfully enroll to section. You will be automatically logout, please login again.'
      );

      deleteCookie('access_token');
      deleteCookie('refresh_token');
      localStorage.removeItem('userInfo');

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const selectSectionHandler = (e: any) => {
    if (e.target.value === 'default') {
      setSelectedSection();
    } else {
      setSelectedSection(
        sameStrand.find((item: any) => item._id === e.target.value)
      );
      console.log(selectedSection);
    }
  };

  if (isLoadingSections && isLoadingStudentSection && isLoadingMisc) {
    content = (
      <div className="text-center">
        <Spinner variant="primary" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (isSuccessSections && isSuccessMisc) {
    let term: number;
    let gradeLevel: number;
    if (studentSection) {
      console.log(studentSection);
      if (studentSection.term === 1 && studentSection.grade_level === 11) {
        term = 2;
        gradeLevel = 11;
      } else if (
        studentSection.term === 2 &&
        studentSection.grade_level === 11
      ) {
        term = 1;
        gradeLevel = 12;
      } else if (
        studentSection.term === 1 &&
        studentSection.grade_level === 12
      ) {
        term = 2;
        gradeLevel = 12;
      }

      sameStrand = sections.filter(
        (section: any) =>
          section.strand === currentUser.student.strand &&
          section.term === term &&
          section.grade_level === gradeLevel
      );
    } else {
      sameStrand = sections.filter(
        (section: any) =>
          section.strand === currentUser.student.strand &&
          section.term === +currentUser.student.current_term &&
          section.grade_level === +currentUser.student.current_grade
      );
    }
    console.log(sameStrand);
    content = (
      <>
        <Row>
          <h4>Student Details</h4>
          <Col md={2} className="mb-2">
            <strong>LRN:</strong>
          </Col>
          <Col md={10} className="mb-2">
            {currentUser.profile.lrn}
          </Col>
          <Col md={2} className="mb-2">
            <strong>Student Name:</strong>
          </Col>
          <Col md={10} className="mb-2">
            {currentUser.first_name + ' ' + currentUser.last_name}
          </Col>
          <Col md={2} className="mb-2">
            <strong>Strand:</strong>
          </Col>
          <Col md={10} className="mb-2">
            {currentUser.student.strand}
          </Col>
          <Col md={2} className="mb-2">
            <strong>Grade Level:</strong>
          </Col>
          <Col md={10} className="mb-2">
            {currentUser.student.current_grade}
          </Col>
          <Col md={2} className="mb-2">
            <strong>Term:</strong>
          </Col>
          <Col md={10} className="mb-2">
            {currentUser.student.current_term}
          </Col>
        </Row>
        {currentUser.student.section_id && studentSection ? (
          misc.bool_value ? (
            <>
              <Row>
                <Col md={2} className="mb-2">
                  <strong>Student Section:</strong>
                </Col>
                <Col md={10} className="mb-2">
                  {studentSection.section_name}
                </Col>
                <Col md={2} className="mb-2">
                  <strong>School Year:</strong>
                </Col>
                <Col md={10} className="mb-2">
                  {studentSection.school_year}
                </Col>
              </Row>
              {sameStrand && sameStrand.length > 0 ? (
                <Form.Group as={Row} className="mb-3">
                  <Form.Label as={Col} md={2}>
                    <strong>Enroll Sections:</strong>
                  </Form.Label>
                  <Col md={10}>
                    <Form.Select onChange={selectSectionHandler}>
                      <option value="default">Select a section</option>
                      {sameStrand.map((section: any) => (
                        <option key={section._id} value={section._id}>
                          {section.section_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              ) : (
                <Form.Group as={Row} className="mb-3">
                  <Form.Label as={Col} md={2}>
                    <strong>Enroll Sections:</strong>
                  </Form.Label>
                  <Col md={10}>No Section</Col>
                </Form.Group>
              )}
            </>
          ) : (
            <div className="text-center">
              <h3>Enrollment is now closed</h3>
            </div>
          )
        ) : sameStrand && sameStrand.length > 0 ? (
          <Form.Group as={Row} className="mb-3">
            <Form.Label as={Col} md={2}>
              <strong>Enroll Sections:</strong>
            </Form.Label>
            <Col md={10}>
              <Form.Select onChange={selectSectionHandler}>
                <option value="default">Select a section</option>
                {sameStrand.map((section: any) => (
                  <option key={section._id} value={section._id}>
                    {section.section_name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
        ) : (
          <Form.Group as={Row} className="mb-3">
            <Form.Label as={Col} md={2}>
              <strong>Enroll Sections:</strong>
            </Form.Label>
            <Col md={10}>No Section</Col>
          </Form.Group>
        )}
      </>
    );
    if (selectedSection) {
      table = (
        <>
          <Table bordered className="tableColor mb-3" responsive="lg">
            <thead style={{ backgroundColor: '#19940e' }}>
              <tr className="text-center">
                <th>Subject</th>
                <th>Faculty</th>
                <th>Days</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {selectedSection &&
                selectedSection.schedules.map((schedule: any) => (
                  <tr key={schedule._id}>
                    <td>{schedule.subject.subject_name}</td>
                    <td>
                      {schedule.teacher.first_name +
                        ' ' +
                        schedule.teacher.last_name}
                    </td>
                    <td>
                      {schedule.days.map((day: any, index: any, array: any) => {
                        array = array.length - 1;
                        if (array === index) {
                          return day;
                        }
                        return day + ' / ';
                      })}
                    </td>
                    <td>{schedule.time_in + ' - ' + schedule.time_out}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button
            onClick={() => {
              if (
                confirm('Do you really want to enroll on this section?') ===
                true
              ) {
                enrollToSection();
              }
            }}
          >
            Enroll Now
          </Button>
        </>
      );
    }
  } else if (isErrorSections && isErrorStudentSection && isErrorMisc) {
    content = (
      <>
        <p>{JSON.stringify(errorSections)}</p>
        <p>{JSON.stringify(errorStudentSection)}</p>
        <p>{JSON.stringify(errorMisc)}</p>;
      </>
    );
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Enrollment / Registration" redirect="/student/home" />
      <Container>
        {content}
        {table}
      </Container>
    </div>
  );
}

export default StudentEnrollmentSectionsScreen;
