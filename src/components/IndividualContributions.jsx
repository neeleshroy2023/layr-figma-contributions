import React from "react";
import { v4 as uuid } from "uuid";
import Card from "react-bootstrap/Card";

const IndividualContributions = ({ data }) => {
  const sanitizedData = Object.keys(data).map((key) => {
    if(key !== 'Figma System') {
      return { name: key, count: data[key]?.length };
    }
    return { name: '', count: 0 };
  })
  return (
    <div className="individual-contributions">
      <h2>Individual Contributions</h2>
      <ul className="ic-container">
        {sanitizedData.map(({name, count}) => {
          return !!name && !!count && (
            <Card style={{ width: "18rem" }} key={uuid()}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              contributed {count} times in 3 Figma files
            </Card.Text>
          </Card.Body>
        </Card>
        )})}
      </ul>
    </div>
  );
};

export default IndividualContributions;
