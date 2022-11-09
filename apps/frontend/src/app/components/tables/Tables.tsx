/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './tables.scss';

export function ReportCardTable({ headerColor, sem }: any) {
  return (
    <Table bordered className="tableColor">
      <thead>
        <tr className="text-center" style={{ backgroundColor: headerColor }}>
          <th>Subjects</th>
          {sem === '1st' ? (
            <>
              <th>1st Quarter</th>
              <th>2nd Quarter</th>
            </>
          ) : (
            <>
              <th>3rd Quarter</th>
              <th>4th Quarter</th>
            </>
          )}
          <th>Average</th>
          <th>Remarks</th>
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
  );
}

export function MasterlistTable({ headerColor, studentRole, students }: any) {
  return (
    <Table bordered className="tableColor" responsive="lg">
      <thead style={{ backgroundColor: headerColor }}>
        <tr className="text-center">
          <th className="textWhite">Actions</th>
          <th className="textWhite">Student No.</th>
          <th className="textWhite">Last Name</th>
          <th className="textWhite">First Name</th>
          <th className="textWhite">Middle Name</th>
          {studentRole ? (
            <>
              <th className="textWhite">Grade Level</th>
              <th className="textWhite">Age</th>
            </>
          ) : (
            <>
              <th className="textWhite">Age</th>
              <th className="textWhite">Address</th>
            </>
          )}

          <th className="textWhite">Birthdate</th>
          <th className="textWhite">Birthplace</th>
          <th className="textWhite">Contact #</th>
        </tr>
      </thead>
      <tbody>
        {students ? (
          students.map(
            (student: {
              _id: React.Key | null | undefined;
              student: {
                _id:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
              };
              last_name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              first_name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              middle_name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <tr key={student._id}>
                <td>
                  {studentRole ? (
                    <LinkContainer to="/admin/student">
                      <Button>View Student</Button>
                    </LinkContainer>
                  ) : (
                    <LinkContainer to="/admin/faculty">
                      <Button>View Faculty</Button>
                    </LinkContainer>
                  )}
                </td>
                <td>{student.student._id}</td>
                <td>{student.last_name}</td>
                <td>{student.first_name}</td>
                <td>{student.middle_name}</td>
                <td>11</td>
                <td>17</td>
                <td>December 25, 2015</td>
                <td>Pangasinan</td>
                <td>09999999999</td>
              </tr>
            )
          )
        ) : (
          <tr>
            <td colSpan={10}>No Students</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
