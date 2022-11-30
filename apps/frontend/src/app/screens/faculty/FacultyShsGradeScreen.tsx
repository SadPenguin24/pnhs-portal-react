import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';

import '../../components/tables/tables.scss';
import { useGetParsedSectionQuery } from '../../redux/api/sectionApi';

function FacultyShsGradeScreen() {
  const { sectionId } = useParams();

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [currentSubject, setCurrentSubject]: any = useState();

  const {
    data: section,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetParsedSectionQuery(sectionId);

  useEffect(() => {
    if (section) {
      setCurrentSubject(section.schedules[0].subject._id);
    }
  }, [section]);

  const changeSubject = ({ subject_id }: any) => {
    setCurrentSubject(subject_id);
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
    console.log(section);
    console.log(currentSubject);
    content = (
      <>
        <Form onSubmit={handleSubmit(changeSubject)}>
          <Row>
            <Form.Group as={Col} className="d-flex">
              <Form.Label column md={2}>
                Subject
              </Form.Label>
              <Form.Select
                style={{ height: '37.6px' }}
                {...register('subject_id')}
              >
                {section.schedules.map((schedule: any) => (
                  <option key={schedule._id} value={schedule.subject._id}>
                    {schedule.subject.subject_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Col className="my-auto">
              <Button type="submit" variant="secondary">
                Load
              </Button>
            </Col>
          </Row>
        </Form>
        <Table bordered className="mt-5 tableColor" responsive="sm">
          <thead style={{ backgroundColor: '#2867b1' }}>
            <tr className="text-center">
              <th className="textWhite">Student No.</th>
              <th className="textWhite">Name</th>
              <th className="textWhite">1st Q</th>
              <th className="textWhite">2nd Q</th>
              <th className="textWhite">Final Grade</th>
              <th className="textWhite">Remarks</th>
              <th className="textWhite">Actions</th>
            </tr>
          </thead>
          <tbody>
            {section.students.length > 0 ? (
              section.students.map((student: any) => (
                <tr>
                  <td key={student._id}>{student._id}</td>
                  <td>{student.first_name + ' ' + student.last_name}</td>
                  {student.student.report_card.map((grade: any) => {
                    if (grade.subject._id === currentSubject) {
                      return (
                        <>
                          <td>{grade.first_half}</td>
                          <td>{grade.second_half}</td>
                          <td>{grade.final_grade}</td>
                        </>
                      );
                    }
                    return;
                  })}
                  <td>sample</td>
                  <td>
                    <Button
                      onClick={() =>
                        navigate(
                          `/faculty/shsgrade/section/${sectionId}/student/${student._id}/subject/${currentSubject}`
                        )
                      }
                    >
                      Edit Grade
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Student</td>
              </tr>
            )}
          </tbody>
        </Table>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="SHS Grade" redirect="/faculty/shsgrade/sections" />
      <Container>{content}</Container>
    </div>
  );
}

export default FacultyShsGradeScreen;
