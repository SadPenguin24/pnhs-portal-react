import React from 'react';
import { Container, FormControl } from 'react-bootstrap';
import Header from '../../components/header/Header';
import { MasterlistTable } from '../../components/tables/Tables';

function AdminFacultyMasterlistScreen() {
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Faculty Masterlist" redirect="/admin/home" />
      <Container>
        <div className="d-flex justify-content-end mb-3">
          <div className="w-50">
            <FormControl
              style={{ backgroundColor: '#ffe4a0', border: '#eaaa79 solid' }}
              placeholder="Enter Faculty Name"
            ></FormControl>
          </div>
        </div>
        <MasterlistTable headerColor="#2a6fd6" student={false} />
      </Container>
    </div>
  );
}

export default AdminFacultyMasterlistScreen;
