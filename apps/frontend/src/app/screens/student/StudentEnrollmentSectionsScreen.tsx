import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';

import '../../components/tables/tables.scss';
import {
  useGetParsedSectionQuery,
  useGetParsedSectionsQuery,
} from '../../redux/api/sectionApi';

function StudentEnrollmentSectionsScreen() {
  const [currentUser] = useState(JSON.parse(localStorage.getItem('userInfo')!));

  const { data: studentSection } = useGetParsedSectionQuery(
    currentUser.student.section_id
  );

  const {
    data: sections,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetParsedSectionsQuery({});

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
    let sameStrand;
    let term: number;
    let gradeLevel: number;
    if (studentSection) {
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
    }
    console.log(studentSection);
    content = (
      <>
        {currentUser.student.section_id ? (
          <Table bordered className="tableColor mb-3" responsive="lg">
            <thead style={{ backgroundColor: '#19940e' }}>
              <tr className="text-center">
                <th>Section</th>
                <th>Class Adviser</th>
                <th>Strand</th>
                <th>Term</th>
                <th>Grade Level</th>
                <th>School Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sameStrand && sameStrand.length > 0 ? (
                sameStrand.map((section: any) => (
                  <tr key={section._id}>
                    <td>{section.section_name}</td>
                    <td>
                      {section.teacher.first_name +
                        ' ' +
                        section.teacher.last_name}
                    </td>
                    <td>{section.strand}</td>
                    <td>{section.term}</td>
                    <td>{section.grade_level}</td>
                    <td>{section.school_year}</td>
                    <td className="text-center">
                      <LinkContainer
                        to={`/student/enrollment/section/${section._id}`}
                      >
                        <Button>View</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    No Section for {currentUser.student.strand} Strand
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        ) : (
          <h1>You are not enrolled to any section.</h1>
        )}
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Enrollment / Registration" redirect="/student/home" />
      <Container>
        <div className="mb-2">Student No.: {currentUser.profile.lrn}</div>
        <div className="mb-2">
          Name: {currentUser.first_name + ' ' + currentUser.last_name}
        </div>
        <div className="mb-2">School Year:</div>
        <div className="mb-2">Semester:</div>
        <div className="mb-2">Curriculum Ref. No.:</div>
        <div className="mb-2">
          Grade Level / Strand: {currentUser.student.strand}
        </div>

        {/* <FormGroup as={Row} className="mb-3">
          <FormLabel column lg="2" md="4">
            Grade Level&Sec / Strand:
          </FormLabel>
          <Col lg="10" md="8">
            <FormControl></FormControl>
          </Col>
        </FormGroup>

        <div className="text-end mb-3">
          <Button variant="secondary">Load Section</Button>
        </div> */}

        {content}

        {/* <div className="text-center mb-2">
          <Button
            variant="secondary"
            className="me-5"
            style={{ width: '110px' }}
          >
            Enroll Now
          </Button>
          <Button variant="danger" style={{ width: '110px' }}>
            Exit
          </Button>
        </div> */}
      </Container>
    </div>
  );
}

export default StudentEnrollmentSectionsScreen;
