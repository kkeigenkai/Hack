import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export const MicroserviceForm = ({ handleData, oldName, oldLanguage, oldTag, oldDevelopers, oldDescription, showStatus, oldStatus, showConn, microservices }) => {
  let newTag = oldTag.map((t, id) => t.substring(1)).join(' ');
  const [name, setName] = useState(oldName);
  const [language, setLanguage] = useState(oldLanguage);
  const [tag, setTag] = useState(newTag);
  const [developers, setDevelopers] = useState(oldDevelopers);
  const [description, setDescription] = useState(oldDescription);
  const [status, setStatus] = useState(oldStatus);
  const [pId, setPID] = useState(1);
  const [cId, setCId] = useState(1);
  
  const handleName = (e) => {
    setName(e.target.value);
  };
  
  const handleLanguage = (e) => {
    setLanguage(e.target.value);
  };
  
  const handleTag = (e) => {
    setTag(e.target.value);
  };
  
  const handleDeveloperName = (e, id) => {
    setDevelopers([
      ...developers.map((developer, i) => {
        if (i === id) {
          developer.name = e.target.value;
        }
        return developer;
      })]);
  };
  
  const handleDeveloperEmail = (e, id) => {
    setDevelopers([
      ...developers.map((developer, i) => {
        if (i === id) {
          developer.email = e.target.value;
        }
        return developer;
      })]);
  };
  
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  
  const handleStatus = (e) => {
    setStatus(parseInt(e.target.value));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleData(name, tag, developers, description, language, status, pId, cId);
    setName('');
    setLanguage('');
    setTag('');
    setDescription('');
    setDevelopers([
      {
        'name': '',
        'email': '',
      }]);
  };
  
  const handlePid = (e) => {
    setPID(e.target.value);
  };
  
  const handleCid = (e) => {
    setCId(e.target.value);
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md={'6'}>
          <Form.Label>Enter name</Form.Label>
          <Form.Control value={name} onChange={handleName} required type="text"
                        placeholder="Enter name"/>
        </Form.Group>
        
        <Form.Group as={Col} md="6">
          <Form.Label>Enter language</Form.Label>
          <InputGroup>
            <Form.Control
              value={language}
              onChange={handleLanguage}
              type="text"
              placeholder="language"
              required
            />
          </InputGroup>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="7">
          <Form.Label>Enter tag</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>#</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              value={tag}
              onChange={handleTag}
              type="text"
              placeholder="tag without #"
              required
            />
          </InputGroup>
        </Form.Group>
        {(showStatus) ?
          <>
            <Form.Group as={Col} md="5">
              <Form.Label>Choose status</Form.Label>
              <Form.Control value={status} onChange={handleStatus} as="select">
                <option value={1}>Developing</option>
                <option value={2}>Offline</option>
                <option value={3}>Online</option>
              </Form.Control>
            </Form.Group>
          </> : ''}
      </Form.Row>
      
      {developers.map((developer, id) => {
        return (
          <Form.Row key={id} className={'align-items-end'}>
            <Form.Group as={Col} md={'5'} xs={'11'}>
              <Form.Label>Enter developer name</Form.Label>
              <Form.Control value={developer.name}
                            onChange={(e) => {handleDeveloperName(e, id);}}
                            required type="text"
                            placeholder="Enter name"/>
            </Form.Group>
            <Form.Group as={Col} md={'6'} xs={'11'}>
              <Form.Label>Enter developer email</Form.Label>
              <Form.Control value={developer.email}
                            onChange={(e) => {handleDeveloperEmail(e, id);}}
                            required type="email"
                            placeholder="Enter email"/>
            </Form.Group>
            <Form.Group as={Col} md={'1'} xs={'1'}>
              {(id === developers.length - 1) ? <Button variant={'success'}
                                                        onClick={() => {
                                                          setDevelopers([
                                                            ...developers,
                                                            {
                                                              name: '',
                                                              email: '',
                                                            }]);
                                                        }}>+</Button> : (id !==
                developers.length - 1) ? <Button variant={'danger'}
                                                 onClick={() => {
                                                   setDevelopers(
                                                     [
                                                       ...developers.filter(
                                                         (
                                                           developer,
                                                           key) => key !==
                                                           id)]);
                                                 }}>-</Button> : ''}
            </Form.Group>
          </Form.Row>
        );
      })}
      
      <Form.Group>
        <Form.Label>Enter description</Form.Label>
        <Form.Control value={description} onChange={handleDescription}
                      as="textarea" rows="3"/>
      </Form.Group>
      {(showConn) ?
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Parent id</Form.Label>
            <Form.Control onChange={handlePid} as="select">
              {microservices !== undefined &&
              microservices.map(microservice => {
                return (
                  <option value={microservice.id} key={microservice.id}>{microservice.id + " " + microservice.name}</option>
                );
              })}
            </Form.Control>
          </Form.Group>
          
          <Form.Group as={Col}>
            <Form.Label>Children id</Form.Label>
            <Form.Control onChange={handleCid} as="select">
              {microservices !== undefined &&
              microservices.map(microservice => {
                return (
                  <option value={microservice.id} key={microservice.id}>{microservice.id + " " + microservice.name}</option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Row>
        : ''}
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};