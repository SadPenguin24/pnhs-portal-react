import React from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';
import {
  useDeleteCurriculumMutation,
  useGetCurriculumsQuery,
} from '../../redux/api/curriculumApi';

function AdminCurriculumScreen() {
  const navigate = useNavigate();

  const [deleteCurriculum] = useDeleteCurriculumMutation();

  const {
    data: curriculums,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCurriculumsQuery({});

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
    console.log(curriculums);
    content = (
      <>
        <div className="text-end mb-3">
          <LinkContainer to="/admin/curriculum/create">
            <Button className="me-3">Create Curriculum</Button>
          </LinkContainer>
        </div>
        <Table bordered className="tableColor" responsive="sm">
          <thead style={{ backgroundColor: '#2a6fd6' }}>
            <tr className="text-center">
              <th>School Year</th>
              <th>Strand</th>
              <th>Grade Level</th>
              <th>Term</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {curriculums.length > 0 ? (
              curriculums.map((curriculum: any) => (
                <tr key={curriculum._id}>
                  <td>{curriculum.school_year}</td>
                  <td>{curriculum.strand}</td>
                  <td>{curriculum.grade_level}</td>
                  <td>{curriculum.term}</td>
                  <td className="d-flex justify-content-around">
                    <Button
                      className="me-2"
                      onClick={() =>
                        navigate(`/admin/curriculum/${curriculum._id}?view`)
                      }
                    >
                      View
                    </Button>
                    <Button
                      className="me-2"
                      onClick={() =>
                        navigate(`/admin/curriculum/${curriculum._id}?edit`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (confirm('Are you sure?') === true) {
                          deleteCurriculum(curriculum._id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No Curriculums
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
      <Header page="SHS Curriculum" redirect="/admin/home" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminCurriculumScreen;
