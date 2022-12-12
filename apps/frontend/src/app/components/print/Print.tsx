import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { ReportCardTable } from '../tables/Tables';
import '../header/header.scss';

export function PrintStudentRecordsGrade({
  eleven,
  elevenFirst,
  elevenSecond,
  twelve,
  twelveFirst,
  twelveSecond,
}: any) {
  console.log(
    eleven,
    elevenFirst,
    elevenSecond,
    twelve,
    twelveFirst,
    twelveSecond
  );
  return (
    <div>
      <nav className="topHeader py-2 mb-5">
        <Container>
          <Row className="text-center justify-content-center">
            <Col className="my-auto" lg="1" md="12" style={{ width: '95px' }}>
              <Image
                src="../../assets/images/pnhs-logo.png"
                alt="pnhs-logo"
                fluid
                roundedCircle
              />
            </Col>
            <Col className="my-auto" lg="11" md="12">
              <h1 className="mt-2">
                <strong>Pangasinan National High School</strong>
              </h1>
              <h4>
                <em>Senior High School Student Portal</em>
              </h4>
            </Col>
          </Row>
        </Container>
      </nav>
      <Container>
        {eleven}
        {elevenFirst}
        {elevenSecond}
        {twelve}
        {twelveFirst}
        {twelveSecond}
      </Container>
    </div>
  );
}
