import Button from 'react-bootstrap/Button';

const VoterDashboard = (hightlightNumber) => {
  const arrayOfButtonNames = [
    "Vorschlag",
    "Info",
    "Pro-Argument",
    "Con-Argument",
    "Fragen",
    "Verbesserungen",
    "Komp-Vorschläge"
  ]

  return (
    <div style={{margin: "20px"}}>
      {arrayOfButtonNames.map((item, index) => {
        if (hightlightNumber === index) {
          return(
            <Button style={{ margin: "20px", border: "solid", borderColor: "black" }}>{item}</Button>)
        }
        else {
          return(<Button style={{ margin: "20px"}}>{item}</Button>);


        }
      })}
    </div>
  );
}

export default VoterDashboard;
