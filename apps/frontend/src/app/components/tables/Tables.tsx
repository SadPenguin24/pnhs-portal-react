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
