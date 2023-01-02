import React, { useState, useRef } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Header from '../../components/header/Header';
import { PrintStudentRecordsGrade } from '../../components/print/Print';
import { ReportCardTable } from '../../components/tables/Tables';
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '../../redux/api/userApi';

function AdminStudentProfileScreen() {
  const componentRef = useRef(null);

  const { id } = useParams();

  const [notEditing, setNotEditing] = useState(true);
  let [objectStudent] = useState({});
  let [objectProfile] = useState({});

  const { register, handleSubmit } = useForm();

  const {
    data: student,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserByIdQuery(id);

  const [updateStudent] = useUpdateUserMutation();

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
      // const emergency_contacts = [
      //   {
      //     ec_full_name: ec_full_name,
      //     ec_relationship: ec_relationship,
      //     ec_mobile_number: ec_mobile_number,
      //   },
      // ];

      const student = {
        ...objectStudent,
        lrn: lrn,
        strand: strand,
      };

      const profile = {
        ...objectProfile,
        address: address,
        phone_number: phone_number,
        // birth_date: birth_date,
        // age: age,
        // sex: sex,
        // nationality: nationality,
        // religion: religion,
        // civil_status: civil_status,
        // emergency_contacts: emergency_contacts,
      };

      await updateStudent({
        id,
        first_name,
        middle_name,
        last_name,
        email,
        profile,
        student,
      });

      alert('Successfully update student');
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
    console.log(student);
    objectStudent = student.student;
    objectProfile = student.profile;
    content = (
      <>
        <Form onSubmit={handleSubmit(updateHandler)}>
          <div
            className="p-3 mb-5 mx-auto w-75"
            style={{
              backgroundColor: '#fffefe',
              border: '1px solid',
            }}
          >
            <h4 className="mb-5">Student</h4>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column md={2}>
                Student No.:
              </Form.Label>
              <Col md={10}>
                <Form.Control
                  type="text"
                  defaultValue={student.profile.lrn}
                  readOnly
                  plaintext
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
                  defaultValue={student.last_name}
                  readOnly={notEditing}
                  plaintext={notEditing}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column md={2}>
                First Name:
              </Form.Label>
              <Col md={10}>
                <Form.Control
                  type="text"
                  required
                  {...register('first_name')}
                  defaultValue={student.first_name}
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
                  defaultValue={student.middle_name}
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
                  defaultValue={student.email}
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
                  defaultValue={student.profile.address}
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
                  defaultValue={student.profile.phone_number}
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
                  defaultValue={student.student.lrn}
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
                  <div>{student.student.strand}</div>
                ) : (
                  <Form.Select {...register('strand')}>
                    <option value={student.student.strand}>
                      {student.student.strand}
                    </option>
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
                      if (student.student.strand === strand) {
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
            <div className="text-center">
              {notEditing ? (
                <Button onClick={() => setNotEditing(false)}>Edit</Button>
              ) : (
                <div>
                  <Button type="submit" className="me-3">
                    Save
                  </Button>
                  <Button variant="danger" onClick={() => setNotEditing(true)}>
                    Exit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Form>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header redirect="/admin/studentlist" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminStudentProfileScreen;
