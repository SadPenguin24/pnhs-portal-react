import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useCreateSubjectMutation } from '../../redux/api/subjectApi';

function AdminCreateSubjectScreen() {
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [subject_name, setSubjectName] = useState('');
  const [strand, setStrand] = useState('');

  const navigate = useNavigate();

  const [createSubject] = useCreateSubjectMutation();

  const createSubjectHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsSuccess(false);
    setIsLoading(true);

    const { subject } = await createSubject({
      subject_name,
      strand,
    }).unwrap();

    setIsLoading(false);
    setIsSuccess(true);

    navigate('/admin/subject');
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
      <Form onSubmit={createSubjectHandler}>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Subject Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              value={subject_name}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Strand:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              value={strand}
              onChange={(e) => setStrand(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type="submit">Create Subject</Button>
      </Form>
    );
  }

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Strand/Enrollees/Subject" redirect="/admin/subject" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminCreateSubjectScreen;
