import React, { useEffect } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/adminHome.scss';
import Header from '../../components/header/Header';
import {
  useDeleteSectionMutation,
  useGetParsedSectionsQuery,
} from '../../redux/api/sectionApi';
import { getSections } from '../../redux/slice/sectionSlice';
import { useAppDispatch } from '../../redux/store';
import {
  useGetMiscQuery,
  useUpdateBoolMutation,
} from '../../redux/api/miscApi';

function AdminStudentSectionsScreen() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { data: misc } = useGetMiscQuery('63976fa2de273706ca849846');

  const [updateBool] = useUpdateBoolMutation();

  const [deleteSection] = useDeleteSectionMutation();

  const {
    data: sections,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetParsedSectionsQuery({});

  useEffect(() => {
    dispatch(getSections({ sections }));
  }, [dispatch, sections]);

  const enrollmentHandler = async () => {
    await updateBool({
      ...misc,
      bool_value: !misc.bool_value,
    });

    if (misc.bool_value) {
      alert('Enrollment is disabled');
    } else {
      alert('Enrollment is enabled');
    }
    console.log(misc.bool_value);
  };

  let content;

  if (isLoading && misc === undefined) {
    content = (
      <div className="text-center">
        <Spinner variant="primary" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (isSuccess) {
    if (misc) {
      console.log(misc);
    }
    console.log(sections);
    content = (
      <>
        <div className="text-end mb-3">
          <Button
            onClick={() => navigate('/admin/section/create')}
            className="me-3"
          >
            Create Section
          </Button>
          {misc?.bool_value ? (
            <Button variant="danger" onClick={enrollmentHandler}>
              Disable Enrollment
            </Button>
          ) : (
            <Button onClick={enrollmentHandler}>Enable Enrollment</Button>
          )}
        </div>
        <Table bordered className="tableColor">
          <thead style={{ backgroundColor: '#2a6fd6' }}>
            <tr className="text-center">
              <th>Section</th>
              <th>Class Adviser</th>
              <th>School Year</th>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {sections.length > 0 ? (
              sections.map((section: any) => (
                <tr key={section._id}>
                  <td>{section.section_name}</td>
                  <td>
                    {section.teacher.first_name} {section.teacher.last_name}
                  </td>
                  <td>{section.school_year}</td>
                  <td className="d-flex justify-content-around">
                    <Button
                      className="me-2"
                      onClick={() =>
                        navigate(`/admin/section/${section._id}?view`)
                      }
                    >
                      View
                    </Button>
                    <Button
                      className="me-2"
                      onClick={() =>
                        navigate(`/admin/section/${section._id}?edit`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (confirm('Are you sure?') === true) {
                          deleteSection(section._id);
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
                <td colSpan={4} className="text-center">
                  No Section
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
      <Header page="Student Sections" redirect="/admin/home" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminStudentSectionsScreen;
