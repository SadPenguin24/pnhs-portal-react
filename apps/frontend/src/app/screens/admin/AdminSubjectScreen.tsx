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
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';
import { useGetSubjectsQuery } from '../../redux/api/subjectApi';
import { getSubjects } from '../../redux/slice/subjectSlice';
import { useAppDispatch } from '../../redux/store';

function AdminSubjectScreen() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [filteredSubject, setFilteredSubject]: any = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const dispatch = useAppDispatch();

  const {
    data: subjects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubjectsQuery({});

  useEffect(() => {
    dispatch(getSubjects({ subjects }));
  }, [dispatch, subjects]);

  const filterSubject = ({ strand }: any) => {
    console.log(strand);
    if (strand === 'All') {
      console.log('reset');
      setFilteredSubject([]);
      setIsFiltering(false);
    } else {
      console.log('filter');
      let filter = subjects;
      console.log('Filter Subjects');
      if (strand !== 'All') {
        filter = filter.filter((subject: any) => subject.strand === strand);

        console.log(filter, filteredSubject);
      }
      setFilteredSubject(filter);
      console.log(filteredSubject);
      setIsFiltering(true);
    }
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
    console.log(subjects);
    content = (
      <>
        <Form onSubmit={handleSubmit(filterSubject)}>
          <Row>
            <Col>
              <Form.Select
                style={{
                  backgroundColor: '#ffe4a0',
                  border: '#eaaa79 solid',
                }}
                {...register('strand')}
              >
                <option value="All">All Subjects</option>
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
            <Col>
              <Button variant="secondary" type="submit">
                Load
              </Button>
            </Col>
          </Row>
        </Form>

        <div className="text-end mb-3">
          <Button
            className="me-3"
            onClick={() => navigate(`/admin/subject/create`)}
          >
            Add Subject
          </Button>
          {/* <Button variant="danger">Delete All</Button> */}
        </div>

        <Table bordered className="tableColor">
          <thead style={{ backgroundColor: '#2a6fd6' }}>
            <tr className="text-center">
              <th>Type</th>
              <th>Strand</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects && subjects.length > 0 ? (
              isFiltering ? (
                filteredSubject && filteredSubject.length > 0 ? (
                  filteredSubject.map((subject: any) => (
                    <tr key={subject._id}>
                      <td>{subject.type}</td>
                      <td>{subject.strand}</td>
                      <td>{subject.subject_name}</td>
                      <td className="d-flex justify-content-around">
                        <Button
                          onClick={() =>
                            navigate(`/admin/subject/${subject._id}`)
                          }
                        >
                          View
                        </Button>
                        {/* <Button variant="danger">Delete</Button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No Subjects
                    </td>
                  </tr>
                )
              ) : (
                subjects.map((subject: any) => (
                  <tr key={subject._id}>
                    <td>{subject.type}</td>
                    <td>{subject.strand}</td>
                    <td>{subject.subject_name}</td>
                    <td className="d-flex justify-content-around">
                      <Button
                        onClick={() =>
                          navigate(`/admin/subject/${subject._id}`)
                        }
                      >
                        View
                      </Button>
                      {/* <Button variant="danger">Delete</Button> */}
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No Subjects
                </td>
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
      <Header page="Subjects" redirect={`/admin/home`} />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminSubjectScreen;
