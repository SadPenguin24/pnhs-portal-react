/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Key, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  Spinner,
  Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import '../../components/tables/tables.scss';
import { useGetEnrolleesQuery } from '../../redux/api/enrolleeApi';
import { useConvertEtosMutation } from '../../redux/api/userApi';
import { getEnrollees } from '../../redux/slice/enrolleeSlice';
import { useAppDispatch } from '../../redux/store';

function AdminEnrolleesScreen() {
  const navigate = useNavigate();

  const { strand } = useParams();

  const [strandEnrollees]: any = useState([]);
  const [acceptEnrollees]: any = useState([]);

  const dispatch = useAppDispatch();

  const {
    data: enrollees,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEnrolleesQuery({});

  // const getStrandEnrollees = (item: any) => {
  //   if (item.strand.split(' ').join('').toLowerCase() === strand) {
  //     strandEnrollees.push(item);
  //   }
  // };

  // if (enrollees) {
  //   enrollees.forEach(getStrandEnrollees);
  // }

  useEffect(() => {
    dispatch(getEnrollees({ enrollees }));
  }, [dispatch, enrollees]);

  const acceptHandler = (e: any) => {
    const index = acceptEnrollees.indexOf(e.target.value);
    if (index > -1) {
      acceptEnrollees.splice(index, 1);
    } else {
      acceptEnrollees.push(e.target.value);
    }
  };

  const [convertEtos] = useConvertEtosMutation();

  const submitHandler = async (e: any) => {
    e.preventDefault();

    acceptEnrollees.forEach((item: any) => {
      convertEtos(item);
    });
  };

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
    const filterEnrollees = enrollees.filter(
      (enrollee: any) =>
        enrollee.strand.split(' ').join('').toLowerCase() === strand
    );
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
        <Form onSubmit={submitHandler}>
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
              {filterEnrollees.length > 0 ? (
                filterEnrollees.map((enrollee: any) => (
                  <tr key={enrollee._id}>
                    <td>
                      {enrollee.first_name} {enrollee.last_name}
                    </td>
                    <td>{enrollee.lrn}</td>
                    <td>{enrollee.strand}</td>
                    <td className="d-flex justify-content-around">
                      <Button
                        onClick={() =>
                          navigate(`/admin/enrollee/${strand}/${enrollee._id}`)
                        }
                      >
                        View Enrollee
                      </Button>
                      <Form.Check
                        inline
                        name="enrollee"
                        label="Accept Enrollee"
                        type="checkbox"
                        value={enrollee._id}
                        onClick={acceptHandler}
                      />
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
          <div className="text-end">
            <Button type="submit">Accept Enrollees</Button>
          </div>
        </Form>
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
