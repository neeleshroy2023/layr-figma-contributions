import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    Rectangle,
  } from "recharts";

const LayrBarChart = ({ contributionDates }) => {
    return (
        <BarChart
          width={1000}
          height={300}
          data={Object.keys(contributionDates).map((key) => {
            return {
              name: key,
              count: contributionDates[key],
            };
          })}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
    )
}

export default LayrBarChart;