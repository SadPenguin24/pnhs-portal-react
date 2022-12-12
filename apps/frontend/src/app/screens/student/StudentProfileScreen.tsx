import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Header from '../../components/header/Header';
import { useUpdateUserMutation } from '../../redux/api/userApi';

function StudentProfileScreen() {
  const [notEditing, setNotEditing] = useState(true);
  const [currentUser] = useState(JSON.parse(localStorage.getItem('userInfo')!));
  const objectStudent = currentUser.student;
  const objectProfile = currentUser.profile;

  const { register, handleSubmit } = useForm();

  const [updateProfile] = useUpdateUserMutation();

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
    ec_full_name,
    ec_relationship,
    ec_mobile_number,
  }: any) => {
    const id = currentUser._id;
    try {
      const emergency_contacts = [
        {
          ec_full_name: ec_full_name,
          ec_relationship: ec_relationship,
          ec_mobile_number: ec_mobile_number,
        },
      ];

      const student = {
        ...objectStudent,
        lrn: lrn,
      };

      const profile = {
        ...objectProfile,
        address: address,
        phone_number: phone_number,
        birth_date: birth_date,
        age: age,
        sex: sex,
        nationality: nationality,
        religion: religion,
        civil_status: civil_status,
        emergency_contacts: emergency_contacts,
      };

      await updateProfile({
        id,
        first_name,
        middle_name,
        last_name,
        email,
        student,
        profile,
      });

      alert('Successfully update profile');

      setNotEditing(true);
    } catch (error) {
      alert(error);
    }
  };

  console.log(currentUser);

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Student Profile" redirect="/student/home" />
      <Container>
        <Form onSubmit={handleSubmit(updateHandler)}>
          <div className="text-end my-0">
            Personal Data / Family / Enrollment
          </div>
          <div>
            <strong>Personal Data:</strong>
          </div>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Last Name:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="text"
                required
                {...register('last_name')}
                defaultValue={currentUser.last_name}
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
                defaultValue={currentUser.first_name}
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
                defaultValue={currentUser.middle_name}
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
                defaultValue={currentUser.email}
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
                defaultValue={currentUser.profile.address}
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
                defaultValue={currentUser.profile.phone_number}
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
                defaultValue={currentUser.student.lrn}
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
                defaultValue={currentUser.profile.religion}
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
                defaultValue={currentUser.profile.nationality}
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
                defaultValue={currentUser.profile.age}
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
                defaultValue={currentUser.profile.birth_date}
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
                <div>{currentUser.profile.sex}</div>
              ) : (
                <Form.Select {...register('sex')}>
                  <option value={currentUser.profile.sex}>
                    {currentUser.profile.sex}
                  </option>
                  {['Male', 'Female'].map((sex: any) => {
                    if (currentUser.profile.sex === sex) {
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
                <div>{currentUser.profile.civil_status}</div>
              ) : (
                <Form.Select {...register('civil_status')}>
                  <option value={currentUser.profile.civil_status}>
                    {currentUser.profile.civil_status}
                  </option>
                  {['Single', 'Married', 'Separated', 'Widowed'].map(
                    (civil_status: any) => {
                      if (currentUser.profile.civil_status === civil_status) {
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
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={2}>
              Strand:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="text"
                required
                defaultValue={currentUser.student.strand}
                {...register('strand')}
                readOnly
                plaintext
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={2}>
              Grade Level:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="text"
                required
                defaultValue={currentUser.student.current_grade}
                {...register('current_grade')}
                readOnly
                plaintext
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={2}>
              Term:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="text"
                required
                defaultValue={currentUser.student.current_term}
                {...register('current_term')}
                readOnly
                plaintext
              />
            </Col>
          </Form.Group>
          <div>
            <strong>Emergency Contact:</strong>
          </div>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              Full Name:
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="text"
                required
                {...register('ec_full_name')}
                defaultValue={
                  currentUser.profile.emergency_contacts[0].ec_full_name
                }
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
                defaultValue={
                  currentUser.profile.emergency_contacts[0].ec_relationship
                }
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
                defaultValue={
                  currentUser.profile.emergency_contacts[0].ec_mobile_number
                }
                readOnly={notEditing}
                plaintext={notEditing}
              />
            </Col>
          </Form.Group>
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
        </Form>
      </Container>
    </div>
  );
}

export default StudentProfileScreen;
