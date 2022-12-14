import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import {
  useGetSubjectQuery,
  useUpdateSubjectMutation,
} from '../../redux/api/subjectApi';
import { getSubject } from '../../redux/slice/subjectSlice';
import { useAppDispatch } from '../../redux/store';

function AdminViewSubjectScreen() {
  const { id } = useParams();

  const location = useLocation();

  const separator = location.search ? location.search.split('?')[1] : '/';
  console.log(separator);

  const [notEditing, setNotEditing] = useState(() => {
    if (separator === 'view') {
      return true;
    }
    return false;
  });

  const dispatch = useAppDispatch();

  const {
    data: subject,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubjectQuery(id);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getSubject({ subject }));
  }, [dispatch, subject]);

  const [updateSubject] = useUpdateSubjectMutation();

  const updateHandler = async ({ strand, subject_name, type }: any) => {
    try {
      await updateSubject({
        id,
        strand,
        subject_name,
        type,
      });

      alert('Successfully update subject');

      setNotEditing(true);
    } catch (error) {
      alert(error);
    }
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
    content = (
      <Form onSubmit={handleSubmit(updateHandler)}>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={1}>
            Subject:
          </Form.Label>
          <Col md={11}>
            <Form.Control
              type="text"
              required
              {...register('subject_name')}
              defaultValue={subject.subject_name}
              readOnly={notEditing}
              plaintext={notEditing}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={1}>
            Type:
          </Form.Label>
          <Col md={11}>
            {notEditing ? (
              <div>{subject.type}</div>
            ) : (
              <Form.Select {...register('type')}>
                <option value={subject.type}>{subject.type}</option>
                {['Core', 'Specialized'].map((type: any) => {
                  if (subject.type === type) {
                    return;
                  }
                  return <option value={type}>{type}</option>;
                })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column md={1}>
            Strand:
          </Form.Label>
          <Col md={11}>
            {notEditing ? (
              <div>{subject.strand}</div>
            ) : (
              <Form.Select {...register('strand')}>
                <option value={subject.strand}>{subject.strand}</option>
                {[
                  'ABM',
                  'GAS',
                  'HUMSS',
                  'SPORTS',
                  'STEM',
                  'TVL-COOKERY',
                  'TVL-HOME ECONOMICS',
                  'TVL-ICT',
                ].map((strand: any) => {
                  if (subject.strand === strand) {
                    return;
                  }
                  return (
                    <option value={strand} key={strand}>
                      {strand}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Col>
        </Form.Group>
        {notEditing ? (
          <Button onClick={() => setNotEditing(false)}>Edit</Button>
        ) : (
          <>
            <Button type="submit" className="me-3">
              Save
            </Button>
            <Button variant="danger" onClick={() => setNotEditing(true)}>
              Exit
            </Button>
          </>
        )}
      </Form>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className="mb-5">
      <style>{'body { background-color: #dcf7b0; }'}</style>
      <Header page="Subjects" redirect={`/admin/subject`} />
      <Container>{content}</Container>
    </div>
  );
}

export default AdminViewSubjectScreen;
