import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';
import { useGetParsedSectionsQuery } from '../../redux/api/sectionApi';

function FacultyAdvisoryClassScreen() {
  const [currentUser] = useState(JSON.parse(localStorage.getItem('userInfo')!));
  console.log(currentUser);

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
    console.log(sections);
    content = (
      <>
        <Row>
          <FormGroup as={Col} className="d-lg-flex">
            <FormLabel className="me-2 my-auto">Grade</FormLabel>
            <FormSelect style={{ height: '37.6px' }}>
              <option>All</option>
              <option>11</option>
              <option>12</option>
            </FormSelect>
          </FormGroup>
          <FormGroup as={Col} className="d-lg-flex">
            <FormLabel className="me-2 my-auto">Term</FormLabel>
            <FormSelect style={{ height: '37.6px' }}>
              <option>All</option>
              <option>First semester</option>
              <option>Second semester</option>
            </FormSelect>
          </FormGroup>
          <FormGroup as={Col} className="d-lg-flex">
            <FormLabel className="me-2 my-auto">Section/Strand</FormLabel>
            <FormSelect style={{ height: '37.6px' }}>
              <option>All</option>
              <option>Section-1-ABM</option>
              <option>Section-1-STEM</option>
            </FormSelect>
          </FormGroup>
          <Col className="my-auto">
            <Button variant="secondary">Load</Button>
          </Col>
        </Row>

        <Table bordered className="mt-5 tableColor">
          <thead style={{ backgroundColor: '#2867b1' }}>
            <tr className="text-center">
              <th className="textWhite">Student No.</th>
              <th className="textWhite">Name</th>
              <th className="textWhite">Section Name</th>
              <th className="textWhite">Term</th>
            </tr>
          </thead>
          <tbody>
            {currentUser.faculty.advisory_section_ids.length > 0 ? (
              sections.map(
                (section: any) =>
                  currentUser.faculty.advisory_section_ids.find(
                    (advisorySection: any) => advisorySection === section._id
                  ) &&
                  section.students.map((student: any) => (
                    <tr key={student._id}>
                      <td>{student.profile.lrn}</td>
                      <td>{student.first_name + ' ' + student.last_name}</td>
                      <td>{section.section_name}</td>
                      <td>{section.term}</td>
                    </tr>
                  ))
              )
            ) : (
              <tr className="text-center">
                <td colSpan={4}>No Advisory Section</td>
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
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Class List" redirect="/faculty/home" />
      <Container>{content}</Container>
    </div>
  );
}

export default FacultyAdvisoryClassScreen;
