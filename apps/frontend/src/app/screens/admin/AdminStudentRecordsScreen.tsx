/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
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
  const componentRef1 = useRef(null);
  const componentRef2 = useRef(null);

  const { register } = useForm();

  const [role_name] = useState('student');
  const [searchResults, setSearchResults]: any = useState([]);

  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRoleQuery(role_name);

  const searchStudent = (e: any) => {
    // setSearching(true);
    console.log(e.target.value);

    // const condition = new RegExp(lastName.trim(), 'i');

    // const result = students.filter((student: any) =>
    //   condition.test(student.last_name)
    // );
    // console.log(result);
    // setSearchResults(result);
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
      <>
        <Row className="mb-5">
          <Col md="7">
            <Form>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column md={2}>
                  Student No.
                </Form.Label>
                <Col md={10}>
                  <Form.Control type="text" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column md={2}>
                  Name
                </Form.Label>
                <Col md={10}>
                  <Form.Control type="text" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column md={2}>
                  Address
                </Form.Label>
                <Col md={10}>
                  <Form.Control type="text" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column md={2}>
                  Contact
                </Form.Label>
                <Col md={10}>
                  <Form.Control type="text" />
                </Col>
              </Form.Group>
            </Form>
          </Col>
          <Col md="5">
            <div>Requirements</div>
            <Form>
              <Form.Check type="checkbox" label="Personal Data Sheet" />
              <Form.Check type="checkbox" label="Good Moral" />
              <Form.Check type="checkbox" label="Birth Certificate" />
              <Form.Check type="checkbox" label="Grade 10 Report Card" />
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
          <Row className="mb-4 mx-md-5">
            <Col md="6">
              <Form>
                <Form.Group as={Row} className="mb-2">
                  <Form.Label column lg={2} md={3}>
                    School Year
                  </Form.Label>
                  <Col lg={10} md={9}>
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
              </Form>
            </Col>
            <Col md="6"></Col>
            <Col md="6">
              <Form>
                <Form.Group as={Row} className="mb-2">
                  <Form.Label column lg={2} md={3}>
                    Term
                  </Form.Label>
                  <Col lg={10} md={9}>
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                  <Form.Label column lg={2} md={3}>
                    Grade
                  </Form.Label>
                  <Col lg={10} md={9}>
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                  <Form.Label column lg={2} md={3}>
                    Section / Strand
                  </Form.Label>
                  <Col lg={10} md={9}>
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
              </Form>
            </Col>
            <Col md="6">
              <Form>
                <Form.Group as={Row} className="mb-2">
                  <Form.Label column lg={2} md={3}>
                    Term
                  </Form.Label>
                  <Col lg={10} md={9}>
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                  <Form.Label column lg={2} md={3}>
                    Grade
                  </Form.Label>
                  <Col lg={10} md={9}>
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                  <Form.Label column lg={2} md={3}>
                    Section / Strand
                  </Form.Label>
                  <Col lg={10} md={9}>
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <ReactToPrint
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
          <ReportCardTable headerColor="#19940e" sem="2nd" />
        </div>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Student Records" redirect="/admin/home" />
      <Container>
        <Form
          // onSubmit={handleSubmit(searchStudent)}
          className="d-flex justify-content-end"
        >
          <Form.Control
            type="text"
            className="w-50 d-flex mb-3"
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
        </Form>
        {content}
      </Container>
    </div>
  );
}

export default AdminStudentRecordsScreen;
