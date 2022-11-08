import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';

function StudentHomeScreen() {
  return (
    <>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Menu" />
      <Container>
        <Row>
          <LinkContainer to="/student/enrollment">
            <Col xs="6" md="3" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Enrollment / Registration
            </Col>
          </LinkContainer>
          <LinkContainer to="/student/profile">
            <Col xs="6" md="3" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Student Profile
            </Col>
          </LinkContainer>
          <LinkContainer to="/student/reportcard">
            <Col xs="6" md="3" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Report Card
            </Col>
          </LinkContainer>
          <LinkContainer to="/student/schedule">
            <Col xs="6" md="3" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Schedule / Subjects
            </Col>
          </LinkContainer>
        </Row>
      </Container>
    </>
  );
}

export default StudentHomeScreen;
