import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useCreateSectionMutation } from '../../redux/api/sectionApi';

function AdminCreateSectionScreen() {
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [role] = useState('student');
  const [section_name, setSectionName] = useState('');
  const [teacher_id, setTeacherId] = useState('');
  const [students_id, setStudentsId] = useState([]);
  const [school_year, setSchoolYear] = useState('');

  const navigate = useNavigate();

  const [createSection] = useCreateSectionMutation();

  const createSectionHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsSuccess(false);
    setIsLoading(true);

    const { section } = await createSection({
      role,
      section_name,
      teacher_id,
      students_id,
      school_year,
    }).unwrap();

    setIsLoading(false);
    setIsSuccess(true);

    navigate('/admin/section');
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
      <Form onSubmit={createSectionHandler}>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Section:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              value={section_name}
              onChange={(e) => setSectionName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Teacher Id:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              value={teacher_id}
              onChange={(e) => setTeacherId(e.target.value)}
            />
          </Col>
        </Form.Group>
        {/* form of students id */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            School Year:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              value={school_year}
              onChange={(e) => setSchoolYear(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type="submit">Create Section</Button>
      </Form>
    );
  }

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Create Section" redirect="/admin/section" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminCreateSectionScreen;
