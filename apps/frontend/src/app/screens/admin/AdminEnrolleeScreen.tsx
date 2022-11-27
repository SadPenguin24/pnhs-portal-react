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

  const [updateEnrollee] = useUpdateEnrolleeMutation();

  const updateHandler = async ({
    first_name,
    middle_name,
    last_name,
    email,
    address,
    phone_number,
    lrn,
    strand,
  }: any) => {
    try {
      await updateEnrollee({
        id,
        first_name,
        middle_name,
        last_name,
        email,
        address,
        phone_number,
        lrn,
        strand,
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
              {...register('lrn')}
              defaultValue={enrollee.lrn}
              readOnly={notEditing}
              plaintext={notEditing}
            />
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
        </Form.Group>
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
