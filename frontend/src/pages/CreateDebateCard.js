
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateDebateCard = () => {
 
  const [debateCards, setDebateCards] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [newsFetched, setNewsFetched] = useState(false);
  const [newsData, setNewsData] = useState([]);
  
  const [contentData, setContentData] = useState(null);
  const [category, setCategory] = useState("1");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkedCard, setLinkedCard] = useState(null);
  const [linkedContent, setLinkedContent] = useState(null);
  
const submitDebateCard = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch("http://127.0.0.1:8000/debate-cards/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({
        contentLinks: linkedContent,
        category: category,
        title: title,
        description: description,
        linkedCard: linkedCard, 
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Debate card submitted successfully:', data);
    } else {
      console.error('Failed to submit debate card:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting debate card:', error);
  }
};


  useEffect(() => {
  const fetchDebateCards = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch("http://127.0.0.1:8000/debate-cards/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json(); // Await the JSON parsing
        setDebateCards(data); // Set the fetched debate cards to state
        setDataFetched(true); // Mark data as fetched
      } else {
        console.error('Failed to fetch debate cards');
      }
    } catch (error) {
      console.error('Error fetching debate cards:', error);
    }
  };

  fetchDebateCards(); // Call the async function
}, []);
  
  useEffect(
    () => {
      const fetchNews = async () => {
      const token = localStorage.getItem('token');
    
    try {
      const response = await fetch("http://127.0.0.1:8000/news/");
      
      if (response.ok) {
        const data = await response.json(); // Await the JSON parsing
        setNewsData(data); // Set the fetched debate cards to state
        setNewsFetched(true); // Mark data as fetched
        if (data.length > 0) {
          setLinkedContent(data[0].id)
        }
      } else {
        console.error('Failed to fetch debate cards');
      }
    } catch (error) {
      console.error('Error fetching debate cards:', error);
    }
  };

  fetchNews();     
    }, []);

  return (
    <>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="linkedContent">Linked content:</Form.Label>
          <Form.Select aria-label="Default select example" id="linkedContent" onChange={(e) => {setLinkedContent(e.target.value)}}>
          {newsData ? newsData.map(
            (item, index) => {
              return (<option value={item.id}>{item.heading}</option>);
            }
          ): null}
        </Form.Select> 
      </Form.Group>
      <Form.Group className="mb-3">
        <label>Category of debate card: </label>
        <Form.Select aria-label="Default select example" onChange={(e) => {setCategory(e.target.value)}}>
          <option value="1">Fact</option>
          <option value="2">Pro-Argument</option>
          <option value="3">Con-Argument</option>
          <option value="4">Question</option>
          <option value="5">Optimization</option>
          <option value="6">Comp-Proposal</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="inputTitle">Title</Form.Label>
        <Form.Control
          type="text"
          id="inputTitle"
          aria-describedby="titleHelpBlock"
          onChange={(e)=>{setTitle(e.target.value)}}
        />
        <Form.Text id="titleHelpBlock" muted>
          The title of the debate card. It must be between 1-100 characters long. 
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="inputDescription">Description</Form.Label>
        <Form.Control
          type="text"
          id="inputDescription"
          aria-describedby="descriptionHelpBlock"
          onChange={(e) => {setDescription(e.target.value)}}
        />
        <Form.Text id="descriptionHelpBlock" muted>
          The description of the debate card. It must be between 1-1500 characters long. 
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="imageDescription">Image</Form.Label>
        <Form.Control
          type="file"
          id="imageDescription"
          aria-describedby="imageHelpBlock"
        />
        <Form.Text id="imageHelpBlock" muted>
        File upload to add a image.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="linkedDebateCards">Connect another debate card:</Form.Label>
        <Form.Select aria-label="Default select example" id="linkedDebateCards" onChange={(e) => {setLinkedCard(e.target.value)}}>
          <option value={undefined}>No linked card</option>
          {debateCards ? debateCards.map(
            (item, index) => {
              return (<option value={item.id}>{item.title}</option>);
            }
          ): null}
        </Form.Select>
      </Form.Group>
      <Button type="submit" onClick={submitDebateCard}>Submit</Button>
    </>
  )
}

export default CreateDebateCard;
