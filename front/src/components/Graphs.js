// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Tooltip,
//   BarChart,
//   XAxis,
//   YAxis,
//   Legend,
//   CartesianGrid,
//   Bar,
// } from "recharts";
// import "../styles/index.css";

// function Graphs({ scores}) {
//   const calculateAverage = (array) => {
//     const sum = array.reduce((a, b) => a + b, 0);
//     return sum / array.length;
//   };

//   const userEmails = Array.from(new Set(scores.map((score) => score.user.email)));
//   const averageScores = userEmails.map((email) => {
//     const userScores = scores.filter((score) => score.user.email === email).map((score) => score.score);
//     return {
//       name: email,
//       AvgScore: calculateAverage(userScores),
//     };
//   });

//   const topScore = scores.length
//     ? scores.reduce((top, score) => {
//         return score.score > top.score ? score : top;
//       }, { score: 0 })
//     : null;

//   const barData = topScore
//     ? [{ name: topScore.user.email, Score: topScore.score }]
//     : [];



//   return (
//     <section id="Graph">
//       <div style={{ textAlign: "center" }}>
//         <h2>Graphs</h2>
//         {scores.length > 0 ? (
//           <div className="graphs">
//             <PieChart width={400} height={400}>
//               <Pie
//                 dataKey="AvgScore" // Changed this line
//                 isAnimationActive={false}
//                 data={averageScores} // Changed this line
//                 cx={200}
//                 cy={200}
//                 outerRadius={80}
//                 fill="#72b840"
//                 label
//               />
//               <Tooltip />
//             </PieChart>

//             <BarChart
//           width={400}
//           height={400}
//           data={barData}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 80,
//             bottom: 5,
//           }}
//           barSize={20}
//         >
//           <XAxis
//             dataKey="name"
//             scale="point"
//             padding={{ left: 10, right: 10 }}
//           />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Bar dataKey="Score" fill="#72b840" />
//         </BarChart>

        
//           </div>
//         ) : (
//           <p>No data available</p>
//         )}
//       </div>
//     </section>
//   );
// }

// Graphs.defaultProps = {
//   scores: [],
// };

// export default Graphs;

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
  const calculateAverage = (array) => {
    const sum = array.reduce((a, b) => a + b, 0);
    return sum / array.length;
  };

  const userEmails = Array.from(new Set(scores.map((score) => score.user.email)));
  const pieChartData = userEmails.map((email) => {
    const userScores = scores.filter((score) => score.user.email === email).map((score) => score.score);
    return {
      name: email,
      AvgScore: calculateAverage(userScores),
    };
  });

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
                dataKey="AvgScore"
                isAnimationActive={false}
                data={pieChartData}
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
