import React from 'react';
import Markdown from 'react-markdown';
import 'easymde/dist/easymde.min.css';

export const Documentation = ({ microservice }) => {
  
  return (
    <>
      <Markdown source={microservice.docs}/>
    </>
  );
};