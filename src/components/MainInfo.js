import React, { useState } from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { MicroserviceForm } from './MicroserviceForm';

export const MainInfo = ({ microservice, editMicroservice }) => {
  const [showEdit, setShowEdit] = useState(false);
  
  const toogleEdit = () => {
    setShowEdit(!showEdit);
  };
  
  const editData = (name, tag, developers, description, language, status) => {
    editMicroservice(microservice.id, name, tag, developers, description, language, status, microservice.docs);
    toogleEdit();
  };
  
  return (
    <>
      <br/>
      {(!showEdit) ?
        <>
          <p>Status: {(microservice.status === 3)
            ? 'Online'
            : (microservice.status === 2) ? 'Offline' : (microservice.status ===
              1) ? 'In developing' : ''}</p>
          <ListGroup variant="flush">
            {(microservice.developers !== undefined &&
              microservice.developers.map((developer, id) => {
                return (
                  <ListGroupItem
                    key={id}>{developer.name}: <a href={"mailto:"+developer.email}>{developer.email}</a></ListGroupItem>
                );
              }))}
          </ListGroup>
          <br/>
          <p>Description {microservice.description}</p>
          <p>Language: {microservice.language}</p>
          <Button onClick={toogleEdit}>Edit</Button>
        </> : (showEdit) ?
          <>
            <MicroserviceForm handleData={editData} oldTag={microservice.tag}
                              oldLanguage={microservice.language}
                              oldDescription={microservice.description}
                              oldName={microservice.name}
                              oldDevelopers={microservice.developers} showStatus={true} oldStatus={microservice.status} showConn={0} />
          </> : ''}
    
    </>
  );
};