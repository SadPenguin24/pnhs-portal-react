import React, { useState } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import Header from '../../components/header/Header';
import '../../styles/adminHome.scss';
import { useGetParsedSectionsQuery } from '../../redux/api/sectionApi';
import { useNavigate } from 'react-router-dom';

function FacultyHandleSectionsScreen() {
  const navigate = useNavigate();

  const [facultySections]: any = useState([]);

  const {
    data: sections,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetParsedSectionsQuery({});

  const currentFaculty = JSON.parse(localStorage.getItem('userInfo')!);

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
    if (sections) {
      sections.map((section: any) => {
        currentFaculty.faculty.handled_subjects.map((handledSubject: any) => {
          if (
            handledSubject.section_id === section._id &&
            !facultySections.includes(section)
          ) {
            facultySections.push(section);
          }
        });
        console.log(currentFaculty);
      });
    }
    content = (
      <Table bordered className="tableColor">
        <thead style={{ backgroundColor: '#2a6fd6' }}>
          <tr className="text-center">
            <th>Section</th>
            <th>Faculty Adviser</th>
            <th>School Year</th>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {facultySections.length > 0 ? (
            facultySections.map((section: any) => (
              <tr key={section._id}>
                <td>{section.section_name}</td>
                <td>
                  {section.teacher.first_name} {section.teacher.last_name}
                </td>
                <td>{section.school_year}</td>
                <td>
                  <Button
                    onClick={() =>
                      navigate(`/faculty/shsgrade/section/${section._id}`)
                    }
                  >
                    View
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
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="SHS Grade" redirect="/faculty/home" />
      <Container>{content}</Container>
    </div>
  );
}

export default FacultyHandleSectionsScreen;
