/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Key, useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  Spinner,
  Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';
import { useGetEnrolleesQuery } from '../../redux/api/enrolleeApi';
import { getEnrollees } from '../../redux/slice/enrolleeSlice';
import { useAppDispatch } from '../../redux/store';

function AdminEnrolleesScreen() {
  const navigate = useNavigate();
  const { strand } = useParams();

  const dispatch = useAppDispatch();

  const {
    data: enrollees,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEnrolleesQuery({});

  // eslint-disable-next-line prefer-const
  let strandEnrollees: any[] = [];

  const getStrandEnrollees = (item: any) => {
    if (item.strand.split(' ').join('').toLowerCase() === strand) {
      strandEnrollees.push(item);
    }
  };

  if (enrollees) {
    enrollees.forEach(getStrandEnrollees);
  }

  useEffect(() => {
    dispatch(getEnrollees({ strandEnrollees }));
  }, [dispatch, strandEnrollees]);

  let content;

  if (isLoading) {
    content = (
      <div className="text-center">
        <Spinner variant="primary" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <>
        <div className="d-flex mb-3">
          <div className="w-50 me-3">
            <FormControl
              style={{ backgroundColor: '#ffe4a0', border: '#eaaa79 solid' }}
              placeholder="Grade/Section"
            ></FormControl>
          </div>
          <Button>Search</Button>
        </div>
        <Table bordered className="tableColor mb-3">
          <thead style={{ backgroundColor: '#2a6fd6' }}>
            <tr className="text-center">
              <th>Name</th>
              <th>LRN</th>
              <th>Strand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {strandEnrollees.length !== 0 ? (
              strandEnrollees.map((enrollee: any) => (
                <tr key={enrollee._id}>
                  <td>
                    {enrollee.first_name} {enrollee.last_name}
                  </td>
                  <td>{enrollee.lrn}</td>
                  <td>{enrollee.strand}</td>
                  <td>
                    <Button
                      onClick={() =>
                        navigate(`/admin/enrollee/${strand}/${enrollee._id}`)
                      }
                    >
                      View Enrollee
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No Enrollees
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="text-center">
          <LinkContainer to={`/admin/subject/${strand}`}>
            <Button className="me-3">View Subject</Button>
          </LinkContainer>
          <Button
            onClick={() => {
              navigate(`/admin/enrollee/create?${strand}`);
            }}
          >
            Create Enrollee
          </Button>
        </div>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Strand/Enrollees/Subject" redirect="/admin/strand" />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminEnrolleesScreen;
