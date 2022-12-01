import React, { useEffect } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';
import { useGetSubjectsQuery } from '../../redux/api/subjectApi';
import { getSubjects } from '../../redux/slice/subjectSlice';
import { useAppDispatch } from '../../redux/store';

function AdminSubjectScreen() {
  const navigate = useNavigate();
  const { strand } = useParams();

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
    const filterSubjects = subjects.filter(
      (subject: any) =>
        subject.strand.split(' ').join('').toLowerCase() === strand
    );
    content = (
      <Table bordered className="tableColor">
        <thead style={{ backgroundColor: '#2a6fd6' }}>
          <tr className="text-center">
            <th>Strand</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterSubjects.length !== 0 ? (
            filterSubjects.map((subject: any) => (
              <tr key={subject._id}>
                <td>{subject.strand}</td>
                <td>{subject.subject_name}</td>
                <td className="d-flex justify-content-around">
                  <Button
                    onClick={() =>
                      navigate(`/admin/subject/${strand}/${subject._id}`)
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
              <td colSpan={3} className="text-center">
                No Subjects
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header
        page="Strand/Enrollees/Subject"
        redirect={`/admin/enrollees/${strand}`}
      />
      <Container>
        <div className="text-end mb-3">
          <Button
            className="me-3"
            onClick={() => navigate(`/admin/subject/${strand}/create`)}
          >
            Add Subject
          </Button>
          {/* <Button variant="danger">Delete All</Button> */}
        </div>
        {content}
      </Container>
    </div>
  );
}

export default AdminSubjectScreen;
