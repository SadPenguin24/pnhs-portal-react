import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';
import { useGetParsedSectionsQuery } from '../../redux/api/sectionApi';

function FacultyAdvisoryClassScreen() {
  const [currentUser] = useState(JSON.parse(localStorage.getItem('userInfo')!));
  const [advisorySection]: any = useState([]);
  let [filteredSection, setFilteredSection]: any = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const { register, handleSubmit } = useForm();

  const {
    data: sections,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetParsedSectionsQuery({});

  let content, facultySections;

  const getAdvisoryClass = () => {
    console.log('Get Advisory Class');
    currentUser.faculty.advisory_section_ids.map((section: any) => {
      facultySections = sections.find(
        (advisorySection: any) => advisorySection._id === section
      );
      if (!advisorySection.includes(facultySections)) {
        advisorySection.push(facultySections);
      }
    });
  };

  const filterSection = ({ gradeLvl, term, selectSection }: any) => {
    if (gradeLvl === 'All' && term === 'All' && selectSection === 'All') {
      getAdvisoryClass();
      filteredSection = [];
      setIsFiltering(false);
    } else {
      let filter = advisorySection;
      console.log('Filter Sections');
      if (gradeLvl !== 'All') {
        filter = filter.filter(
          (section: any) => section.grade_level === +gradeLvl
        );

        console.log(+gradeLvl, filteredSection);
      }
      if (term !== 'All') {
        filter = filter.filter((section: any) => section.term === +term);

        console.log(+term, filteredSection);
      }
      if (selectSection !== 'All') {
        filter = filter.filter(
          (section: any) => section.section_name === selectSection
        );

        console.log(selectSection, filteredSection);
      }
      setFilteredSection(filter);
      setIsFiltering(true);
    }
    console.log(gradeLvl, term, selectSection);
  };

  if (isLoading) {
    content = (
      <div className="text-center">
        <Spinner variant="primary" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (isSuccess) {
    getAdvisoryClass();
    console.log(advisorySection);
    content = (
      <>
        {currentUser.faculty.advisory_section_ids.length > 0 && (
          <Form onSubmit={handleSubmit(filterSection)}>
            <Row>
              <Form.Group as={Col} className="d-lg-flex">
                <Form.Label className="me-2 my-auto">Grade</Form.Label>
                <Form.Select
                  {...register('gradeLvl')}
                  style={{ height: '37.6px' }}
                >
                  <option>All</option>
                  {advisorySection.find(
                    ({ grade_level }: any) => grade_level === 11
                  ) && <option>{11}</option>}
                  {advisorySection.find(
                    ({ grade_level }: any) => grade_level === 12
                  ) && <option>{12}</option>}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="d-lg-flex">
                <Form.Label className="me-2 my-auto">Term</Form.Label>
                <Form.Select {...register('term')} style={{ height: '37.6px' }}>
                  <option>All</option>
                  {advisorySection.find(({ term }: any) => term === 1) && (
                    <option>{1}</option>
                  )}
                  {advisorySection.find(({ term }: any) => term === 2) && (
                    <option>{2}</option>
                  )}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="d-lg-flex">
                <Form.Label className="me-2 my-auto">Section</Form.Label>
                <Form.Select
                  {...register('selectSection')}
                  style={{ height: '37.6px' }}
                >
                  <option>All</option>
                  {advisorySection.map((section: any) => (
                    <option key={section._id} value={section.section_name}>
                      {section.section_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Col className="my-auto d-grid gap-2">
                <Button type="submit" variant="secondary">
                  Load
                </Button>
              </Col>
            </Row>
          </Form>
        )}

        <Table bordered className="mt-5 tableColor" responsive="lg">
          <thead style={{ backgroundColor: '#2867b1' }}>
            <tr className="text-center">
              <th className="textWhite">Student No.</th>
              <th className="textWhite">Name</th>
              <th className="textWhite">Grade Level</th>
              <th className="textWhite">Term</th>
              <th className="textWhite">Section Name</th>
            </tr>
          </thead>
          <tbody>
            {currentUser.faculty.advisory_section_ids.length > 0 ? (
              isFiltering ? (
                filteredSection.length > 0 ? (
                  filteredSection.map((section: any) =>
                    section.students.length > 0 ? (
                      section.students.map((student: any) => (
                        <tr key={student._id}>
                          <td>{student.profile.lrn}</td>
                          <td>
                            {student.first_name + ' ' + student.last_name}
                          </td>
                          <td>{section.grade_level}</td>
                          <td>{section.term}</td>
                          <td>{section.section_name}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="text-center">
                        <td colSpan={5}>No Found Student</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr className="text-center">
                    <td colSpan={5}>No Found Section</td>
                  </tr>
                )
              ) : (
                advisorySection.map((section: any) =>
                  section.students.map((student: any) => (
                    <tr key={student._id}>
                      <td>{student.profile.lrn}</td>
                      <td>{student.first_name + ' ' + student.last_name}</td>
                      <td>{section.grade_level}</td>
                      <td>{section.term}</td>
                      <td>{section.section_name}</td>
                    </tr>
                  ))
                )
              )
            ) : (
              <tr className="text-center">
                <td colSpan={5}>No Advisory Section</td>
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
      <Header page="Class List" redirect="/faculty/home" />
      <Container>{content}</Container>
    </div>
  );
}

export default FacultyAdvisoryClassScreen;
