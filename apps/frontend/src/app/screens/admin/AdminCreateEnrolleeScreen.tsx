import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useCreateEnrolleeMutation } from '../../redux/api/enrolleeApi';

function AdminCreateEnrolleeScreen() {
  let redirect = location.search && location.search.split('?')[1];

  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [first_name, setFirstName] = useState('');
  const [middle_name, setMiddleName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [birth_certificate, setBirthCertificate] = useState('');
  const [picture_2x2, setPicture] = useState('');
  const [grade_10_card, setGradeTenCard] = useState('');
  const [lrn, setLrn] = useState('');
  const [good_moral, setGoodMoral] = useState('');
  const [strand, setStrand] = useState(() => {
    if (redirect === 'tvl-homeeconomics') {
      return 'TVL-HOME ECONOMICS';
    }
    return redirect ? redirect.toUpperCase() : '';
  });
  const [password, setPassword] = useState('');
  const [c_password, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const [createEnrollee] = useCreateEnrolleeMutation();

  const createEnrolleeHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsSuccess(false);
    setIsLoading(true);

    const { enrollee } = await createEnrollee({
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
      good_moral,
      strand,
      password,
      c_password,
    }).unwrap();

    setIsLoading(false);
    setIsSuccess(true);

    navigate(`/admin/enrollees/${redirect}`);
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
      <Form onSubmit={createEnrolleeHandler} className="my-3">
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            First Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              required
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={middle_name}
              onChange={(e) => setMiddleName(e.target.value)}
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
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              value={lrn}
              onChange={(e) => setLrn(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Strand:
          </Form.Label>
          <Col md={10}>
            {redirect ? (
              <Form.Control type="text" readOnly value={strand} />
            ) : (
              <Form.Select
                defaultValue="Choose strand"
                value={strand}
                onChange={(e) => setStrand(e.target.value)}
              >
                <option value="ABM">ABM</option>
                <option value="GAS">GAS</option>
                <option value="HUMSS">HUMSS</option>
                <option value="SPORTS">SPORTS</option>
                <option value="STEM">STEM</option>
                <option value="TVL-COOKERY">TVL-COOKERY</option>
                <option value="TVL-HOME ECONOMICS">TVL-HOME ECONOMICS</option>
                <option value="TVL-ICT">TVL-ICT</option>
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Password:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Confirm Password:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              value={c_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
