import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import {
  useGetCurriculumQuery,
  useUpdateCurriculumMutation,
} from '../../redux/api/curriculumApi';
import { useGetSubjectsQuery } from '../../redux/api/subjectApi';

function AdminViewCurriculumScreen() {
  const { id } = useParams();

  const { register, handleSubmit } = useForm();

  const [subject_ids, setSubjectIds]: any = useState([]);
  let [filterSubjects, setFilterSubjects]: any = useState([]);
  const [notEditing, setNotEditing] = useState(true);

  const { data: subjects } = useGetSubjectsQuery({});

  const {
    data: curriculum,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCurriculumQuery(id);

  const addSubjectHandler = (e: any) => {
    const index = subject_ids.indexOf(e.target.value);
    if (index > -1) {
      subject_ids.splice(index, 1);
    } else {
      subject_ids.push(e.target.value);
    }
  };

  const changeStrand = (e: any) => {
    if (curriculum.strand !== e.target.value) {
      setSubjectIds([]);
    } else {
      curriculum.subject_ids.forEach((subject: any) => {
        if (!subject_ids.includes(subject)) {
          subject_ids.push(subject);
        }
      });
    }

    setFilterSubjects(
      () =>
        (filterSubjects = subjects.filter(
          (subject: any) => subject.strand === e.target.value
        ))
    );
  };

  const [updateCurriculum] = useUpdateCurriculumMutation();

  const updateCurriculumHandler = async ({
    school_year,
    strand,
    grade_level,
    term,
  }: any) => {
    console.log(school_year, strand, grade_level, term, subject_ids);
    await updateCurriculum({
      id,
      school_year,
      strand,
      grade_level,
      term,
      subject_ids,
    });

    alert('Successfully update curriculum.');

    setNotEditing(true);
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
    console.log(subject_ids);
    content = (
      <Form onSubmit={handleSubmit(updateCurriculumHandler)}>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            School Year:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{curriculum.school_year}</div>
            ) : (
              <Form.Select {...register('school_year')}>
                <option value={curriculum.school_year}>
                  {curriculum.school_year}
                </option>
                {years.map((year: any) => {
                  let schoolYear = year - 1 + '-' + year;
                  if (curriculum.school_year === schoolYear) {
                    return;
                  }
                  return <option key={year}>{schoolYear}</option>;
                })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Strand:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{curriculum.strand}</div>
            ) : (
              <Form.Select {...register('strand')} onChange={changeStrand}>
                <option value={curriculum.strand}>{curriculum.strand}</option>
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
                  if (curriculum.strand === strand) {
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
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Grade Level:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{curriculum.grade_level}</div>
            ) : (
              <Form.Select {...register('grade_level')}>
                <option value={curriculum.grade_level}>
                  {curriculum.grade_level}
                </option>
                {[11, 12].map((gradeLevel: any) => {
                  if (curriculum.grade_level === gradeLevel) {
                    return;
                  }
                  return (
                    <option key={gradeLevel} value={gradeLevel}>
                      {gradeLevel}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Term:
          </Form.Label>
          <Col md={10}>
            {notEditing ? (
              <div>{curriculum.term}</div>
            ) : (
              <Form.Select {...register('term')}>
                <option value={curriculum.term}>{curriculum.term}</option>
                {['1', '2'].map((term: any) => {
                  if (curriculum.term === term) {
                    return;
                  }
                  return (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={2}>
            Subjects:
          </Form.Label>
          <Col md={10}>
            <Row>
              {notEditing ? (
                curriculum.subject_ids.length > 0 ? (
                  curriculum.subject_ids.map((subject: any) => (
                    <Col key={subject._id} md={3} xs={6} className="p-2">
                      <span className="border-bottom border-primary">
                        {subjects &&
                          subjects.map((item: any) => {
                            if (item._id === subject) {
                              return (
                                item.subject_name + ' (' + item.strand + ')'
                              );
                            }
                            return;
                          })}
                      </span>
                    </Col>
                  ))
                ) : (
                  <div>No Subjects</div>
                )
              ) : filterSubjects && filterSubjects.length > 0 ? (
                filterSubjects.map((subject: any) => (
                  <Col lg="4" md="6" xs="12" className="mb-2" key={subject._id}>
                    <Form.Check
                      type="checkbox"
                      name="subject"
                      label={subject.subject_name + ' (' + subject.strand + ')'}
                      defaultChecked={subject_ids.includes(subject._id) && true}
                      value={subject._id}
                      onChange={addSubjectHandler}
                    />
                  </Col>
                ))
              ) : (
                <div>No Subjects</div>
              )}
            </Row>
          </Col>
        </Form.Group>
        {notEditing ? (
          <Button
            onClick={() => {
              if (subjects) {
                setFilterSubjects(() => {
                  return subjects.filter(
                    (subject: any) => subject.strand === curriculum.strand
                  );
                });
                curriculum.subject_ids.forEach((subject: any) => {
                  if (!subject_ids.includes(subject)) {
                    subject_ids.push(subject);
                  }
                });
              }
              setNotEditing(false);
            }}
          >
            Edit
          </Button>
        ) : (
          <>
            <Button type="submit" className="me-3">
              Save
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setSubjectIds([]);
                setNotEditing(true);
              }}
            >
              Exit
            </Button>
          </>
        )}
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

export default AdminViewCurriculumScreen;
