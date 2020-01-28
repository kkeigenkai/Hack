import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import axios from 'axios';

const DB = 'http://localhost:3000/connections';

export const Connection = () => {
  const [source, setSource] = useState({
    'nodes': [
      {
        'id': 'id1',
        'name': 'name1',
        'val': 10,
      },
      {
        'id': 'id2',
        'name': 'name2',
        'val': 10,
      },
    ],
    'links': [
      {
        'source': 'id1',
        'target': 'id2',
      },
    ],
  });
  useEffect(() => {
    async function fetchData () {
      const nodes = await axios.get('http://localhost:3000/nodes');
      const links = await axios.get('http://localhost:3000/links');
      setSource({
        'nodes': nodes.data, 'links': links.data,
      });
      console.log(nodes.data);
    }
    
    fetchData();
  }, []);
  
  return (
    <>
      {console.log(source)}
      <ForceGraph2D linkDirectionalParticles={1} linkDirectionalArrowLength={1} graphData={source}/>
    </>
  );
};