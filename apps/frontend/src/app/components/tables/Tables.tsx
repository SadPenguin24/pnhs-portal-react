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

export function MasterlistTable({ headerColor, student }: any) {
  return (
    <Table bordered className="tableColor" responsive="lg">
      <thead style={{ backgroundColor: headerColor }}>
        <tr className="text-center">
          <th className="textWhite">Actions</th>
          <th className="textWhite">Student No.</th>
          <th className="textWhite">Last Name</th>
          <th className="textWhite">First Name</th>
          <th className="textWhite">Middle Name</th>
          {student ? (
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
        <tr>
          <td>
            {student ? (
              <LinkContainer to="/admin/student">
                <Button>View Student</Button>
              </LinkContainer>
            ) : (
              <LinkContainer to="/admin/faculty">
                <Button>View Faculty</Button>
              </LinkContainer>
            )}
          </td>
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
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
