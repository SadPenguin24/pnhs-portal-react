import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/header/Header';
import { ReportCardTable } from '../../components/tables/Tables';
import { useGetParsedSectionQuery } from '../../redux/api/sectionApi';

function StudentReportCardScreen() {
  const [currentUser] = useState(JSON.parse(localStorage.getItem('userInfo')!));
  console.log(currentUser);

  const { data: section } = useGetParsedSectionQuery(
    currentUser.student.section_id
  );
  let content,
    eleven,
    elevenFirst,
    elevenSecond,
    twelve,
    twelveFirst,
    twelveSecond;
  if (currentUser.student.report_card.length > 0 && section) {
    if (
      currentUser.student.report_card.find(
        ({ grade_level }: any) => grade_level === 11
      )
    ) {
      eleven = <h3>Grade 11</h3>;
      if (currentUser.student.report_card.find(({ term }: any) => term === 1)) {
        const cardData = currentUser.student.report_card.filter(
          ({ term, grade_level }: any) => term === 1 && grade_level === 11
        );
        elevenFirst = (
          <>
            <h4>1ST SEMESTER</h4>
            <ReportCardTable data={cardData} headerColor="#19940e" sem="1st" />
          </>
        );
      }
      if (currentUser.student.report_card.find(({ term }: any) => term === 2)) {
        const cardData = currentUser.student.report_card.filter(
          ({ term, grade_level }: any) => term === 2 && grade_level === 11
        );
        elevenSecond = (
          <>
            <h4>2nd SEMESTER</h4>
            <ReportCardTable data={cardData} headerColor="#808580" sem="2nd" />
          </>
        );
      }
    }
    if (
      currentUser.student.report_card.find(
        ({ grade_level }: any) => grade_level === 12
      )
    ) {
      twelve = <h3>Grade 12</h3>;
      if (currentUser.student.report_card.find(({ term }: any) => term === 1)) {
        const cardData = currentUser.student.report_card.filter(
          ({ term, grade_level }: any) => term === 1 && grade_level === 12
        );
        twelveFirst = (
          <>
            <h4>1ST SEMESTER</h4>
            <ReportCardTable data={cardData} headerColor="#19940e" sem="1st" />
          </>
        );
      }
      if (currentUser.student.report_card.find(({ term }: any) => term === 2)) {
        const cardData = currentUser.student.report_card.filter(
          ({ term, grade_level }: any) => term === 2 && grade_level === 12
        );
        twelveSecond = (
          <>
            <h4>2nd SEMESTER</h4>
            <ReportCardTable data={cardData} headerColor="#808580" sem="2nd" />
          </>
        );
      }
    }
  } else {
    content = (
      <h4 style={{ color: 'red' }}>You are not enrolled to any section.</h4>
    );
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Report Card" redirect="/student/home" />
      <Container>
        {eleven}
        {elevenFirst}
        {elevenSecond}
        {twelve}
        {twelveFirst}
        {twelveSecond}
        {content}
      </Container>
    </div>
  );
}

export default StudentReportCardScreen;
