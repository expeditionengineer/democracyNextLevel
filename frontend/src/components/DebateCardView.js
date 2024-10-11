
import Row from 'react-bootstrap/Row';
import testPic from '../graphics/Schock.jpg';
import { Newspaper } from 'react-bootstrap-icons';

import GeneralCard from '../components/GeneralCard';
import CardButtons from '../components/CardButtons';

const DebateCardView = ({ debateCardsForNews, categoryNumber, elementNumber }) => {
  // Filter out the cards based on the category number
  const debateCardInfoElements = debateCardsForNews.filter(card => card.category === categoryNumber);

  // Safeguard for out-of-bound elementNumber
  if (debateCardInfoElements.length === 0 || elementNumber >= debateCardInfoElements.length) {
    return null; // Or render some fallback UI
  }
  const color = "red";

  return (
    <Row as="main" xs={1} xl={2} xxl={3} draggable>
      <GeneralCard
        color={color}
        icon={<Newspaper className="me-2" style={{ color }} />}
        title={debateCardInfoElements[elementNumber].title}
        author={{
          name: `${debateCardInfoElements[elementNumber].userForname} ${debateCardInfoElements[elementNumber].userSurname}`,
          profilePic: "https://github.com/mdo.png"
        }}
        picLink={
          debateCardInfoElements[elementNumber].image == null
            ? testPic
            : `http://127.0.0.1:8000${debateCardInfoElements[elementNumber].image}`
        }
        description={debateCardInfoElements[elementNumber].description}
        buttonbar={<CardButtons proposal={true} debateCardId={debateCardInfoElements[elementNumber].id} />}
        link="#"
      />
    </Row>
  );
};

export default DebateCardView;



