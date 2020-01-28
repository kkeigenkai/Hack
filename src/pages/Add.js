import React from 'react';
import Container from 'react-bootstrap/Container';
import { MicroserviceForm } from '../components/MicroserviceForm';

export const Add = ({ addMicroservice, addConnection, microservices }) => {
  
  const handleData = (
    name, tag, developers, description, language, status, p, c) => {
    addMicroservice(name, tag, developers, description, language, p, c);
  };
  
  return (
    <Container>
      <MicroserviceForm handleData={handleData} oldName={''} oldDescription={''}
                        oldLanguage={''}
                        oldTag={[]} oldDevelopers={[
        {
          'name': '',
          'email': '',
        }]} showStatus={false} oldStatus={0} showConn={1}
                        microservices={microservices}
                        addConnection={addConnection}/>
    </Container>
  );
};