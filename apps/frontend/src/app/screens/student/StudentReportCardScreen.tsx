import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/header/Header';
import { ReportCardTable } from '../../components/tables/Tables';

function StudentReportCardScreen() {
  return (
    <div>
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Report Card" redirect="/student/home" />
      <Container>
        <h3>Grade 11</h3>
        <h4>1ST SEMESTER</h4>
        <ReportCardTable headerColor="#19940e" sem="1st" />
        <h4>2ND SEMESTER</h4>
        <ReportCardTable headerColor="#808580" sem="2nd" />
        <h3 className="mt-5">Grade 12</h3>
        <h4>1ST SEMESTER</h4>
        <ReportCardTable headerColor="#19940e" sem="1st" />
        <h4>2ND SEMESTER</h4>
        <ReportCardTable headerColor="#808580" sem="2nd" />
      </Container>
    </div>
  );
}

export default StudentReportCardScreen;
