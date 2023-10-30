import "./App.css";
import React, { useEffect, useState } from "react";
import apiRequests from "./apiRequests";
import CustomTable from "./components/CustomTable";
import LayrBarChart from "./components/LayrBarChart";
import LayrLineChart from "./components/LayrLineChart";
import Pagination from "./components/Pagination";
import Filter from "./components/Filter";
import IndividualContributions from "./components/IndividualContributions";
import mock from "./mock";

function App() {
  const [figmaVersions, setFigmaVersions] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [loading, setLoading] = useState(true);
  const [userContribution, setUserContribution] = useState([]);
  const [weeklyContribution, setWeeklyContribution] = useState([]);
  const [figmaAPIDoneFlag, setFigmaAPIDoneFlag] = useState(false);
  const [dailyContribution, setDailyContribution] = useState([]);

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

  const getWeek = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      setFigmaVersions(mock());
      setLoading(false);
      setFigmaAPIDoneFlag(true);
    } else {
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
      ]).then(() => {
        setFigmaAPIDoneFlag(true)
        setLoading(false)
      });
    }
  }, []);

  useEffect(() => {
    if (figmaAPIDoneFlag) {
      const userVersions = figmaVersions.filter(
        (item) => {
          console.log()
          return (
            item.user.id === "1220677533449169285" ||
          item.user.id === "1225755265829801119" ||
          new Date(item.created_at) > new Date("2023-05-01")
          )
        }
          
      );
      const dataByUsers = userVersions.reduce((acc, item) => {
        if (acc[item.user.handle]) {
          if(item.user.handle === "Figma System" && acc["Neelesh Roy"]) {
            acc["Neelesh Roy"].push(item);
          } else {
            acc[item.user.handle].push(item);
          }
        } else {
          acc[item.user.handle] = [item];
        }
        return acc;
      }, {});
  
      // create a new object with weekly data with key as week number, adding the count of versions in that week
      const dataWeekly = Object.keys(userVersions).reduce((acc, item) => {
        const week = getWeek(userVersions[item].created_at);
        if (acc[week]) {
          acc[week] += 1;
        } else {
          acc[week] = 1;
        }
        return acc;
      }, {});

      const dataDaily = Object.keys(userVersions).reduce((acc, item) => {
        const date = new Date(userVersions[item].created_at);
        const key = `${date.toLocaleDateString()}`;
        if (acc[key]) {
          acc[key] += 1;
        } else {
          acc[key] = 1;
        }
        return acc;
      }, {});
  
      setUserContribution((prev) => ({ ...prev, ...dataByUsers }));
      setWeeklyContribution(() => {
        return [
          ...Object.keys(dataWeekly).map((item) => ({
            name: item,
            count: dataWeekly[item],
          })),
        ];
      });
      setDailyContribution(() => {
        return [
          ...Object.keys(dataDaily).map((item) => ({
            name: item,
            count: dataDaily[item],
          })).sort((a, b) => {
            const dateA = new Date(a.name);
            const dateB = new Date(b.name);
            if (dateA === dateB) return 0;
            return dateA > dateB ? 1 : -1;
          }), 
        ];
      });
    }
  }, [figmaAPIDoneFlag, figmaVersions]);

  return (
    <div className="App">
      {loading && (
        <div className="loader">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <div>
        <h1
          data-heading="Layr Figma Contributions"
          className="entry-text"
        >
          Layr Figma Contributions
        </h1>
        <IndividualContributions data={userContribution} />
        <h2>Weekly Contributions</h2>
        <LayrBarChart data={weeklyContribution} />
        <h2>Daily Contributions</h2>
        <LayrLineChart data={dailyContribution} />
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
