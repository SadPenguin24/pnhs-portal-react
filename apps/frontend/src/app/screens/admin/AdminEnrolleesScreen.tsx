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
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';
import { useGetEnrolleesQuery } from '../../redux/api/enrolleeApi';
import { getEnrollees } from '../../redux/slice/enrolleeSlice';
import { useAppDispatch } from '../../redux/store';

function AdminEnrolleesScreen() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    data: enrollees,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEnrolleesQuery({});

  useEffect(() => {
    dispatch(getEnrollees({ enrollees }));
  }, [dispatch, enrollees]);

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
            {enrollees ? (
              enrollees.map(
                (enrollee: {
                  _id: string | undefined;
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
                  lrn:
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
                  strand:
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
                  <tr key={enrollee._id}>
                    <td>
                      {enrollee.first_name} {enrollee.last_name}
                    </td>
                    <td>{enrollee.lrn}</td>
                    <td>{enrollee.strand}</td>
                    <td>
                      <Button
                        onClick={() =>
                          navigate(`/admin/enrollee/${enrollee._id}`)
                        }
                      >
                        View Enrollee
                      </Button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={4}>No Enrollees</td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="text-center">
          <LinkContainer to="/admin/subject">
            <Button className="me-3">View Subject</Button>
          </LinkContainer>
          <Button
            onClick={() => {
              navigate('/admin/enrollee/create');
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
