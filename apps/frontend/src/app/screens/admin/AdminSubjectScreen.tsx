import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';

function AdminSubjectScreen() {
  const navigate = useNavigate();

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Strand/Enrollees/Subject" redirect="/admin/enrollees" />
      <Container>
        <div className="text-end mb-3">
          <Button
            className="me-3"
            onClick={() => navigate('/admin/subject/create')}
          >
            Add Subject
          </Button>
          <Button variant="danger">Delete All</Button>
        </div>
        <Table bordered className="tableColor">
          <thead style={{ backgroundColor: '#2a6fd6' }}>
            <tr className="text-center">
              <th>Strand</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ABM</td>
              <td>Purpossive Communication</td>
              <td>
                <Button
                  onClick={() =>
                    navigate('/admin/subject/63236b20356b8547a838ee7d')
                  }
                >
                  View
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
            <tr>
              <td>GE</td>
              <td>Personal Development</td>
              <td>
                <Button
                  onClick={() =>
                    navigate('/admin/subject/6336acc882460b47ad208b3c')
                  }
                >
                  View
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminSubjectScreen;
