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
  LineChart,
  Line,
} from "recharts";
import "../styles/index.css";

function Graphsp({ scores, displayUser }) {
  const pieData = scores.map((score) => ({
    name: score.user.email,
    TotalScore: score.user.total_score,
  }));

  const targetUser = displayUser || (scores.length > 0 ? scores[0].user.email : null);

  const targetUserScores = scores.filter((score) => score.user.email === targetUser);

  const bestScore = Math.max(...targetUserScores.map((score) => score.score));
  const worstScore = Math.min(...targetUserScores.map((score) => score.score));

  const barData = [
    {
      name: "Best",
      Score: bestScore,
    },
    {
      name: "Worst",
      Score: worstScore,
    },
  ];

  const lineData = targetUserScores.map((score) => ({
    name: score.user.email,
    Score: score.score,
    Time: score.timestamp,
  }));

  return (
    <section id="Graph">
      <div style={{ textAlign: "center" }}>
        <h2>Graphs</h2>
        {scores.length > 0 ? (
          <div className="graphs">
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
              <YAxis label={{ value: "Scores", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="Score" fill="#72b840" background={{ fill: "#eee" }} />
            </BarChart>
            <LineChart
              width={400}
              height={400}
              data={lineData}
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Score"
                stroke="#72b840"
                activeDot={{ r: 8 }}
                name="Score History"
              />
            </LineChart>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </section>
  );
}

Graphsp.defaultProps = {
  scores: [],
  displayUser: null,
};

export default Graphsp;
