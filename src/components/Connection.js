import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import axios from 'axios';

export const Connection = ({ setMicroservice }) => {
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
    }
    
    fetchData();
  }, []);
  
  return (
    <>
      <ForceGraph2D nodeOpacity={0.99}
                    linkDirectionalParticles={1} linkDirectionalArrowLength={1}
                    graphData={source}/>
    </>
  );
};