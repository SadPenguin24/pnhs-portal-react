import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useCreateSubjectMutation } from '../../redux/api/subjectApi';

function AdminCreateSubjectScreen() {
  const { register, handleSubmit } = useForm();

  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { subjectStrand } = useParams();

  const [strand, setStrand] = useState(() => {
    if (subjectStrand === 'tvl-homeeconomics') {
      return 'TVL-HOME ECONOMICS';
    }
    return subjectStrand && subjectStrand.toUpperCase();
  });

  const navigate = useNavigate();

  const [createSubject] = useCreateSubjectMutation();

  const createSubjectHandler = async ({ subject_name }: any) => {
    setIsSuccess(false);
    setIsLoading(true);

    await createSubject({
      subject_name,
      strand,
    });

    alert('Successfully create a subject.');

    setIsLoading(false);
    setIsSuccess(true);

    navigate(`/admin/subject/${subjectStrand}`);
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
      <Form onSubmit={handleSubmit(createSubjectHandler)}>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Subject Name:
          </Form.Label>
          <Col md={10}>
            <Form.Control required type="text" {...register('subject_name')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Strand:
          </Form.Label>
          <Col md={10}>
            <Form.Control type="text" readOnly value={strand} />
          </Col>
        </Form.Group>
        <Button type="submit">Create Subject</Button>
      </Form>
    );
  }

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header
        page="Strand/Enrollees/Subject"
        redirect={`/admin/subject/${subjectStrand}`}
      />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminCreateSubjectScreen;
