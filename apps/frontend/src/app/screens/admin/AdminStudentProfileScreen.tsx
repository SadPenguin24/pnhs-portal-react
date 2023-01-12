import { deleteCookie } from 'cookies-next';
import React, { useState, useRef } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
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

  const navigate = useNavigate();

  const location = useLocation();

  const separator = location.search ? location.search.split('?')[1] : '/';
  console.log(separator);

  const [notEditing, setNotEditing] = useState(() => {
    if (separator === 'view') {
      return true;
    }
    return false;
  });
  const [changingPass, setChangingPass] = useState(false);

  let [objectStudent] = useState({});
  let [objectProfile] = useState({});
  let [picture_2x2, setPicture]: any = useState();
  let [birth_certificate, setBirthCertificate]: any = useState();
  let [good_moral, setGoodMoral]: any = useState();
  let [grade_10_card, setGrade10Card]: any = useState();

  const { register, handleSubmit } = useForm();

  const {
    data: student,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserByIdQuery(id);

  const [updateStudent] = useUpdateUserMutation();

  const changePassHandler = async ({ password, c_password }: any) => {
    if (password.trim() !== '' || c_password.trim() !== '') {
      if (password !== c_password) {
        alert('Password and Confirm Password should match.');
        return;
      }
    } else {
      alert('Enter a password');
      return;
    }

    await updateStudent({
      id,
      password,
    });

    alert('Successfully change password. Please login again.');

    setChangingPass(false);

    deleteCookie('access_token');
    deleteCookie('refresh_token');
    localStorage.removeItem('userInfo');

    navigate('/');
  };

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
        birth_certificate,
        good_moral,
        grade_10_card,
      };

      const profile = {
        ...objectProfile,
        address: address,
        phone_number: phone_number,
        picture_2x2,
        // birth_date: birth_date,
        // age: age,
        // sex: sex,
        // nationality: nationality,
        // religion: religion,
        // civil_status: civil_status,
        // emergency_contacts: emergency_contacts,
      };

      console.log({
        id,
        first_name,
        middle_name,
        last_name,
        email,
        profile,
        student,
      });

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
    if (picture_2x2 === undefined) {
      picture_2x2 = student.profile.picture_2x2;
    }
    if (birth_certificate === undefined) {
      birth_certificate = student.student.birth_certificate;
    }
    if (good_moral === undefined) {
      good_moral = student.student.good_moral;
    }
    if (grade_10_card === undefined) {
      grade_10_card = student.student.grade_10_card;
    }
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
            <Form.Group as={Row} className="mb-3">
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

            <h4 className="mb-2">Requirements</h4>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column md={3}>
                Picture 2x2:
              </Form.Label>
              <Col md={9}>
                <Form.Check
                  className="mb-2"
                  type="checkbox"
                  disabled={notEditing}
                  defaultChecked={student.profile.picture_2x2}
                  onChange={() => setPicture(!picture_2x2)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column md={3}>
                Birth Certificate:
              </Form.Label>
              <Col md={9}>
                <Form.Check
                  className="mb-2"
                  type="checkbox"
                  disabled={notEditing}
                  defaultChecked={student.student.birth_certificate}
                  onChange={() => setBirthCertificate(!birth_certificate)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column md={3}>
                Good Moral:
              </Form.Label>
              <Col md={9}>
                <Form.Check
                  className="mb-2"
                  type="checkbox"
                  disabled={notEditing}
                  defaultChecked={student.student.good_moral}
                  onChange={() => setGoodMoral(!good_moral)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>
                Grade 10 Report Card:
              </Form.Label>
              <Col md={9}>
                <Form.Check
                  className="mb-2"
                  type="checkbox"
                  disabled={notEditing}
                  defaultChecked={student.student.grade_10_card}
                  onChange={() => setGrade10Card(!grade_10_card)}
                />
              </Col>
            </Form.Group>

            <div className="text-center">
              {notEditing ? (
                <>
                  <Button onClick={() => setNotEditing(false)} className="me-2">
                    Edit
                  </Button>
                  <Button onClick={() => setChangingPass(true)}>
                    Change Password
                  </Button>
                </>
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
        {/* Modal Change Password */}
        <Modal
          show={changingPass}
          onHide={() => setChangingPass(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(changePassHandler)}>
            <Modal.Body>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column md={2}>
                  Password:
                </Form.Label>
                <Col md={10}>
                  <Form.Control type="password" {...register('password')} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={2}>
                  Confirm Password:
                </Form.Label>
                <Col md={10}>
                  <Form.Control type="password" {...register('c_password')} />
                </Col>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => setChangingPass(false)}>
                Close
              </Button>
              <Button variant="secondary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
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
