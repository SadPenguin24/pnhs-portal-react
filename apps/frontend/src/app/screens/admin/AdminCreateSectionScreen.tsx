import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useCreateSectionMutation } from '../../redux/api/sectionApi';
import { useGetRoleQuery } from '../../redux/api/userApi';

function AdminCreateSectionScreen() {
  const { register, handleSubmit } = useForm();

  const {
    data: teachers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRoleQuery('faculty');

  const [role] = useState('student');
  const [students_id, setStudentsId] = useState([]);

  const navigate = useNavigate();

  const [createSection] = useCreateSectionMutation();

  const createSectionHandler = async ({
    school_year,
    section_name,
    teacher_id,
  }: any) => {
    await createSection({
      role,
      section_name,
      teacher_id,
      students_id,
      school_year,
    });

    alert('Successfully create a section.');

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
      <Form onSubmit={handleSubmit(createSectionHandler)}>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Section:
          </Form.Label>
          <Col md={10}>
            <Form.Control type="text" {...register('section_name')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            School Year:
          </Form.Label>
          <Col md={10}>
            <Form.Control type="text" {...register('school_year')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Faculty:
          </Form.Label>
          <Col md={10}>
            <Form.Select {...register('teacher_id')}>
              {teachers ? (
                teachers.map((teacher: any) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.first_name} {teacher.last_name}
                  </option>
                ))
              ) : (
                <option>No Faculty</option>
              )}
            </Form.Select>
          </Col>
        </Form.Group>
        {/* form of students id */}
        <Button type="submit">Create Section</Button>
      </Form>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
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
