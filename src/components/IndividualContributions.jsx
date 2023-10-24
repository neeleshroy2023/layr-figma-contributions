import React from "react";
import { v4 as uuid } from "uuid";
import Card from "react-bootstrap/Card";

const IndividualContributions = ({ data, users }) => {
  return (
    <div className="individual-contributions">
      <h2>Individual Contributions</h2>
      <ul className="ic-container">
        {Object.keys(data).map((key) => {
          const user = users.find((user) => user.value === key);
          return user ? (
            <Card style={{ width: "18rem" }} key={uuid()}>
              <Card.Body>
                <Card.Title>{user.label}</Card.Title>
                <Card.Text>
                  contributed {data[key]} times in 3 Figma files
                </Card.Text>
              </Card.Body>
            </Card>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default IndividualContributions;
