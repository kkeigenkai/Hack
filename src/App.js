import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import { Main } from './pages/Main';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { Microservice } from './pages/Microservice';
import { Sort } from './components/Sort';
import axios from 'axios';
import { Add } from './pages/Add';
import { Desc } from './pages/Desc';

const DB = 'http://localhost:3000/microservices';

export const App = () => {
  const [microservices, setMicroservices] = useState([]);
  const [microservice, setMicroservice] = useState({});
  const [sort, setSort] = useState('');
  const [radio, setRadio] = useState('all');
  
  useEffect(() => {
    async function fetchData () {
      const result = await axios.get(DB);
      setMicroservices(result.data);
      if (localStorage.ms !== undefined) {
        setMicroservice(JSON.parse(localStorage.ms));
      }
    }
    
    fetchData();
  }, []);
  
  const handleMicroservice = (id) => {
    setMicroservice(...microservices.filter(ms => id === ms.id));
  };
  
  const handleSort = (s) => {
    setSort(s);
  };
  
  const handleRadio = (v) => {
    setRadio(v);
    console.log(v);
  };
  
  const addMicroservice = (
    name, tag, developers, description, language, p, c) => {
    let max = 0;
    microservices.map(microservice => {
      max = (max < microservice.id) ? microservice.id : max;
    });
    tag = tag.trim().split(' ').map(t => '#' + t);
    setMicroservices([
      ...microservices,
      {
        id: max,
        name: name,
        tag: tag,
        status: 1,
        developers: developers,
        description: description,
        language: language,
        docs: '',
      }]);
    axios.post(DB, {
      'id': parseInt(max) + 1,
      'name': name,
      'tag': tag,
      'status': 1,
      'developers': developers,
      'description': description,
      'language': language,
      'docs': '# Docs',
    });
    
    axios.post('http://localhost:3000/nodes', {
      'id': (parseInt(max) + 1).toString(),
      'name': name,
      'val': 1,
    });
    console.log(p)
    if (p !== 0) {
      axios.post('http://localhost:3000/links', {
        "source": p.toString(),
        "target": (parseInt(max) + 1).toString()
      });
    }
    
    if (c !== 0) {
      axios.post('http://localhost:3000/links', {
        "source": (parseInt(max) + 1).toString(),
        "target": c.toString()
      });
    }
    
  };
  
  const editMicroservice = (
    id, name, tag, developers, description, language, status, docs) => {
    tag = tag.trim().split(' ').map(t => '#' + t);
    setMicroservices([
      ...microservices.map(ms => {
        if (id === ms.id) {
          ms.name = name;
          ms.tag = tag;
          ms.developers = developers;
          ms.description = description;
          ms.language = language;
          ms.status = status;
        }
        return ms;
      })]);
    axios.put(DB + `/${id}`, {
      'id': id,
      'name': name,
      'tag': tag,
      'status': status,
      'developers': developers,
      'description': description,
      'language': language,
      'docs': docs,
    });
  };
  
  return (
    <Router>
      <Navbar className={'mb-5'} bg="light" expand="lg">
        <LinkContainer to={'/main'}>
          <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <NavLink activeClassName="nav-item active" className={'nav-link'}
                     to={'/main'}>Microservices</NavLink>
            <NavLink activeClassName="nav-item active" className={'nav-link'}
                     to={'/add'}>Add</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <Switch>
        <Route path="/main">
          <Sort radio={radio} handleRadio={handleRadio} sort={sort}
                handleSort={handleSort}/>
          <Main radio={radio} handleRadio={handleRadio} sort={sort}
                handleSort={handleSort}
                handleMicroservice={handleMicroservice}
                microservices={microservices}/>
        </Route>
        <Route path="/microservice">
          <Microservice handleSort={handleSort}
                        editMicroservice={editMicroservice}
                        microservice={microservice}/>
        </Route>
        <Route path="/add">
          <Add microservices={microservices}
               addMicroservice={addMicroservice}/>
        </Route>
        <Route path="/">
          <Desc />
        </Route>
      </Switch>
    </Router>
  );
};
