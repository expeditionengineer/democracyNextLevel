import Button from 'react-bootstrap/Button';

const VoterDashboard = ({hightlightNumber}) => {
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
    <div style={{ margin: "20px" }}>
      <h1>{hightlightNumber}</h1>
      {arrayOfButtonNames.map((item, index) => (
        <Button
          key={index}
          style={{
            margin: "20px",
            border: hightlightNumber === index ? "10px solid black" : "none",
          }}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};


export default VoterDashboard;
