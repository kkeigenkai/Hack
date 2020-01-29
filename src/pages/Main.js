import React from 'react';
import { List } from '../components/List';

export const Main = ({ handleRadio, radio, handleSort, sort, microservices, handleMicroservice }) => {
  
  return (
    <>
      <List radio={radio} sort={sort} handleSort={handleSort}
            handleMicroservice={handleMicroservice}
            microservices={microservices}/>
    </>
  );
};