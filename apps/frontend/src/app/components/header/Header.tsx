import React from 'react';
import { Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './header.scss';
import { useNavigate } from 'react-router-dom';
import { deleteCookie } from 'cookies-next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Header({ page, redirect }: any) {
  const role = window.location.pathname.split('/');

  const navigate = useNavigate();

  const logoutHandler = () => {
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    localStorage.removeItem('userInfo');

    navigate('/');
  };

  return (
    <div className="mb-5">
      <nav className="topHeader py-2">
        <Container>
          <Row className="text-center text-md-start justify-content-center justify-content-md-start">
            <Col className="my-auto" md="1" sm="12" style={{ width: '95px' }}>
              <Image
                src="../../assets/images/pnhs-logo.png"
                alt="pnhs-logo"
                fluid
                roundedCircle
              />
            </Col>
            <Col className="my-auto" md="11" sm="12">
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
      <Navbar expand="md" className="bottomHeader">
        <Container>
          {page === 'Menu' && role[1] === 'admin' ? (
            <Navbar.Brand>
              <h3 className="py-0 my-0">Admin User</h3>
            </Navbar.Brand>
          ) : page === 'Menu' && role[1] === 'faculty' ? (
            <Navbar.Brand>
              <h3 className="py-0 my-0">Faculty User</h3>
            </Navbar.Brand>
          ) : page === 'Menu' && role[1] === 'student' ? (
            <Navbar.Brand>
              <h3 className="py-0 my-0">Student User</h3>
            </Navbar.Brand>
          ) : page === 'Strand/Enrollees/Subject' && role[1] === 'enrollee' ? (
            <LinkContainer to="/">
              <Navbar.Brand>Back</Navbar.Brand>
            </LinkContainer>
          ) : (
            <LinkContainer to={redirect}>
              <Navbar.Brand>Back</Navbar.Brand>
            </LinkContainer>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {role[1] === 'enrollee' ? (
                <></>
              ) : page === 'Menu' ? (
                <>
                  <Navbar.Brand>
                    <strong>Menu</strong>
                  </Navbar.Brand>
                  <Navbar.Brand>
                    <div className="clickable" onClick={logoutHandler}>
                      Logout
                    </div>
                  </Navbar.Brand>
                </>
              ) : (
                <>
                  {role[1] === 'admin' ? (
                    <LinkContainer to="/admin/home">
                      <Navbar.Brand>
                        <div>Menu</div>
                      </Navbar.Brand>
                    </LinkContainer>
                  ) : role[1] === 'student' ? (
                    <LinkContainer to="/student/home">
                      <Navbar.Brand>
                        <div>Menu</div>
                      </Navbar.Brand>
                    </LinkContainer>
                  ) : (
                    <LinkContainer to="/faculty/home">
                      <Navbar.Brand>
                        <div>Menu</div>
                      </Navbar.Brand>
                    </LinkContainer>
                  )}
                  <Navbar.Brand>
                    <strong>{page}</strong>
                  </Navbar.Brand>
                  <Navbar.Brand>
                    <div className="clickable" onClick={logoutHandler}>
                      Logout
                    </div>
                  </Navbar.Brand>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
