import React from "react";
import { v4 as uuid } from "uuid";

const IndividualContributions = ({ data, users }) => {
  return (
    <div className="individual-contributions">
      <h2>Individual Contributions</h2>
      <ul>
        {Object.keys(data).map((key) => {
          const user = users.find((user) => user.value === key);
          return user ? (
            <li key={uuid()}>
              <b>{user.label}</b> contributed {data[key]} times in 3 Figma files
            </li>
          ) : (
            <li key={uuid()}>Figma System contributed {data[key]} times</li>
          );
        })}
      </ul>
    </div>
  );
};

export default IndividualContributions;
