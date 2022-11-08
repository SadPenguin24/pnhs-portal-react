import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';

function AdminStrandScreen() {
  return (
    <div>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Strand/Enrollees/Subject" redirect="/admin/home" />
      <Container>
        <Row>
          <LinkContainer to="/admin/enrollees">
            <Col md="4" xs="6" className="mb-3">
              <div
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  height: '100px',
                  border: 'solid',
                }}
              />
              <div className="text-center">ABM</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrollees">
            <Col md="4" xs="6" className="mb-3">
              <div
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  height: '100px',
                  border: 'solid',
                }}
              />
              <div className="text-center">GAS</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrollees">
            <Col md="4" xs="6" className="mb-3">
              <div
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  height: '100px',
                  border: 'solid',
                }}
              />
              <div className="text-center">STEM</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrollees">
            <Col md="4" xs="6" className="mb-3">
              <div
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  height: '100px',
                  border: 'solid',
                }}
              />
              <div className="text-center">HUMSS</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrollees">
            <Col md="4" xs="6" className="mb-3">
              <div
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  height: '100px',
                  border: 'solid',
                }}
              />
              <div className="text-center">TVL-HOME ECONOMICS</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrollees">
            <Col md="4" xs="6" className="mb-3">
              <div
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  height: '100px',
                  border: 'solid',
                }}
              />
              <div className="text-center">TVL-ICT</div>
            </Col>
          </LinkContainer>
        </Row>
      </Container>
    </div>
  );
}

export default AdminStrandScreen;
