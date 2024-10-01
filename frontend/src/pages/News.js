//import { useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import GeneralCard from '../components/GeneralCard';
import CardButtons from '../components/CardButtons';
import CreateNews from '../components/CreateNews';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import testPic from '../graphics/Schock.jpg';
import { Newspaper } from 'react-bootstrap-icons';

const News = () => {
  const color = "red"
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage (or any other storage)
        const response = await fetch('http://127.0.0.1:8000/user',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',  // Set content type
              'Authorization': `Token ${token}`,  // Append the token to the Authorization header
            },
          });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        console.log(result)
        setData(result);
        setLoading(false);
        //setData(result);  // Update state with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        //setLoading(false);  // Loading is done
      }
    };

    fetchData();
  }, []);  // Empty dependency array ensures this effect runs once when the component mounts
  return (
  <>
    {!loading && data["roles"].includes(1) ? <Link href="/create-news">Create News</Link> : null}

    <Row as="main" xs={1} xl={2} xxl={3}>
      
      <GeneralCard 
        color="red"
        icon={(<Newspaper className="me-2" style={{color: color}} />)}
        title="CardTitle"
        author={{
          name: "Jane Doe",
          profilePic: "https://github.com/mdo.png"
        }}
        date="02.07.2024"
        picLink={testPic}
        description="Some quick example text to build on the card title and make up the \
              bulk of the card's content. Noch ein paar Sätze mehr. Noch ein paar Sätze mehr."
        buttonbar={<CardButtons
          proposal={true}
        />}
        link="#"
      />
      <GeneralCard 
        color="red"
        icon="Information"
        title="CardTitle"
        author={{
          name: "Jane Doe",
          profilePic: "https://github.com/mdo.png"
        }}
        date="02.07.2024"
        picLink={testPic}
        description="Some quick example text to build on the card title and make up the \
              bulk of the card's content. Noch ein paar Sätze mehr. Noch ein paar Sätze mehr."
        buttonbar={<CardButtons
          cardSubtype="information"
        />}
        link="#"
      />
      <GeneralCard 
        color="red"
        icon="Pro-Argument"
        title="CardTitle"
        author={{
          name: "Jane Doe",
          profilePic: "https://github.com/mdo.png"
        }}
        date="02.07.2024"
        picLink={testPic}
        description="Some quick example text to build on the card title and make up the \
              bulk of the card's content. Noch ein paar Sätze mehr. Noch ein paar Sätze mehr."
        buttonbar={<CardButtons
          cardSubtype="pro-argument"
        />}
        link="#"
      />
      <GeneralCard 
        color="red"
        icon="Frage"
        title="CardTitle"
        author={{
          name: "Jane Doe",
          profilePic: "https://github.com/mdo.png"
        }}
        date="02.07.2024"
        picLink={testPic}
        description="Some quick example text to build on the card title and make up the \
              bulk of the card's content. Noch ein paar Sätze mehr. Noch ein paar Sätze mehr."
        buttonbar={<CardButtons
          cardSubtype="question"
        />}
        link="#"
      />
      <GeneralCard 
        color="red"
        icon="Verbessern"
        title="CardTitle"
        author={{
          name: "Jane Doe",
          profilePic: (<profilePic/>)
        }}
        date="02.07.2024"
        picLink={testPic}
        description="Some quick example text to build on the card title and make up the \
              bulk of the card's content. Noch ein paar Sätze mehr. Noch ein paar Sätze mehr."
        buttonbar={<CardButtons
          cardSubtype="optimize"
        />}
        link="#"
      />
    </Row>
  </>
  )
};

export default News;
