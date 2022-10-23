import { FC, memo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import type { Prediction } from "../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart: FC<{ result: Prediction }> = memo(({ result }) => {
  const data = {
    labels: ["問題なし", "問題あり"],
    datasets: [
      {
        label: "テスト",
        data: result.results[0].probabilities,
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <h2>{result.label}</h2>
      <Pie data={data} />
    </div>
  );
});
