import React from 'react';
import { Container, Table } from 'react-bootstrap';
import Header from '../../components/header/Header';

import '../../components/tables/tables.scss';

function FacultyScheduleScreen() {
  return (
    <div>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Faculty Schedule" redirect="/faculty/home" />
      <Container>
        <Table bordered className="tableColor" responsive="sm">
          <thead style={{ backgroundColor: '#2867b1' }}>
            <tr className="text-center">
              <th className="textWhite">Type</th>
              <th className="textWhite">Subject</th>
              <th className="textWhite">Day</th>
              <th className="textWhite">Time</th>
              <th className="textWhite">Grade&Section/Strand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sample</td>
              <td>sample</td>
              <td>sample</td>
              <td>sample</td>
              <td>sample</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default FacultyScheduleScreen;
