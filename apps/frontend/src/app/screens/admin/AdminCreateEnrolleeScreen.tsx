import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useCreateEnrolleeMutation } from '../../redux/api/enrolleeApi';

function AdminCreateEnrolleeScreen() {
  let redirect = location.search && location.search.split('?')[1];

  const { register, handleSubmit } = useForm();

  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [birth_certificate, setBirthCertificate] = useState('');
  const [picture_2x2, setPicture] = useState('');
  const [grade_10_card, setGradeTenCard] = useState('');
  const [good_moral, setGoodMoral] = useState('');
  const [strandName, setStrandName] = useState(() => {
    if (redirect === 'tvl-homeeconomics') {
      return 'TVL-HOME ECONOMICS';
    }
    return redirect ? redirect.toUpperCase() : '';
  });

  const navigate = useNavigate();

  const [createEnrollee] = useCreateEnrolleeMutation();

  const createEnrolleeHandler = async ({
    first_name,
    middle_name,
    last_name,
    email,
    address,
    phone_number,
    lrn,
    religion,
    nationality,
    age,
    sex,
    birth_date,
    civil_status,
    strand,
    password,
    c_password,
    ec_full_name,
    ec_relationship,
    ec_mobile_number,
  }: any) => {
    setIsSuccess(false);
    setIsLoading(true);

    if (password !== c_password) {
      alert('Password and Confirm Password should match.');
      setIsLoading(false);
      setIsSuccess(true);
      return;
    }

    const emergency_contacts = [
      ec_full_name,
      ec_relationship,
      ec_mobile_number,
    ];

    console.log(
      first_name,
      middle_name,
      last_name,
      email,
      address,
      phone_number,
      lrn,
      religion,
      nationality,
      age,
      sex,
      birth_date,
      civil_status,
      strand,
      password,
      c_password,
      emergency_contacts
    );

    await createEnrollee({
      first_name,
      middle_name,
      last_name,
      email,
      address,
      phone_number,
      birth_certificate,
      picture_2x2,
      grade_10_card,
      lrn,
      religion,
      nationality,
      age,
      sex,
      birth_date,
      civil_status,
      good_moral,
      strand,
      password,
      c_password,
      emergency_contacts,
    });

    alert('Successfully create an enrollee.');

    setIsLoading(false);
    setIsSuccess(true);

    if (redirect) {
      navigate(`/admin/enrollees/${redirect}`);
    } else {
      navigate('/');
    }
  };

  let content;

  if (isLoading) {
    content = (
      <div className="text-center">
        <Spinner variant="primary" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <Form onSubmit={handleSubmit(createEnrolleeHandler)} className="my-3">
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            First Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control type="text" required {...register('first_name')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Middle Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control type="text" required {...register('middle_name')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Last Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control type="text" required {...register('last_name')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Email:
          </Form.Label>
          <Col md={10}>
            <Form.Control type="email" required {...register('email')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Address:
          </Form.Label>
          <Col md={10}>
            <Form.Control required type="text" {...register('address')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Phone Number:
          </Form.Label>
          <Col md={10}>
            <Form.Control required type="text" {...register('phone_number')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            LRN:
          </Form.Label>
          <Col md={10}>
            <Form.Control required type="text" {...register('lrn')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Religion:
          </Form.Label>
          <Col md={10}>
            <Form.Control required type="text" {...register('religion')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Nationality:
          </Form.Label>
          <Col md={10}>
            <Form.Control required type="text" {...register('nationality')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Age:
          </Form.Label>
          <Col md={10}>
            <Form.Control required type="number" {...register('age')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Birth Date:
          </Form.Label>
          <Col md={10}>
            <Form.Control required type="date" {...register('birth_date')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Sex:
          </Form.Label>
          <Col md={10}>
            <Form.Select {...register('sex')}>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Civil Status:
          </Form.Label>
          <Col md={10}>
            <Form.Select {...register('civil_status')}>
              <option>Single</option>
              <option>Married</option>
              <option>Separated</option>
              <option>Widowed</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Strand:
          </Form.Label>
          <Col md={10}>
            {redirect ? (
              <Form.Control
                type="text"
                readOnly
                value={strandName}
                {...register('strand')}
              />
            ) : (
              <Form.Select {...register('strand')}>
                {[
                  'ABM',
                  'GAS',
                  'HUMSS',
                  'SPORTS',
                  'STEM',
                  'TVL-COOKERY',
                  'TVL-HOME ECONOMICS',
                  'TVL-ICT',
                ].map((strand: any) => (
                  <option value={strand} key={strand}>
                    {strand}
                  </option>
                ))}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Password:
          </Form.Label>
          <Col md={10}>
            <Form.Control required type="password" {...register('password')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Confirm Password:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              required
              type="password"
              {...register('c_password')}
            />
          </Col>
        </Form.Group>
        <h4 className="mb-2">Emergency Contact</h4>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Full Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control required type="text" {...register('ec_full_name')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Relationship:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              required
              type="text"
              {...register('ec_relationship')}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Contact Number:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              required
              type="text"
              {...register('ec_mobile_number')}
            />
          </Col>
        </Form.Group>
        {/* Images */}
        {/* <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Birth Certificate:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="file"
              // value={birth_certificate}
              // onChange={(e) => setBirthCertificate(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Picture 2x2:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="file"
              // value={picture_2x2}
              // onChange={(e) => setPicture(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Grade 10 Card:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="file"
              // value={grade_10_card}
              // onChange={(e) => setGradeTenCard(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Good Moral:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="file"
              // value={good_moral}
              // onChange={(e) => setGoodMoral(e.target.value)}
            />
          </Col>
        </Form.Group> */}
        <Button type="submit">Create Enrollee</Button>
      </Form>
    );
  }

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header
        page="Strand/Enrollees/Subject"
        redirect={`/admin/enrollees/${redirect}`}
      />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminCreateEnrolleeScreen;
