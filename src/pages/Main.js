import React from 'react';
import Container from 'react-bootstrap/Container';
import { List } from '../components/List';

export const Main = ({ handleRadio, radio, handleSort, sort, microservices, handleMicroservice }) => {
  
  return (
    <Container
      className={'p-0 d-flex flex-row flex-wrap justify-content-start'}>
      <List radio={radio} sort={sort} handleSort={handleSort}
            handleMicroservice={handleMicroservice}
            microservices={microservices}/>
    </Container>
  );
};