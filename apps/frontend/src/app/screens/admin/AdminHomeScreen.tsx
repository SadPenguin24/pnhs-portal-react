import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import '../../styles/adminHome.scss';

import Header from '../../components/header/Header';

function AdminHomeScreen() {
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Menu" />
      <Container>
        <Row>
          <LinkContainer to="/admin/profile">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/admin/admin-profile.png"
                fluid
              />
              <div>Admin Profile</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/studentrecords">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/admin/student-records.png"
                fluid
              />
              <div>Student Records</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/studentlist">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/admin/student-masterlist.png"
                fluid
              />
              <div>Student Masterlist</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/facultylist">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/admin/faculty-masterlist.png"
                fluid
              />
              <div>Faculty Masterlist</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/strand">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/admin/strand-enrollees-subject.png"
                fluid
              />
              <div>Strand/Enrollees/Subject</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/schedule/student">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/admin/student-schedule.png"
                fluid
              />
              <div>Student Schedule</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/schedule/faculty">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/admin/faculty-schedule.png"
                fluid
              />
              <div>Faculty Schedule</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrolledlist">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/admin/student-enrolled-masterlist.png"
                fluid
              />
              <div>Student Enrolled Masterlist</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/section">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <Image src="../assets/images/icons/admin/shs-grade.png" fluid />
              <div>Student Sections</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/createprofile">
            <Col lg="3" md="4" xs="6" className="text-center mb-3 clickable">
              <Image src="../assets/images/icons/admin/shs-grade.png" fluid />
              <div>Create Profile</div>
            </Col>
          </LinkContainer>
        </Row>
      </Container>
    </div>
  );
}

export default AdminHomeScreen;
