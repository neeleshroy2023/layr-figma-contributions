import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    Rectangle,
    Label,
  } from "recharts";

const LayrBarChart = ({ data }) => {
    return (
        <BarChart
          width={1200}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <Legend/>
          <CartesianGrid strokeDasharray="3 2" />
          <XAxis dataKey="name" >
            <Label value="Week number" offset={-10} position="insideBottomLeft" />
          </XAxis>
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#8BA4FE"
            activeBar={<Rectangle fill="pink" stroke="#8BA4FE" />}
          />
        </BarChart>
    )
}

export default LayrBarChart;