//import { useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import GeneralCard from '../components/GeneralCard';
import CardButtons from '../components/CardButtons';
//import CreateNews from '../components/CreateNews';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import testPic from '../graphics/Schock.jpg';
import { Newspaper } from 'react-bootstrap-icons';

const News = () => {
  const color = "red"
  
  const [data, setData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [newsDataLoaded, setNewsDataLoaded] = useState(false);
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

  // fetch the published news objects:
  useEffect(() => {
    const fetchNews = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/news/"); // Await fetch
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const newsDataResponse = await response.json(); // Await the JSON parsing
      setNewsData(newsDataResponse); // Now newsDataResponse holds the actual data
      setNewsDataLoaded(true); // Set the news data loaded flag
    } catch (error) {
      console.error('Error fetching news:', error); // Handle errors
    }
    }
    fetchNews();
  }, []);
  return (
  <>
    {!loading && data["roles"].includes(1) ? <Link href="/create-news">Create News</Link> : null}

    <Row as="main" xs={1} xl={2} xxl={3}>
      {newsDataLoaded && newsData.map((item, index) => (<GeneralCard 
        color="red"
        icon={(<Newspaper className="me-2" style={{color: color}} />)}
        title={item.heading}
        author={{
          name: `${item.userForname} ${item.userSurname}`,
          profilePic: "https://github.com/mdo.png"
        }}
        date={item.creationDateTime}
        picLink={item.image == null ? testPic: `http://127.0.0.1:8000${item.image}`}
        description={item.text}
        buttonbar={<CardButtons
          proposal={item.suggested}
        />}
        link="#"
      />) 
      )}  
    </Row>
  </>
  )
};

export default News;
