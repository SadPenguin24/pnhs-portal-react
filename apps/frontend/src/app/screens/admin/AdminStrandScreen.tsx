import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Header from '../../components/header/Header';

function AdminStrandScreen() {
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Strand/Enrollees/Subject" redirect="/admin/home" />
      <Container>
        <Row>
          <LinkContainer to="/admin/enrollees/abm">
            <Col md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/strands/ABM.png"
                width={'100px'}
                fluid
              />
              <div>ABM</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrollees/gas">
            <Col md="4" xs="6" className="text-center mb-3 clickable">
              <Image src="../assets/images/icons/strands/GAS.png" fluid />
              <div>GAS</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrollees/humss">
            <Col md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/strands/HUMSS.png"
                width={'100px'}
                fluid
              />
              <div>HUMSS</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrollees/sports">
            <Col md="4" xs="6" className="text-center mb-3 clickable">
              <Image src="../assets/images/icons/strands/SPORTS.png" fluid />
              <div>SPORTS</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrollees/stem">
            <Col md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/strands/STEM.png"
                width={'100px'}
                fluid
              />
              <div>STEM</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrollees/tvl-cookery">
            <Col md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/strands/TVL-COOKery.png"
                fluid
              />
              <div>TVL-COOKERY</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrollees/tvl-homeeconomics">
            <Col md="4" xs="6" className="text-center mb-3 clickable">
              <Image
                src="../assets/images/icons/strands/TVL-HE.png"
                width={'100px'}
                fluid
              />
              <div>TVL-HOME ECONOMICS</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/enrollees/tvl-ict">
            <Col md="4" xs="6" className="text-center mb-3 clickable">
              <Image src="../assets/images/icons/strands/TVL-ICT.png" fluid />
              <div>TVL-ICT</div>
            </Col>
          </LinkContainer>
        </Row>
      </Container>
    </div>
  );
}

export default AdminStrandScreen;
