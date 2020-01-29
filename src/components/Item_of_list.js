import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { Link } from 'react-router-dom';

export const Item_of_list = ({ handleSort, microservice, handleMicroservice }) => {
  
  const handleClick = (id) => {
    handleMicroservice(id);
  };
  
  const handleTagClick = (t) => {
    handleSort(t);
  };
  
  return (
    <Card className={'item_of_list'} >
      <Card.Header>
        <Link onClick={() => {handleClick(microservice.id);}}
              to={'/microservice'}>{microservice.name}</Link>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{microservice.tag.map(
          (t, i) => {
            return (
              <span key={i} onClick={() => {handleTagClick(t);}}
                    className={'hover'}>{t + ' '}
            </span>
            );
          })}</Card.Subtitle>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          {microservice.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Developer: {microservice.developers.map(
          (developer, id) => {
            if (id === microservice.developers.length - 1) {
              return (
                <a title={'send email to ' + developer.name}
                   href={'mailto:' + developer.email} key={id}>
                  {' ' + developer.name}
                </a>
              );
            }
            return (
              <a title={'send email to ' + developer.name}
                 href={'mailto:' + developer.email} key={id}>
                {' ' + developer.name},
              </a>
            );
          })}</ListGroupItem>
        <ListGroupItem variant={(microservice.status === 3)
          ? 'success'
          : (microservice.status === 2) ? 'danger' : (microservice.status === 1)
            ? 'warning'
            : ''}>Status: {(microservice.status === 3)
          ? 'online'
          : (microservice.status === 2) ? 'offline' : (microservice.status ===
            1) ? 'develop' : ''}</ListGroupItem>
      </ListGroup>
    </Card>
  );
};