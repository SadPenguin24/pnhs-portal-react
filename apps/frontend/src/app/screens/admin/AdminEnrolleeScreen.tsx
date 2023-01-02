import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import {
  useGetEnrolleeByIdQuery,
  useUpdateEnrolleeMutation,
} from '../../redux/api/enrolleeApi';
import { getEnrolleeById } from '../../redux/slice/enrolleeSlice';
import { useAppDispatch } from '../../redux/store';

function AdminEnrolleeScreen() {
  const { pathStrand, id } = useParams();

  const navigate = useNavigate();

  const [notEditing, setNotEditing] = useState(true);

  const dispatch = useAppDispatch();

  const {
    data: enrollee,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEnrolleeByIdQuery(id);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getEnrolleeById({ enrollee }));
  }, [dispatch, enrollee]);

  // School Years
  let years: any = [];

  for (let i = 0; i < 10; i++) {
    years.push(new Date().getFullYear() + i);
  }

  const [updateEnrollee] = useUpdateEnrolleeMutation();

  const updateHandler = async ({
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
    school_year,
    current_grade,
    current_term,
    ec_full_name,
    ec_relationship,
    ec_mobile_number,
  }: any) => {
    try {
      const emergency_contacts = [
        {
          ec_full_name: ec_full_name,
          ec_relationship: ec_relationship,
          ec_mobile_number: ec_mobile_number,
        },
      ];

      await updateEnrollee({
        id,
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
        birth_date,
        sex,
        civil_status,
        strand,
        school_year,
        current_grade,
        current_term,
        emergency_contacts,
      });

      alert('Successfully update enrollee');

      if (strand.split(' ').join('').toLowerCase() !== pathStrand) {
        navigate(
          `/admin/enrollee/${strand.split(' ').join('').toLowerCase()}/${id}`
        );
      }
      setNotEditing(true);
    } catch (error) {
      alert(error);
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
    console.log(enrollee);
    content = (
      <Form onSubmit={handleSubmit(updateHandler)}>
        <h4 className="mb-2">Enrollee Profile</h4>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            First Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('first_name')}
              defaultValue={enrollee.first_name}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Middle Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('middle_name')}
              defaultValue={enrollee.middle_name}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Last Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('last_name')}
              defaultValue={enrollee.last_name}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Email:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="email"
              required
              {...register('email')}
              defaultValue={enrollee.email}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Address:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('address')}
              defaultValue={enrollee.address}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Phone Number:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('phone_number')}
              defaultValue={enrollee.phone_number}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            LRN:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('lrn')}
              defaultValue={enrollee.lrn}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Religion:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('religion')}
              defaultValue={enrollee.religion}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Nationality:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('nationality')}
              defaultValue={enrollee.nationality}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Age:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="number"
              required
              {...register('age')}
              defaultValue={enrollee.age}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Birth Date:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="date"
              required
              {...register('birth_date')}
              defaultValue={enrollee.birth_date}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Sex:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{enrollee.sex}</div>
            ) : (
              <Form.Select {...register('sex')}>
                <option value={enrollee.sex}>{enrollee.sex}</option>
                {['Male', 'Female'].map((sex: any) => {
                  if (enrollee.sex === sex) {
                    return;
                  }
                  return (
                    <option value={sex} key={sex}>
                      {sex}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Civil Status:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{enrollee.civil_status}</div>
            ) : (
              <Form.Select {...register('civil_status')}>
                <option value={enrollee.civil_status}>
                  {enrollee.civil_status}
                </option>
                {['Single', 'Married', 'Separated', 'Widowed'].map(
                  (civil_status: any) => {
                    if (enrollee.civil_status === civil_status) {
                      return;
                    }
                    return (
                      <option value={civil_status} key={civil_status}>
                        {civil_status}
                      </option>
                    );
                  }
                )}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Strand:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{enrollee.strand}</div>
            ) : (
              <Form.Select {...register('strand')}>
                <option value={enrollee.strand}>{enrollee.strand}</option>
                {[
                  'ABM',
                  'GAS',
                  'HUMSS',
                  'SPORTS',
                  'STEM',
                  'TVL-COOKERY',
                  'TVL-HOME ECONOMICS',
                  'TVL-ICT',
                ].map((strand: any) => {
                  if (enrollee.strand === strand) {
                    return;
                  }
                  return (
                    <option value={strand} key={strand}>
                      {strand}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            School Year:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{enrollee.school_year}</div>
            ) : (
              <Form.Select {...register('school_year')}>
                <option value={enrollee.school_year}>
                  {enrollee.school_year}
                </option>
                {years.map((year: any) => {
                  let schoolYear = year - 1 + '-' + year;
                  if (enrollee.school_year === schoolYear) {
                    return;
                  }
                  return <option key={year}>{schoolYear}</option>;
                })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Grade Level:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{enrollee.current_grade}</div>
            ) : (
              <Form.Select {...register('current_grade')}>
                <option value={enrollee.current_grade}>
                  {enrollee.current_grade}
                </option>
                {['11', '12'].map((current_grade: any) => {
                  if (enrollee.current_grade === current_grade) {
                    return;
                  }
                  return (
                    <option value={current_grade} key={current_grade}>
                      {current_grade}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Term:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{enrollee.current_term}</div>
            ) : (
              <Form.Select {...register('current_term')}>
                <option value={enrollee.current_term}>
                  {enrollee.current_term}
                </option>
                {['1', '2'].map((current_term: any) => {
                  if (enrollee.current_term === current_term) {
                    return;
                  }
                  return (
                    <option value={current_term} key={current_term}>
                      {current_term}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <h4 className="mb-2">Emergency Contact</h4>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Full Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('ec_full_name')}
              defaultValue={enrollee.emergency_contacts[0].ec_full_name}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Relationship:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('ec_relationship')}
              defaultValue={enrollee.emergency_contacts[0].ec_relationship}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Contact Number:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              {...register('ec_mobile_number')}
              defaultValue={enrollee.emergency_contacts[0].ec_mobile_number}
              readOnly={notEditing}
              plaintext={notEditing}
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
        {notEditing ? (
          <Button onClick={() => setNotEditing(false)}>Edit</Button>
        ) : (
          <>
            <Button type="submit" className="me-3">
              Save
            </Button>
            <Button variant="danger" onClick={() => setNotEditing(true)}>
              Exit
            </Button>
          </>
        )}
      </Form>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header
        page="Strand/Enrollees/Subject"
        redirect={`/admin/enrollees/${pathStrand}`}
      />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminEnrolleeScreen;
