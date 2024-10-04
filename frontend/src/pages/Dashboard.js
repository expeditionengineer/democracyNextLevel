import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import GeneralCard from '../components/GeneralCard';
import CardButtons from '../components/CardButtons';
import VoterDashboard from '../components/VoterDashboard';
import ProposalView from '../components/ProposalView';
import InfoView from '../components/InfoView';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import testPic from '../graphics/Schock.jpg';
import { Newspaper } from 'react-bootstrap-icons';

const Dashboard = () => {
  const color = "red"
  
  const [data, setData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [positionNews, setPositionNews] = useState(0);
  const [newsDataLoaded, setNewsDataLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false); 
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

  const [debateCardsForNews, setDebateCardsForNews] = useState([]);
  const [debateDataLoaded, setDetbateDataLoaded] = useState(false);
  const [debateCategoryView, setDebateCategoryView] = useState(0);

   useEffect(() => {
    const fetchDebateCardsForNews = async () => {
     if (!newsDataLoaded || !newsData || !newsData[positionNews]) {
      // Do nothing if the news data is not loaded or if the positionNews is out of bounds
      return;
    }

      try {
      const response = await fetch(`http://127.0.0.1:8000/debate-cards/news/${newsData[positionNews].id}`); // Await fetch
      if (!response.ok) {
        throw new Error('Failed to fetch debate cards for news id');
      }

      const debateCardDataResponse = await response.json(); // Await the JSON parsing
      setDebateCardsForNews(debateCardDataResponse); // Now newsDataResponse holds the actual data
      setDetbateDataLoaded(true); // Set the news data loaded flag
    } catch (error) {
      console.error('Error fetching debate data for news:', error); // Handle errors
    }
    }
    fetchDebateCardsForNews();
  }, [newsDataLoaded, positionNews, newsData]);

  const loadingForUserCategory = () => {
    if (data["roles"].includes(1)) {
      return (
        <Link href="/create-news">Create News</Link>
      );
    }
    if (data["roles"].includes(3)) {
      return (
        <VoterDashboard hightlightNumber={debateCategoryView} />
      );
    }
  }
  const handleDrag = (event) => {
    console.log(event.clientY);
    if (event.clientY >= window.innerHeight) {
      console.log('Element touched the bottom of the browser!');
      setPositionNews(positionNews+1);
      console.log(positionNews)
    }
  }
  const handleDragStart = (e) => {
    setIsDragging(true);
  };

  const [keyPressed, setKeyPressed] = useState('');

  // UseEffect hook to add event listener when the component mounts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key == "ArrowDown") {
        if (positionNews < newsData.length) {
          setPositionNews(positionNews+1);
        }
      }
      if (event.key == "ArrowUp") {
        if (positionNews > 0) {
          setPositionNews(positionNews-1);
        }
      }
      if (event.key == "ArrowRight") {
        if (debateCategoryView < 6) {
          setDebateCategoryView(debateCategoryView+1);
        }
        else {
          setDebateCategoryView(0);
        }
      if (event.key == "ArrowLeft") {
        if (debateCategoryView > 0) {
          setDebateCategoryView(debateCategoryView-1);
        }
        else {
          setDebateCategoryView(6);
        }
      }  
      }
      setKeyPressed(`Global Key pressed: ${event.key}`);
    };

    // Add keydown event listener to the window
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
  <>
    {!loading && loadingForUserCategory()}
    <h1>{keyPressed}</h1>
    <h1>{positionNews}</h1>
    <h1>{newsData.length}</h1>
    {debateCategoryView == 0 && newsDataLoaded ? <ProposalView newsData={newsData} positionNews={positionNews} /> : null}
    {debateCategoryView == 1 && newsDataLoaded ? <InfoView debateCardsForNews={debateCardsForNews} /> : null}

  </>
  )
};

export default Dashboard;
