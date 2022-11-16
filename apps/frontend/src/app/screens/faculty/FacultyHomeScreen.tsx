import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';

function FacultyHomeScreen() {
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Menu" />
      <Container>
        <Row>
          <LinkContainer to="/faculty/profile">
            <Col md="3" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/faculty/faculty-profile.png"
                fluid
              />
              <div>Faculty Profile</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/faculty/schedule">
            <Col md="3" xs="6" className="text-center mb-3 clickable">
              <Image src="../assets/images/icons/faculty/schedule.png" fluid />
              <div>Schedule</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/faculty/advisoryclass">
            <Col md="3" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/faculty/advisory-class.png"
                width={'100px'}
                fluid
              />
              <div>Advisory Class</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/faculty/shsgrade">
            <Col md="3" xs="6" className="text-center mb-3 clickable">
              <Image src="../assets/images/icons/faculty/shs-grade.png" fluid />
              <div>SHS Grade</div>
            </Col>
          </LinkContainer>
        </Row>
      </Container>
    </div>
  );
}

export default FacultyHomeScreen;
