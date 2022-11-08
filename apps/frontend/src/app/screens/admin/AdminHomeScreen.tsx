import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import '../../styles/adminHome.scss';

import Header from '../../components/header/Header';

function AdminHomeScreen() {
  return (
    <>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Menu" />
      <Container>
        <Row>
          <LinkContainer to="/admin/profile">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Admin Profile
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/studentrecords">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Student Records
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/studentlist">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Student Masterlist
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/facultylist">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Faculty Masterlist
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/strand">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Strand/Enrollees/Subject
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/facultyschedule">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Faculty Schedule
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/studentschedule">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Student Schedule
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrolledlist">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <div className="admin-box"></div>
              Student Enrolled Masterlist
            </Col>
          </LinkContainer>
        </Row>
      </Container>
    </>
  );
}

export default AdminHomeScreen;
