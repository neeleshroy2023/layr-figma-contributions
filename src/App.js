import "./App.css";
import React, { useEffect, useState } from "react";
import apiRequests from "./apiRequests";
import CustomTable from "./components/CustomTable";
import LayrBarChart from "./components/LayrBarChart";
import LayrLineChart from "./components/LayrLineChart";
import Pagination from "./components/Pagination";
import Filter from "./components/Filter";
import IndividualContributions from "./components/IndividualContributions";

function App() {
  const [figmaVersions, setFigmaVersions] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const contributionDates = React.useMemo(() => ({}), []);
  const individualCont = React.useMemo(() => ({}), []);
  const [loading, setLoading] = useState(true);

  const users = [
    {
      value: "",
      label: "All",
    },
    {
      value: "1220677533449169285",
      label: "Neelesh Roy",
    },
    {
      value: "1225755265829801119",
      label: "Vaibhav Barman",
    },
  ];

  const filteredMedia = figmaVersions.filter((item) => {
    if (selectedUser === "") {
      return true;
    }
    return item.user.id === selectedUser;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMedia.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    Promise.all([
      apiRequests(setFigmaVersions),
      apiRequests(
        setFigmaVersions,
        `https://api.figma.com/v1/files/${process.env.REACT_APP_URL_TWO}/versions`
      ),
      apiRequests(
        setFigmaVersions,
        `https://api.figma.com/v1/files/${process.env.REACT_APP_URL_THREE}/versions`
      ),
    ]).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    figmaVersions.forEach((item) => {
      if (contributionDates[new Date(item.created_at).toLocaleDateString()]) {
        contributionDates[new Date(item.created_at).toLocaleDateString()] += 1;
      } else {
        contributionDates[new Date(item.created_at).toLocaleDateString()] = 1;
      }
    });
  }, [contributionDates, figmaVersions]);

  useEffect(() => {
    figmaVersions.forEach((item) => {
      if (individualCont[item.user.id]) {
        individualCont[item.user.id] += 1;
      } else {
        individualCont[item.user.id] = 1;
      }
    });
  }, [figmaVersions, individualCont]);

  return (
    <div className="App">
      {loading && (
        <div className="loader">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <div>
        <h1>Layr Figma Contributions</h1>
        <IndividualContributions data={individualCont} users={users} />
        <LayrBarChart contributionDates={contributionDates} />
        <LayrLineChart contributionDates={contributionDates} />
        <Filter
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
          setCurrentPage={setCurrentPage}
          users={users}
        />
        <section className="table-container">
          <CustomTable currentItems={currentItems} />
          <Pagination
            paginate={paginate}
            filteredMedia={filteredMedia}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
