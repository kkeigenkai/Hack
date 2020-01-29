import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export const Sort = ({ sort, handleSort, radio, handleRadio }) => {
  
  const handleChange = (e) => {
    handleSort(e.target.value);
  };
  
  const handleClear = () => {
    handleSort('');
    handleRadio('all');
  };
  
  const handleCheck = (e) => {
    handleRadio(e.target.value);
  };
  
  return (
    <Container className={'mb-3'}>
        <Form className="sort_form">
          <Form.Group>
            <FormControl type="text" value={sort} onChange={handleChange}
                         placeholder="Enter name or # for tag"/>
          </Form.Group>
          <Form.Group className={"form_md"}>
            <Form.Label className={"mr-2"}>Status:</Form.Label>
            <Form.Control as="select" onChange={handleCheck}>
              <option value={'all'}>All</option>
              <option value={'1'}>In developing</option>
              <option value={'2'}>Offline</option>
              <option value={'3'}>Online</option>
            </Form.Control>
          </Form.Group>
          
          <Button className={"form_btn"} variant={'danger'} onClick={handleClear}>Clear</Button>
        </Form>
    </Container>
  );
};