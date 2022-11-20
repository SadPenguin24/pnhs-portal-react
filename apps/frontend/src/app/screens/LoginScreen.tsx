import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { setCookie } from 'cookies-next';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { setCredentials } from '../redux/slice/authSlice';
import { useLoginMutation } from '../redux/api/authApiSlice';

import '../styles/login.scss';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('THIS IS ENV', process.env.NODE_ENV);

    try {
      const { user, access_token, refresh_token } = await login({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ user }));
      localStorage.setItem('userInfo', JSON.stringify(user));

      setCookie('access_token', access_token, {
        sameSite: 'strict',
      });

      setCookie('refresh_token', refresh_token, {
        sameSite: 'strict',
      });

      setEmail('');
      setPassword('');

      if (user.role[0] === 'admin') {
        navigate('/admin/home');
      } else if (user.role[0] === 'faculty') {
        navigate('/faculty/home');
      } else if (user.role[0] === 'student') {
        navigate('/student/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-5">
      {/* change background color to green */}
      <style>{'body { background-color: #25e223; }'}</style>
      <Container style={{ textAlign: 'center' }}>
        <Image
          src="../../assets/images/pnhs-logo.png"
          alt="pnhs-logo"
          width={'20%'}
          roundedCircle
          className="my-4"
        />
        <h1 className="mb-4">
          <strong className="textColor">WELCOME TO YOUR PORTAL</strong>
        </h1>
        <div className="p-4 mx-auto box">
          <Form onSubmit={onSubmitHandler}>
            <Row style={{ textAlign: 'start' }}>
              <Form.Group className="mb-3">
                <Row>
                  <Col md="2">
                    <Form.Label className="textColor">Email: </Form.Label>
                  </Col>
                  <Col md="10">
                    <Form.Control
                      type="email"
                      id="email"
                      value={email}
                      name="email"
                      className="borderColor"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Row>
                  <Col md="2">
                    <Form.Label className="textColor">Password: </Form.Label>
                  </Col>
                  <Col md="10">
                    <Form.Control
                      type="password"
                      id="password"
                      value={password}
                      name="password"
                      className="borderColor"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <div className="text-center mb-3">
                <Button
                  variant="outline-primary"
                  size="lg"
                  type="submit"
                  className="textColor"
                >
                  Login
                </Button>
              </div>
              <div className="text-center">
                <Link style={{ color: '#045933' }} to="#">
                  Forgot Password?
                </Link>
              </div>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default LoginScreen;
