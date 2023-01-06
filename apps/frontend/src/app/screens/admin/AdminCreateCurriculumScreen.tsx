import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useCreateCurriculumMutation } from '../../redux/api/curriculumApi';
import { useGetSubjectsQuery } from '../../redux/api/subjectApi';

function AdminCreateCurriculumScreen() {
  const { register, handleSubmit } = useForm();
  const [subject_ids]: any = useState([]);
  const [selectedStrand, setSelectedStrand]: any = useState('ABM');
  let [filterSubjects]: any = useState([]);

  const navigate = useNavigate();

  const {
    data: subjects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubjectsQuery({});

  const addSubjectHandler = (e: any) => {
    const index = subject_ids.indexOf(e.target.value);
    if (index > -1) {
      subject_ids.splice(index, 1);
    } else {
      subject_ids.push(e.target.value);
    }
  };

  const [createCurriculum] = useCreateCurriculumMutation();

  const createCurriculumHandler = async ({
    school_year,
    strand,
    grade_level,
    term,
  }: any) => {
    console.log(school_year, strand, grade_level, term, subject_ids);
    await createCurriculum({
      school_year,
      strand,
      grade_level,
      term,
      subject_ids,
    });

    alert('Successfully create a curriculum.');

    navigate(`/admin/curriculum`);
  };

  // School Years
  let years: any = [];

  for (let i = 0; i < 10; i++) {
    years.push(new Date().getFullYear() + i);
  }

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
    console.log(subjects);

    filterSubjects = subjects.filter(
      (subject: any) => subject.strand === selectedStrand
    );

    content = (
      <Form onSubmit={handleSubmit(createCurriculumHandler)}>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            School Year:
          </Form.Label>
          <Col md={10}>
            <Form.Select {...register('school_year')}>
              {years.map((year: any) => (
                <option key={year}>{year - 1 + '-' + year}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Strand:
          </Form.Label>
          <Col md={10}>
            <Form.Select
              {...register('strand')}
              onChange={(e) => setSelectedStrand(e.target.value)}
            >
              {[
                'ABM',
                'GAS',
                'HUMSS',
                'SPORTS',
                'STEM',
                'TVL-COOKERY',
                'TVL-HOME ECONOMICS',
                'TVL-ICT',
              ].map((strand: any) => (
                <option value={strand} key={strand}>
                  {strand}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Grade Level:
          </Form.Label>
          <Col md={10}>
            <Form.Select {...register('grade_level')}>
              {['11', '12'].map((gradeLevel: any) => (
                <option value={gradeLevel} key={gradeLevel}>
                  {gradeLevel}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Term:
          </Form.Label>
          <Col md={10}>
            <Form.Select {...register('term')}>
              {['1', '2'].map((term: any) => (
                <option value={term} key={term}>
                  {term}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Subjects:
          </Form.Label>
          <Col md={10}>
            <Row>
              {filterSubjects && filterSubjects.length > 0 ? (
                filterSubjects.map((subject: any) => {
                  return (
                    <Col
                      lg="4"
                      md="6"
                      xs="12"
                      className="mb-2"
                      key={subject._id}
                    >
                      <Form.Check
                        type="checkbox"
                        name="subject"
                        label={
                          subject.subject_name + ' (' + subject.strand + ')'
                        }
                        value={subject._id}
                        onChange={addSubjectHandler}
                      />
                    </Col>
                  );
                })
              ) : (
                <div>No Subjects</div>
              )}
            </Row>
          </Col>
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="SHS Curriculum" redirect="/admin/curriculum" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminCreateCurriculumScreen;
