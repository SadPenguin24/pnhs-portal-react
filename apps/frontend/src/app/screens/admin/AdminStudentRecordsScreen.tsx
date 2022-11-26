/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import { Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Header from '../../components/header/Header';
import { PrintStudentRecordsGrade } from '../../components/print/Print';
import { ReportCardTable } from '../../components/tables/Tables';
import '../../components/tables/tables.scss';

function AdminStudentRecordsScreen() {
  const componentRef1 = useRef(null);
  const componentRef2 = useRef(null);
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Student Records" redirect="/admin/home" />
      <Container>
        <div className="w-50 mb-3 ms-auto">
          <FormControl
            style={{ backgroundColor: '#ffe4a0', border: '#eaaa79 solid' }}
            placeholder="Enter Student Name"
          ></FormControl>
        </div>

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
      </Container>
    </div>
  );
}

export default AdminStudentRecordsScreen;
