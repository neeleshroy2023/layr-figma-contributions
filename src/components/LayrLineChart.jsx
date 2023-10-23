import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LayrLineChart = ({ contributionDates }) => {
  return (
    <LineChart
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
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="count" stroke="#82ca9d" />
    </LineChart>
  );
};

export default LayrLineChart;
