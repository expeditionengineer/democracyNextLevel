import Row from 'react-bootstrap/Row';
import testPic from '../graphics/Schock.jpg';
import { Newspaper } from 'react-bootstrap-icons';

import GeneralCard from '../components/GeneralCard';
import CardButtons from '../components/CardButtons';

const DebateCardView = ({debateCardsForNews, categoryNumber}) => {

  const debateCardInfoElements = [];
  for (var i=0; i<debateCardsForNews.length; i++) {
    if (debateCardsForNews[i].category === categoryNumber) {
      debateCardInfoElements.push(debateCardsForNews[i]);
    }
  }

  const color = "red"
    return (
      <Row as="main" xs={1} xl={2} xxl={3} draggable>
       {debateCardInfoElements.map((item, index) => {
          return (
            <GeneralCard 
              key={index}
              color="red"
              icon={(<Newspaper className="me-2" style={{color: color}} />)}
              title={item.title}
              author={{
                name: `${item.userForname} ${item.userSurname}`,
                profilePic: "https://github.com/mdo.png"
              }}
              //date={newsData[positionNews].creationDateTime}
              picLink={item.image == null ? testPic: `http://127.0.0.1:8000${item.image}`}
              description={item.description}
              buttonbar={<CardButtons
                proposal={true}
              />
        }
        link="#"/>)
       })} 
    </Row>
  )
}

export default DebateCardView;


