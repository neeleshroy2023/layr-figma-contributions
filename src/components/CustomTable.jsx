import React from "react";
import Table from "react-bootstrap/Table";

const CustomTable = ({currentItems}) => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th style={{ width: "10%" }}>ID</th>
          <th style={{ width: "20%" }}>Created at</th>
          <th style={{ width: "20%" }}>User</th>
          <th style={{ width: "50%" }}>Thumbnail URL</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{new Date(item.created_at).toLocaleDateString()}</td>
            <td>{item.user.handle}</td>
            <td style={{ width: "10%" }}>
              <a href={item.thumbnail_url} target="_blank" rel="noreferrer">
                {String(item.thumbnail_url).substring(0, 50)}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomTable;
