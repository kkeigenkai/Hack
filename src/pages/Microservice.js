import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { MainInfo } from '../components/MainInfo';
import { Documentation } from '../components/Documentation';
import { Link } from 'react-router-dom';
import { Connection } from '../components/Connection';

export const Microservice = ({ microservice, editMicroservice, handleSort, setMicroservice }) => {
  useEffect(() => {
    if (microservice.name !== undefined) {
      localStorage.ms = JSON.stringify(microservice);
    }
  }, [microservice]);
  
  return (
    <Container>
      <h1>{microservice.name}</h1>
      <small>{(microservice.tag !== undefined) ? microservice.tag.map(
        (t, id) => (
          <Link onClick={() => {handleSort(t);}} to={'/main'} key={id}>{t +
          ' '}</Link>)) : ''}</small>
      <br/>
      <br/>
      <Tabs defaultActiveKey="Info">
        <Tab eventKey="Info" title="Info">
          <MainInfo editMicroservice={editMicroservice}
                    microservice={microservice}/>
        </Tab>
        <Tab eventKey="Documentation" title="Documentation">
          <Documentation microservice={microservice}/>
        </Tab>
        <Tab eventKey="Connection" title="Connection">
          <Connection setMicroservice={setMicroservice} />
        </Tab>
      </Tabs>
    </Container>
  );
};