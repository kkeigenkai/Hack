import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export const Sort = ({ sort, handleSort, radio, handleRadio }) => {
  
  const handleChange = (e) => {
    handleSort(e.target.value);
  };
  
  const handleClear = () => {
    handleSort('');
    handleRadio("all")
  };
  
  const handleCheck = (e) => {
    handleRadio(e.target.value)
  }
  
  return (
    <Container className={'mb-3'}>
      <Row>
        <Form inline>
          <FormControl type="text" value={sort} onChange={handleChange}
                       placeholder="Enter name or # for tag"
                       className="mr-3"/>
          <Form.Group className={"mr-3"} onChange={handleCheck}>
            <Form.Check
              type="radio"
              label="All"
              name="formHorizontalRadios"
              value={'all'}
              id="formHorizontalRadios0"
              className={'mr-2'}
              checked={radio === 'all'}
            />
            <Form.Check
              type="radio"
              label="In developing"
              name="formHorizontalRadios"
              value={'1'}
              id="formHorizontalRadios1"
              className={'mr-2'}
              checked={radio === '1'}
            />
            <Form.Check
              type="radio"
              label="Offline"
              name="formHorizontalRadios"
              value={'2'}
              id="formHorizontalRadios2"
              className={'mr-2'}
              checked={radio === '2'}
            />
            <Form.Check
              type="radio"
              label="Online"
              value={'3'}
              name="formHorizontalRadios"
              id="formHorizontalRadios3"
              checked={radio === '3'}
            />
          </Form.Group>
          <Button variant={'danger'} onClick={handleClear}>Clear</Button>
        </Form>
      </Row>
    </Container>
  );
};