import React from 'react';
import { Item_of_list } from './Item_of_list';

export const List = ({ sort, handleSort, microservices, handleMicroservice, radio }) => {
  
  return (
    <>
      {microservices.map(microservice => {
        //TODO improve searching for multiple tags
        if ((microservice.name.toLowerCase().includes(sort.toLowerCase()) ||
          (sort[0] === '#'&& (microservice.tag.includes(sort.toLowerCase())))) && (radio ==="all" || parseInt(radio) === microservice.status)) {
          return (
            <Item_of_list handleSort={handleSort} key={microservice.id}
                          handleMicroservice={handleMicroservice}
                          microservice={microservice}/>
          );
        }
      })}
    </>
  );
};