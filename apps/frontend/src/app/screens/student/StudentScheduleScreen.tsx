import React from 'react';
import { Container, Table } from 'react-bootstrap';
import Header from '../../components/header/Header';

import '../../components/tables/tables.scss';

function StudentScheduleScreen() {
  return (
    <div>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Schedule / Subjects" redirect="/student/home" />
      <Container>
        <div className="text-center">
          <h4>
            <strong>REGION 1</strong>
          </h4>
          <h4>
            <strong>Schools Division Office 1 PANGASINAN</strong>
          </h4>
          <h4>
            <strong>PANGASINAN NATIONAL HIGH SCHOOL</strong>
          </h4>
          <h4 className="mb-5">
            <strong>Lingayen, Pangasinan</strong>
          </h4>
          <h4>
            <strong>Class Program</strong>
          </h4>
          <h4>
            <strong>Grade 11 - STEM 1</strong>
          </h4>
          <h4>
            <strong>SY. 2021-2022</strong>
          </h4>
          <h4 className="mb-5">
            <strong>Adviser: Janu Gibbs</strong>
          </h4>
          <Table bordered className="my-3 tableColor">
            <thead>
              <tr
                className="text-center"
                style={{ backgroundColor: '#1DA914' }}
              >
                <th style={{ color: 'black' }}>DAY</th>
                <th style={{ color: 'black' }}>TIME</th>
                <th style={{ color: 'black' }}>SUBJECT</th>
                <th style={{ color: 'black' }}>TEACHER</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>sample</td>
                <td>sample</td>
                <td>sample</td>
                <td>sample</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default StudentScheduleScreen;
