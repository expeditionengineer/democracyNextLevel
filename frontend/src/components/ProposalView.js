import Row from 'react-bootstrap/Row';
import testPic from '../graphics/Schock.jpg';
import { Newspaper } from 'react-bootstrap-icons';

import GeneralCard from '../components/GeneralCard';
import CardButtons from '../components/CardButtons';

const ProposalView = ({newsData, positionNews}) => {
const color = "red"
  return (
    <Row as="main" xs={1} xl={2} xxl={3} draggable>
      <GeneralCard 
        color="red"
        icon={(<Newspaper className="me-2" style={{color: color}} />)}
        title={newsData[positionNews].heading}
        author={{
          name: `${newsData[positionNews].userForname} ${newsData[positionNews].userSurname}`,
          profilePic: "https://github.com/mdo.png"
        }}
        date={newsData[positionNews].creationDateTime}
        picLink={newsData[positionNews].image == null ? testPic: `http://127.0.0.1:8000${newsData[positionNews].image}`}
        description={newsData[positionNews].text}
        buttonbar={<CardButtons
          proposal={newsData[positionNews].suggested}  debateCardId={newsData[positionNews].id}
        />}
        link="#"
      /> 
    </Row>
  )
}

export default ProposalView;
