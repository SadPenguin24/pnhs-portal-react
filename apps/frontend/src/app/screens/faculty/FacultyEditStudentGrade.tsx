import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import {
  useGetUserByIdQuery,
  useUpdateGradeMutation,
} from '../../redux/api/userApi';

function FacultyEditStudentGrade() {
  const { sectionId, studentId, subjectId } = useParams();

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  let [currentReportCard]: any = useState();

  const {
    data: student,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserByIdQuery(studentId);

  const [updateGrade] = useUpdateGradeMutation();

  const updateGradeHandler = async ({
    termNum,
    gradeLevel,
    firstHalf,
    secondHalf,
  }: any) => {
    let term = Number(termNum);
    let grade_level = Number(gradeLevel);
    let first_half = Number(firstHalf);
    let second_half = Number(secondHalf);
    const final_grade = (first_half + second_half) / 2;
    let remarks;

    if (final_grade > 74) {
      remarks = 'Passed';
    } else {
      remarks = 'Failed';
    }

    console.log(
      typeof studentId,
      typeof subjectId,
      typeof term,
      typeof grade_level,
      typeof first_half,
      typeof second_half,
      typeof final_grade,
      typeof remarks,
      studentId,
      subjectId,
      term,
      grade_level,
      first_half,
      second_half,
      final_grade,
      remarks
    );

    await updateGrade({
      studentId,
      subjectId,
      term,
      grade_level,
      first_half,
      second_half,
      final_grade,
      remarks,
    });

    alert(`Successfully update grade of ${student.last_name}.`);

    navigate(`/faculty/shsgrade/section/${sectionId}`);
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
    if (student) {
      student.student.report_card.map((card: any) => {
        if (card.subject._id === subjectId) {
          currentReportCard = card;
        }
      });
    }
    console.log(currentReportCard);
    content = (
      <Form onSubmit={handleSubmit(updateGradeHandler)}>
        <Row className="mb-3">
          <Col md={2}>Subject:</Col>
          <Col md={10}>{currentReportCard.subject.subject_name}</Col>
        </Row>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Term:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="number"
              {...register('termNum')}
              defaultValue={currentReportCard.term}
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
              type="number"
              {...register('gradeLevel')}
              defaultValue={currentReportCard.grade_level}
              readOnly
              plaintext
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            First Half:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="number"
              {...register('firstHalf')}
              defaultValue={currentReportCard.first_half}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Second Half:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="number"
              {...register('secondHalf')}
              defaultValue={currentReportCard.second_half}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Final Grade:
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="number"
              {...register('finalGrade')}
              defaultValue={currentReportCard.final_grade}
              readOnly
              plaintext
            />
          </Col>
        </Form.Group>
        <Button type="submit">Update Grade</Button>
      </Form>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header
        page="SHS Grade"
        redirect={`/faculty/shsgrade/section/${sectionId}`}
      />
      <Container>{content}</Container>
    </div>
  );
}

export default FacultyEditStudentGrade;
