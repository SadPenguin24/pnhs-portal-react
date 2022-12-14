import React, { useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';

function StudentHomeScreen() {
  const [currentUser] = useState(JSON.parse(localStorage.getItem('userInfo')!));
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Menu" />
      <Container>
        <Row>
          <LinkContainer to="/student/profile">
            <Col xs="6" md="3" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/student/student-profile.png"
                fluid
              />
              <div>Student Profile</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/student/enrollment/sections">
            <Col xs="6" md="3" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/student/enrollment-registration.png"
                fluid
              />
              <div>Enrollment / Registration</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/student/reportcard">
            <Col xs="6" md="3" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/student/report-card.png"
                fluid
              />
              <div>Report Card</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/student/schedule">
            <Col xs="6" md="3" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/student/schedule-subjects.png"
                fluid
              />
              <div>Schedule / Subjects</div>
            </Col>
          </LinkContainer>
        </Row>
      </Container>
    </div>
  );
}

export default StudentHomeScreen;
