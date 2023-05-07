import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import "../styles/index.css";

function Graphs({ scores }) {
  const pieData = scores.map((score) => ({
    name: score.user.email,
    TotalTime: score.time,
  }));

  const topScore = scores.length
    ? scores.reduce((top, score) => {
        return score.score > top.score ? score : top;
      }, { score: 0 })
    : null;

  const barData = topScore
    ? [{ name: topScore.user.email, Score: topScore.score }]
    : [];

  return (
    <section id="Graph">
      <div style={{ textAlign: "center" }}>
        <h2>Graphs</h2>
        {scores.length > 0 ? (
          <div className="graphs">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="TotalTime"
                isAnimationActive={false}
                data={pieData}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#72b840"
                label
              />
              <Tooltip />
            </PieChart>

            <BarChart
          width={400}
          height={400}
          data={barData}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="Score" fill="#72b840" />
        </BarChart>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </section>
  );
}

Graphs.defaultProps = {
  scores: [],
};

export default Graphs;
