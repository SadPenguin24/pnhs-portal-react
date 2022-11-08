import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';

function FacultyHomeScreen() {
  return (
    <div>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Menu" />
      <Container>
        <Row>
          <LinkContainer to="/faculty/profile">
            <Col md="3" xs="6" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Faculty Profile
            </Col>
          </LinkContainer>
          <LinkContainer to="/faculty/schedule">
            <Col md="3" xs="6" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Schedule
            </Col>
          </LinkContainer>
          <LinkContainer to="/faculty/advisoryclass">
            <Col md="3" xs="6" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Advisory Class
            </Col>
          </LinkContainer>
          <LinkContainer to="/faculty/shsgrade">
            <Col md="3" xs="6" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              SHS Grade
            </Col>
          </LinkContainer>
        </Row>
      </Container>
    </div>
  );
}

export default FacultyHomeScreen;
