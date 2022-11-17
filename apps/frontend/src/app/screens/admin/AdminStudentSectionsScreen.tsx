import React, { useEffect } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useGetSectionsQuery } from '../../redux/api/sectionApi';
import { getSections } from '../../redux/slice/sectionSlice';
import { useAppDispatch } from '../../redux/store';

function AdminStudentSectionsScreen() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    data: sections,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSectionsQuery({});

  useEffect(() => {
    dispatch(getSections({ sections }));
  }, [dispatch, sections]);

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
      <Table bordered className="tableColor">
        <thead style={{ backgroundColor: '#2a6fd6' }}>
          <tr className="text-center">
            <th>Section</th>
            <th>Faculty</th>
            <th>School Year</th>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {sections ? (
            sections.map((section: any) => (
              <tr key={section._id}>
                <td>{section.section_name}</td>
                <td>{section.teacher_id}</td>
                <td>{section.school_year}</td>
                <td>
                  <Button
                    onClick={() => navigate(`/admin/section/${section._id}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No Section</td>
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
      <Header page="Sections" redirect="/admin/home" />
      <Container>
        <div className="text-end mb-3">
          <Button onClick={() => navigate('/admin/section/create')}>
            Create Section
          </Button>
        </div>
        {content}
      </Container>
    </div>
  );
}

export default AdminStudentSectionsScreen;
