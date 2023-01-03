import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Header from '../../components/header/Header';

function AdminCreateCurriculumScreen() {
  // School Years
  let years: any = [];

  for (let i = 0; i < 10; i++) {
    years.push(new Date().getFullYear() + i);
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="SHS Curriculum" redirect="/admin/curriculum" />
      <Container>
        <Form>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column md={2}>
              School Year:
            </Form.Label>
            <Col md={10}>
              <Form.Select>
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
              <Form.Select>
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
              <Form.Select>
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
              <Form.Select>
                {['1', '2'].map((term: any) => (
                  <option value={term} key={term}>
                    {term}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Button>Save</Button>
        </Form>
      </Container>
    </div>
  );
}

export default AdminCreateCurriculumScreen;
