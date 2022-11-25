import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/store';
import { setCookie } from 'cookies-next';
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from 'react-bootstrap';
import { setCredentials } from '../redux/slice/authSlice';
import { useLoginMutation } from '../redux/api/authApiSlice';

import '../styles/login.scss';

function LoginScreen() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmitHandler = async ({ email, password }: any) => {
    setLoading(true);

    console.log('THIS IS ENV', process.env.NODE_ENV);

    try {
      const { user, access_token } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user }));

      setCookie('access_token', access_token, {
        sameSite: 'strict',
      });

      setLoading(false);

      if (user.role[0] === 'admin') {
        navigate('/admin/home');
      } else if (user.role[0] === 'faculty') {
        navigate('/faculty/home');
      } else if (user.role[0] === 'student') {
        navigate('/student/home');
      }
    } catch (error: any) {
      if (error.data.message === 'Unauthorized') {
        setLoading(false);
        alert('Enter valid email and password');
      }
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
          // width={'20%'}
          roundedCircle
          className="my-4 logo-width"
        />
        <h1 className="mb-4">
          <strong className="textColor">WELCOME TO YOUR PORTAL</strong>
        </h1>
        <div className="p-5 mx-auto box">
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
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
                      className="borderColor"
                      {...register('email')}
                      required
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
                      className="borderColor"
                      {...register('password')}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <div className="text-center mb-3">
                {loading ? (
                  <Button size="lg">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </Button>
                ) : (
                  <Button size="lg" type="submit" className="textColor">
                    Login
                  </Button>
                )}
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
