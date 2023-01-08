/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Header from '../../components/header/Header';
import { PrintStudentRecordsGrade } from '../../components/print/Print';
import { ReportCardTable } from '../../components/tables/Tables';
import '../../components/tables/tables.scss';
import { useGetRoleQuery } from '../../redux/api/userApi';

function AdminStudentRecordsScreen() {
  const componentRef = useRef(null);

  const { register } = useForm();

  const [role_name] = useState('student');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults]: any = useState([]);
  const [selectedStudent, setSelectedStudent]: any = useState();

  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRoleQuery(role_name);

  const searchStudent = (e: any) => {
    setSearching(true);
    console.log(e.target.value);

    if (e.target.value === '') {
      setSearchResults([]);
      return;
    }

    const condition = new RegExp(e.target.value.trim(), 'i');

    const result = students.filter((student: any) =>
      condition.test(student.last_name)
    );
    console.log(result);
    setSearchResults(result);
  };

  let content,
    eleven,
    elevenFirst,
    elevenSecond,
    twelve,
    twelveFirst,
    twelveSecond;

  if (
    selectedStudent &&
    selectedStudent.student.report_card.length > 0 &&
    selectedStudent.student.section_id
  ) {
    if (
      selectedStudent.student.report_card.find(
        ({ grade_level }: any) => grade_level === 11
      )
    ) {
      eleven = <h3>Grade 11</h3>;
      if (
        selectedStudent.student.report_card.find(({ term }: any) => term === 1)
      ) {
        const cardData = selectedStudent.student.report_card.filter(
          ({ term, grade_level }: any) => term === 1 && grade_level === 11
        );
        elevenFirst = (
          <>
            <h4>1ST SEMESTER</h4>
            <ReportCardTable data={cardData} headerColor="#19940e" sem="1st" />
          </>
        );
      }
      if (
        selectedStudent.student.report_card.find(({ term }: any) => term === 2)
      ) {
        const cardData = selectedStudent.student.report_card.filter(
          ({ term, grade_level }: any) => term === 2 && grade_level === 11
        );
        elevenSecond = (
          <>
            <h4>2nd SEMESTER</h4>
            <ReportCardTable data={cardData} headerColor="#808580" sem="2nd" />
          </>
        );
      }
    }
    if (
      selectedStudent.student.report_card.find(
        ({ grade_level }: any) => grade_level === 12
      )
    ) {
      twelve = <h3>Grade 12</h3>;
      if (
        selectedStudent.student.report_card.find(({ term }: any) => term === 1)
      ) {
        const cardData = selectedStudent.student.report_card.filter(
          ({ term, grade_level }: any) => term === 1 && grade_level === 12
        );
        twelveFirst = (
          <>
            <h4>1ST SEMESTER</h4>
            <ReportCardTable data={cardData} headerColor="#19940e" sem="1st" />
          </>
        );
      }
      if (
        selectedStudent.student.report_card.find(({ term }: any) => term === 2)
      ) {
        const cardData = selectedStudent.student.report_card.filter(
          ({ term, grade_level }: any) => term === 2 && grade_level === 12
        );
        twelveSecond = (
          <>
            <h4>2nd SEMESTER</h4>
            <ReportCardTable data={cardData} headerColor="#808580" sem="2nd" />
          </>
        );
      }
    }
  }

  if (isLoading) {
    content = (
      <div className="text-center">
        <Spinner variant="primary" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (isSuccess || selectedStudent) {
    console.log(selectedStudent);
    content = (
      <>
        <Row className="mb-5">
          <Col md="7">
            <Form>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column md={2}>
                  LRN
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    value={selectedStudent && selectedStudent.student.lrn}
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column md={2}>
                  Name
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    value={
                      selectedStudent &&
                      selectedStudent.first_name +
                        ' ' +
                        selectedStudent.last_name
                    }
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column md={2}>
                  Address
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    value={selectedStudent && selectedStudent.profile.address}
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column md={2}>
                  Contact
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    value={
                      selectedStudent && selectedStudent.profile.phone_number
                    }
                    readOnly
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
          <Col md="5">
            <div>Requirements</div>
            <Form>
              <Form.Check type="checkbox" label="Personal Data Sheet" checked />
              <Form.Check type="checkbox" label="Good Moral" checked />
              <Form.Check type="checkbox" label="Birth Certificate" checked />
              <Form.Check
                type="checkbox"
                label="Grade 10 Report Card"
                checked
              />
            </Form>
          </Col>
        </Row>
        <div>STUDENT GRADES OF SENIOR HIGH STUDENT ONLY</div>
        <div
          style={{
            backgroundColor: '#fffefe',
            border: '1px solid',
          }}
          className="p-3"
        >
          <Form className="mb-5">
            <Form.Group as={Row} className="mb-2">
              <Form.Label column lg={2} md={3}>
                School Year
              </Form.Label>
              <Col lg={10} md={9}>
                <Form.Control
                  type="text"
                  value={selectedStudent && selectedStudent.student.school_year}
                  readOnly
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column lg={2} md={3}>
                Term
              </Form.Label>
              <Col lg={10} md={9}>
                <Form.Control
                  type="text"
                  value={
                    selectedStudent && selectedStudent.student.current_term
                  }
                  readOnly
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column lg={2} md={3}>
                Grade
              </Form.Label>
              <Col lg={10} md={9}>
                <Form.Control
                  type="text"
                  value={
                    selectedStudent && selectedStudent.student.current_grade
                  }
                  readOnly
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column lg={2} md={3}>
                Section / Strand
              </Form.Label>
              <Col lg={10} md={9}>
                <Form.Control
                  type="text"
                  value={selectedStudent && selectedStudent.student.strand}
                  readOnly
                />
              </Col>
            </Form.Group>
          </Form>

          <div
            style={{
              backgroundColor: '#fffefe',
              border: '1px solid',
            }}
            className="p-3"
          >
            <ReactToPrint
              documentTitle="Student_Record"
              trigger={() => <Link to={''}>Print Preview</Link>}
              content={() => componentRef.current}
            />
            <div style={{ display: 'none' }}>
              <div ref={componentRef}>
                <PrintStudentRecordsGrade
                  eleven={eleven}
                  elevenFirst={elevenFirst}
                  elevenSecond={elevenSecond}
                  twelve={twelve}
                  twelveFirst={twelveFirst}
                  twelveSecond={twelveSecond}
                />
              </div>
            </div>
            {eleven}
            {elevenFirst}
            {elevenSecond}
            {twelve}
            {twelveFirst}
            {twelveSecond}
          </div>

          {/* <ReactToPrint
            documentTitle="Student_Record"
            trigger={() => <Link to={''}>Print Preview</Link>}
            content={() => componentRef1.current}
          />
          <div style={{ display: 'none' }}>
            <div ref={componentRef1}>
              <PrintStudentRecordsGrade sem="1st" />
            </div>
          </div>
          <ReportCardTable headerColor="#19940e" sem="1st" />
          <ReactToPrint
            documentTitle="Student_Record"
            trigger={() => <Link to={''}>Print Preview</Link>}
            content={() => componentRef2.current}
          />
          <div style={{ display: 'none' }}>
            <div ref={componentRef2}>
              <PrintStudentRecordsGrade sem="2nd" />
            </div>
          </div>
          <ReportCardTable headerColor="#19940e" sem="2nd" /> */}
        </div>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5" onClick={() => setSearchResults([])}>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Student Records" redirect="/admin/home" />
      <Container>
        <Form
          // onSubmit={handleSubmit(searchStudent)}
          className="d-flex justify-content-end"
        >
          <Form.Control
            type="text"
            className="w-50 d-flex mb-3 position-relative searchBar"
            {...(register('lastName'),
            {
              onChange: searchStudent,
            })}
            style={{
              backgroundColor: '#ffe4a0',
              border: '#eaaa79 solid',
            }}
            placeholder="Search Student's Last Name"
          />
          <ListGroup className="resultBox start-50">
            {searchResults.length > 0 &&
              searchResults.map((result: any) => (
                <ListGroup.Item
                  key={result._id}
                  action
                  onClick={() => setSelectedStudent(result)}
                >
                  {result.first_name + ' ' + result.last_name}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Form>
        {content}
      </Container>
    </div>
  );
}

export default AdminStudentRecordsScreen;
